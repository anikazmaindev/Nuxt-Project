<template>
  <nav class="fixed max-w-7xl w-full top-0 left-[50%] -translate-x-1/2 z-50 glass mt-4 mx-4 md:mx-8 rounded-full">
    <div class=" mx-auto px-6 h-16 flex items-center justify-between">


      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <NuxtLink to="/dashboard" v-if="user" class="hover:text-white transition-colors">Dashboard</NuxtLink>
      </div>

      <div>
        <NuxtLink v-if="!user" to="/login"
          class="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/25 text-sm inline-block">
          Login
        </NuxtLink>
        <button v-else @click="handleLogout"
          class="px-5 py-2 rounded-full border border-slate-700 text-sm hover:bg-white/5 transition-colors">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { data: authData } = await useFetch('/api/auth/me')
const user = computed(() => authData.value?.user)

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/login')
}
</script>
