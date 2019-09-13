import rdf from 'rdflib'
import { v4 } from 'uuid'
import { getCurrentUserUri } from '@/api/login'
import { getCurrentOrgUri } from '@/api/organization'
import { uriToNode, loadNode, extractValue, nodeToDate } from './common'

const RDF = rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = rdf.Namespace('http://schema.org/')

export async function getAllRecords () {
  const org = await loadOrg()
  const userNode = uriToNode(await getCurrentUserUri())

  const allRecords = org.each(undefined, SCHEMA('agent'), userNode)
    .map((recordNode) => graphToRecord(org, recordNode))

  allRecords.sort((a, b) => a.startTime - b.startTime)

  return allRecords
}

export async function getTodayRecords () {
  const allRecords = await getAllRecords()
  const now = new Date()
  return allRecords.filter(
    (record) => record.startTime.getFullYear() === now.getFullYear() &&
                record.startTime.getMonth() === now.getMonth() &&
                record.startTime.getDate() === now.getDate()
  )
}

export async function createRecord (startTime) {
  const orgUri = await getCurrentOrgUri()
  const userUri = await getCurrentUserUri()

  const recordName = v4()
  const record = {
    uri: `${orgUri}#${recordName}`,
    name: recordName,
    startTime: startTime,
    actionStatus: 'active',
  }

  const del = []
  const ins = recordToGraph(record, orgUri, userUri)
  const updater = new rdf.UpdateManager()
  await updater.update(del, ins)
}

export async function deleteRecord (record) {
  const orgNode = uriToNode(await getCurrentOrgUri())
  const userNode = uriToNode(await getCurrentUserUri())
  const recordNode = uriToNode(record.uri)

  const del = [
    rdf.st(recordNode, RDF('type'), SCHEMA('Action'), orgNode),
    rdf.st(recordNode, SCHEMA('name'), record.name, orgNode),
    rdf.st(recordNode, SCHEMA('agent'), userNode, orgNode),
    rdf.st(recordNode, SCHEMA('startTime'), record.startTime, orgNode),
    rdf.st(recordNode, SCHEMA('actionStatus'), statusToNode(record.actionStatus), orgNode),
  ].concat(
    record.endTime
      ? [rdf.st(recordNode, SCHEMA('endTime'), record.startTime, orgNode)]
      : []
  )
  const ins = []
  const updater = new rdf.UpdateManager()
  await updater.update(del, ins)
}

export async function deleteAllRecords () {
  const orgNode = uriToNode(await getCurrentOrgUri())
  const userNode = uriToNode(await getCurrentUserUri())
  const todayRecords = await getTodayRecords()

  const del = todayRecords.flatMap((record) => [
    rdf.st(uriToNode(record.uri), RDF('type'), SCHEMA('Action'), orgNode),
    rdf.st(uriToNode(record.uri), SCHEMA('name'), record.name, orgNode),
    rdf.st(uriToNode(record.uri), SCHEMA('agent'), userNode, orgNode),
    rdf.st(uriToNode(record.uri), SCHEMA('startTime'), record.startTime, orgNode),
    rdf.st(uriToNode(record.uri), SCHEMA('actionStatus'), statusToNode(record.actionStatus),
      orgNode),
  ].concat(
    record.endTime
      ? [rdf.st(uriToNode(record.uri), SCHEMA('endTime'), record.endTime, orgNode)]
      : []
  ))

  const updater = new rdf.UpdateManager()
  await updater.update(del, [])
}

export async function pauseRecording () {
  const orgNode = uriToNode(await getCurrentOrgUri())

  const todayRecords = await getTodayRecords()
  if (todayRecords.length === 0) {
    throw new Error('You cannot pause if you are not recording')
  }

  const currentRecord = todayRecords.slice(-1)[0]
  if (currentRecord.endTime !== null) {
    throw new Error('You cannot pause if you already paused')
  }
  if (currentRecord.actionStatus !== 'active') {
    throw new Error('You cannot pause if you already completed recording')
  }

  // To pause recording, we add an endTime but leave the status active
  const recordNode = uriToNode(currentRecord.uri)
  const endTime = new Date()
  const ins = [
    rdf.st(recordNode, SCHEMA('endTime'), endTime, orgNode),
  ]
  const updater = new rdf.UpdateManager()
  await updater.update([], ins)
}

