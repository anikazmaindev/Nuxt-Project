<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass mt-4 mx-4 md:mx-8 rounded-full">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-white">
          A
        </div>
        <span class="text-xl font-bold tracking-tight">Antigravity</span>
      </div>
      
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <NuxtLink to="/dashboard" v-if="user" class="hover:text-white transition-colors">Dashboard</NuxtLink>
        <a href="#" class="hover:text-white transition-colors">Pricing</a>
        <a href="#" class="hover:text-white transition-colors">Company</a>
      </div>
      
      <div>
        <NuxtLink v-if="!user" to="/login" class="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/25 text-sm inline-block">
          Login
        </NuxtLink>
        <button v-else @click="handleLogout" class="px-5 py-2 rounded-full border border-slate-700 text-sm hover:bg-white/5 transition-colors">
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
