import rdf from 'rdflib'
import { v4 } from 'uuid'
import { getCurrentUserUri } from '@/api/login'
import { getCurrentOrgUri } from '@/api/organization'

const RDF = rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = rdf.Namespace('http://schema.org/')

export async function getAllRecords () {
  const org = await loadOrg()
  const userNode = rdf.sym(await getCurrentUserUri())
  return org.each(undefined, SCHEMA('agent'), userNode)
    .map((recordNode) => nodeToRecord(recordNode, org))
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

export async function createRecord (startDateTime) {
  const orgNode = rdf.sym(await getCurrentOrgUri())
  const userNode = rdf.sym(await getCurrentUserUri())

  const recordSlug = v4()
  console.log('slug', recordSlug, typeof recordSlug)
  const recordNode = rdf.sym(`${orgNode.uri}#${recordSlug}`)

  const ins = [
    rdf.st(recordNode, RDF('type'), SCHEMA('Action'), orgNode),
    rdf.st(recordNode, SCHEMA('name'), recordSlug, orgNode),
    rdf.st(recordNode, SCHEMA('agent'), userNode, orgNode),
    rdf.st(recordNode, SCHEMA('startTime'), startDateTime, orgNode),
    rdf.st(recordNode, SCHEMA('actionStatus'), SCHEMA('ActiveActionStatus'), orgNode),
  ]

  const updater = new rdf.UpdateManager()
  await updater.update([], ins)
}

async function loadOrg () {
  const orgNode = rdf.sym(await getCurrentOrgUri())

  const org = rdf.graph()
  const fetcher = new rdf.Fetcher(org)
  await fetcher.load(orgNode.uri)

  return org
}

function nodeToRecord (recordNode, org) {
  return {
    uri: recordNode.uri,
    name: org.any(recordNode, SCHEMA('name')).value,
    startTime: nodeToDate(org.any(recordNode, SCHEMA('startTime'))),
    endTime: nodeToDate(org.any(recordNode, SCHEMA('endTime'))),
    actionStatus: nodeToStatus(org.any(recordNode, SCHEMA('actionStatus'))),
  }
}

function nodeToDate (node) {
  return node ? new Date(node.value) : null
}

function nodeToStatus (node) {
  console.log(node, typeof node)
  console.log(SCHEMA('ActiveActionStatus'), typeof SCHEMA('ActiveActionStatus'))
  if (node.value === SCHEMA('ActiveActionStatus').value) {
    return 'active'
  } else if (node.value === SCHEMA('CompletedActionStatus').value) {
    return 'completed'
  } else {
    throw new Error(`Invalid actionStatus ${node.value}`)
  }
}
