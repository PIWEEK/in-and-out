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
        Crear org
      </button>
      <button
        class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        @click="pause()"
      >
        Pausar registro
      </button>
      <button
        class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        @click="resume()"
      >
        Reanudar registro
      </button>
      <button
        class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        @click="complete()"
      >
        Completar registro
      </button>
    </div>
  </div>
</template>

<script>
import { login, getCurrentUserUri, getCurrentUser } from '@/api/login'
import { getCurrentOrg, createOrganization } from '@/api/organization'
import {
  getAllRecords,
  getTodayRecords,
  pauseRecording,
  resumeRecording,
  completeRecording,
} from '@/api/record'

export default {
  name: 'Login',
  methods: {
    async login () {
      let userUri = await getCurrentUserUri()
      if (!userUri) {
        userUri = await login()
      }
      console.log(`Logado usuario ${userUri}`)

      const user = await getCurrentUser()
      console.log(`Eres ${user.fullName}`)
      console.log(`Organización ${user.organizationName}`)
      console.log(`Rol ${user.role}`)

      const allRecords = await getAllRecords()
      console.log('todos los registros')
      console.log(allRecords)

      const todayRecords = await getTodayRecords()
      console.log('registros de hoy')
      console.log(todayRecords)
    },

    async create () {
      let org = await getCurrentOrg()
      if (!org) {
        await createOrganization()
        org = await getCurrentOrg()
      }
      console.log('Organización', org)
    },

    async pause () {
      await pauseRecording()
    },

    async resume () {
      await resumeRecording()
    },

    async complete () {
      await completeRecording()
    },
  },
}
</script>