export async function resumeRecording () {
  const orgNode = uriToNode(await getCurrentOrgUri())
  const userNode = uriToNode(await getCurrentUserUri())

  const todayRecords = await getTodayRecords()
  if (todayRecords.length === 0) {
    throw new Error('You cannot resume if you are not recording')
  }

  const currentRecord = todayRecords.slice(-1)[0]
  if (currentRecord.actionStatus !== 'active') {
    throw new Error('You cannot resume if you already completed recording')
  }
  if (currentRecord.endTime === null) {
    throw new Error('You cannot resume if you did not pause')
  }

  // To resume recording we add a new record
  const recordSlug = v4()
  const recordNode = uriToNode(`${orgNode.uri}#${recordSlug}`)

  const startTime = new Date()
  const ins = [
    rdf.st(recordNode, RDF('type'), SCHEMA('Action'), orgNode),
    rdf.st(recordNode, SCHEMA('name'), recordSlug, orgNode),
    rdf.st(recordNode, SCHEMA('agent'), userNode, orgNode),
    rdf.st(recordNode, SCHEMA('startTime'), startTime, orgNode),
    rdf.st(recordNode, SCHEMA('actionStatus'), SCHEMA('ActiveActionStatus'), orgNode),
  ]

  const updater = new rdf.UpdateManager()
  await updater.update([], ins)
}

export async function completeRecording () {
  const orgNode = uriToNode(await getCurrentOrgUri())

  const todayRecords = await getTodayRecords()
  if (todayRecords.length === 0) {
    throw new Error('You cannot complete if you are not recording')
  }

  const currentRecord = todayRecords.slice(-1)[0]
  if (currentRecord.actionStatus !== 'active') {
    throw new Error('You cannot complete if you already completed recording')
  }

  // To complete recording we set the endTime of the current record,
  // and mark all of today records as complete
  const del = todayRecords.map((record) =>
    rdf.st(uriToNode(record.uri), SCHEMA('actionStatus'), SCHEMA('ActiveActionStatus'), orgNode)
  )

  let ins = []
  if (currentRecord.endTime === null) {
    const recordNode = uriToNode(currentRecord.uri)
    const endTime = new Date()
    ins = ins.concat([
      rdf.st(recordNode, SCHEMA('endTime'), endTime, orgNode),
    ])
  }

  ins = ins.concat(todayRecords.map((record) =>
    rdf.st(uriToNode(record.uri), SCHEMA('actionStatus'), SCHEMA('CompletedActionStatus'), orgNode)
  ))

  const updater = new rdf.UpdateManager()
  await updater.update(del, ins)
}

export async function editRecord (record, changes) {
  const orgNode = uriToNode(await getCurrentOrgUri())
  const recordNode = uriToNode(record.uri)

  const del = []
  const ins = []
  if (changes.startTime) {
    del.append(
      rdf.st(recordNode, SCHEMA('startTime'), record.startTime, orgNode),
    )
    ins.append(
      rdf.st(recordNode, SCHEMA('startTime'), changes.startTime, orgNode),
    )
  }
  if (changes.endTime) {
    del.append(
      rdf.st(recordNode, SCHEMA('endTime'), record.endTime, orgNode),
    )
    ins.append(
      rdf.st(recordNode, SCHEMA('endTime'), changes.endTime, orgNode),
    )
  }

  if (del.length > 0) {
    const updater = new rdf.UpdateManager()
    await updater.update(del, ins)
  }
}

async function loadOrg () {
  const orgNode = uriToNode(await getCurrentOrgUri())
  return loadNode(orgNode)
}

function recordToGraph (record, orgUri, userUri) {
  const orgNode = uriToNode(orgUri)
  const userNode = uriToNode(userUri)
  const recordNode = uriToNode(record.uri)
  return [
    rdf.st(recordNode, RDF('type'), SCHEMA('Action'), orgNode),
    rdf.st(recordNode, SCHEMA('name'), record.name, orgNode),
    rdf.st(recordNode, SCHEMA('agent'), userNode, orgNode),
    rdf.st(recordNode, SCHEMA('startTime'), record.startTime, orgNode),
    rdf.st(recordNode, SCHEMA('actionStatus'), statusToNode(record.actionStatus), orgNode),
  ]
}

function graphToRecord (org, recordNode) {
  return {
    uri: recordNode.uri,
    name: extractValue(org, recordNode, SCHEMA('name')),
    startTime: extractValue(org, recordNode, SCHEMA('startTime'), nodeToDate),
    endTime: extractValue(org, recordNode, SCHEMA('endTime'), nodeToDate),
    actionStatus: extractValue(org, recordNode, SCHEMA('actionStatus'), nodeToStatus),
  }
}

function nodeToStatus (node) {
  if (!node) {
    return null
  } else if (node.value === SCHEMA('ActiveActionStatus').value) {
    return 'active'
  } else if (node.value === SCHEMA('CompletedActionStatus').value) {
    return 'completed'
  } else {
    throw new Error(`Invalid actionStatus ${node.value}`)
  }
}

function statusToNode (status) {
  if (status === 'active') {
    return SCHEMA('ActiveActionStatus')
  } else if (status === 'completed') {
    return SCHEMA('CompletedActionStatus')
  } else {
    throw new Error(`Invalid actionStatus ${status}`)
  }
}
