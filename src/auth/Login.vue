<template>
  <div class="flex h-full">
    <div class="flex-1 items-center flex flex-col justify-around py-20">
      <h1 class="text-primary font-title text-5xl">
        In & Out
      </h1>
      <BaseButton
        kind="primary"
        @click="login()"
      >
        {{ $t('login.log-in') }}
      </BaseButton>
      <button
        class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        @click="create()"
      >
        Crear
      </button>
    </div>
  </div>
</template>

<script>
import { login, currentUserWebId, currentUserVCard } from '@/api/login'
import { getOrganization, createOrganization } from '@/api/organization'

export default {
  name: 'Login',
  methods: {
    async login () {
      let userWebId = await currentUserWebId()
      if (!userWebId) {
        userWebId = await login()
      }
      console.log(`Logado usuario ${userWebId.uri}`)

      const user = await currentUserVCard()
      console.log(`Eres ${user.fullName}`)
      console.log(`Organización ${user.organizationName}`)
      console.log(`Rol ${user.role}`)
    },

    async create () {
      let org = await getOrganization('Kaleidos')
      if (!org) {
        await createOrganization('Kaleidos')
        org = await getOrganization('Kaleidos')
      }
      console.log('Organización', org)
    },
  },
}
</script>
