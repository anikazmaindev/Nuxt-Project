<template>
  <div class="min-h-screen bg-slate-950 text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-slate-800 p-6 flex flex-col gap-8">
      <div class="flex items-center gap-2 px-2">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-white">
          A
        </div>
        <span class="text-xl font-bold tracking-tight">Console</span>
      </div>

      <nav class="flex-1 flex flex-col gap-2">
        <NuxtLink to="/dashboard" class="px-4 py-3 rounded-xl bg-primary-600/10 text-primary-400 font-medium">
          Dashboard
        </NuxtLink>
        <a href="#" class="px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-colors">Analytics</a>
        <a href="#" class="px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-colors">Users</a>
        <a href="#" class="px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-colors">Settings</a>
      </nav>

      <div class="mt-auto border-t border-slate-800 pt-6">
        <button @click="handleLogout" class="w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors text-left flex items-center gap-2">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10">
      <header class="flex justify-between items-center mb-10">
        <h1 class="text-2xl font-bold">Dashboard Overview</h1>
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
          <span class="font-medium text-slate-300">{{ user?.username || 'User' }}</span>
        </div>
      </header>
      
      <slot />
    </main>
  </div>
</template>

<script setup>
const { data: authData } = await useFetch('/api/auth/me')
const user = computed(() => authData.value?.user)

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/login')
}
</script>
