import auth from 'solid-auth-client'
import rdf from 'rdflib'

import { uriToNode, loadNode, extractValue } from './common'

const SCHEMA = rdf.Namespace('http://schema.org/')

// TODO: ask the user the pod she wants to use
const ORGS_URI = 'https://pod2.projects.kaleidos.net/public/organizations/'
const ORG_NAME = 'Kaleidos'
const ORG_URI = `${ORGS_URI}kaleidos.ttl`

export async function getCurrentOrgUri () {
  // TODO: add to the organizations pod some data to identify
  // the organization that the current user belongs
  return ORG_URI
}

export async function getCurrentOrg () {
  const orgNode = uriToNode(await getCurrentOrgUri())

  try {
    const orgGraph = await loadNode(orgNode)

    return {
      uri: orgNode.uri,
      name: extractValue(orgGraph, orgNode, SCHEMA('name')),
    }
  } catch (ex) {
    if (ex.status === 404) {
      return undefined
    } else {
      throw ex
    }
  }
}

export async function createOrganization () {
  const updateQuery = `
    INSERT DATA {
       <${ORG_URI}> a <${SCHEMA('Organization').uri}>;
                    <${SCHEMA('name').uri}> "${ORG_NAME}".
    }
  `
  await auth.fetch(ORG_URI, {
    method: 'POST',
    body: updateQuery,
    headers: {
      'Content-Type': 'application/sparql-update',
    },
  })
}
