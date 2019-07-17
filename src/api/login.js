import auth from 'solid-auth-client'

// Workaround for a bug https://github.com/winstonjs/winston/issues/1354#issuecomment-426433071
import 'setimmediate'

import ComunicaEngine from 'ldflex-comunica'
import { PathFactory } from 'ldflex'
import { namedNode } from '@rdfjs/data-model'

export async function login () {
  const session = await auth.popupLogin({ popupUri: '/login-popup.html' })
  return session.webId
}

export async function currentUserWebId () {
  let session = await auth.currentSession()
  if (!session) {
    return null
  }
  return session.webId
}

export async function currentUserVCard () {
  const webId = await currentUserWebId()

  const context = {
    '@context': {
      '@vocab': 'http://www.w3.org/2006/vcard/ns#',
    },
  }
  const queryEngine = new ComunicaEngine(webId)
  const path = new PathFactory({ context, queryEngine })
  const user = path.create({ subject: namedNode(webId) })

  // console.log(`sparql: ${await user.fn.sparql}`)
  // console.log('path: ', await user.fn.pathExpression)

  return {
    fullName: await user.fn,
    organizationName: await user['organization-name'],
    role: await user.role,
  }
}
