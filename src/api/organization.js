import auth from 'solid-auth-client'
import rdf from 'rdflib'

const SCHEMA = rdf.Namespace('http://schema.org/')

const ORGS_URI = 'https://pod2.projects.kaleidos.net/public/organizations/'
const ORG_NAME = 'Kaleidos'
const ORG_URI = `${ORGS_URI}kaleidos.ttl`

export async function getCurrentOrgUri () {
  // TODO: add to the organizations pod some data to identify
  // the organization that the current user belongs
  return ORG_URI
}

export async function getCurrentOrg () {
  const orgNode = rdf.sym(await getCurrentOrgUri())

  try {
    const org = rdf.graph()
    const fetcher = new rdf.Fetcher(org)
    await fetcher.load(orgNode.uri)

    return {
      uri: orgNode.uri,
      name: org.any(orgNode, SCHEMA('name')).value,
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
