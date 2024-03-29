import auth from 'solid-auth-client'
import rdf from 'rdflib'

import { uriToNode, loadNode, extractValue } from './common'

const VCARD = rdf.Namespace('http://www.w3.org/2006/vcard/ns#')

export async function login () {
  const session = await auth.popupLogin({ popupUri: '/login-popup.html' })
  return session.webId
}

export async function logout () {
  await auth.logout()
}

export async function getCurrentUserUri () {
  let session = await auth.currentSession()
  if (!session) {
    return null
  }
  return session.webId
}

export async function getCurrentUser () {
  const userNode = uriToNode(await getCurrentUserUri())
  const userGraph = await loadNode(userNode)

  return { // TODO: be prepared for null values
    uri: userNode.uri,
    fullName: extractValue(userGraph, userNode, VCARD('fn')),
    organizationName: extractValue(userGraph, userNode, VCARD('organization-name')),
    role: extractValue(userGraph, userNode, VCARD('role')),
  }
}

// ***THE SAME With ldflex-comunica***
//
// import ComunicaEngine from 'ldflex-comunica'
// import { PathFactory } from 'ldflex'
// import { namedNode } from '@rdfjs/data-model'
//
// // Workaround for a bug https://github.com/winstonjs/winston/issues/1354#issuecomment-426433071
// import 'setimmediate'

// export async function getCurrentUser () {
//   const webId = await getCurrentUserUri()
//
//   const context = {
//     '@context': {
//       '@vocab': 'http://www.w3.org/2006/vcard/ns#',
//     },
//   }
//   const queryEngine = new ComunicaEngine(webId)
//   const path = new PathFactory({ context, queryEngine })
//   const user = path.create({ subject: namedNode(webId) })
//
//   // console.log(`sparql: ${await user.fn.sparql}`)
//   // console.log('path: ', await user.fn.pathExpression)
//
//   return {
//     fullName: await user.fn,
//     organizationName: await user['organization-name'],
//     role: await user.role,
//   }
// }
