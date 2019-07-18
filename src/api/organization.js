import auth from 'solid-auth-client'
import slugify from 'slugify'
import rdf from 'rdflib'

const SCHEMA = rdf.Namespace('http://schema.org/')
const ORGS_URI = 'https://pod2.projects.kaleidos.net/public/organizations/'

function buildOrgUri (name) {
  const slug = slugify(name).toLowerCase()
  return `${ORGS_URI}${slug}.ttl`
}

export async function getOrganization (name) {
  const orgUri = buildOrgUri(name)
  const orgNode = new rdf.NamedNode(orgUri)

  try {
    const org = rdf.graph()
    const fetcher = new rdf.Fetcher(org)
    await fetcher.load(orgNode.uri)

    return {
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

export async function createOrganization (name) {
  const orgUri = buildOrgUri(name)
  const updateQuery = `
    INSERT DATA {
       <${orgUri}> a <${SCHEMA('Organization').uri}>;
                     <${SCHEMA('name').uri}> "${name}".
    }
  `
  await auth.fetch(orgUri, {
    method: 'POST',
    body: updateQuery,
    headers: {
      'Content-Type': 'application/sparql-update',
    },
  })
}
