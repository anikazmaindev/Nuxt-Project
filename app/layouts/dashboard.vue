<template>
  <div class="min-h-screen bg-[#020617] text-white flex font-sans overflow-hidden">
    <!-- Sidebar -->
    <aside :class="[isCollapsed ? 'w-20' : 'w-64']"
      class="border-r border-slate-800/50 flex flex-col gap-8 bg-[#030712]/80 backdrop-blur-xl transition-all duration-300 ease-in-out relative z-50 shrink-0">
      <!-- Toggle Button (Absolute) -->
      <button @click="isCollapsed = !isCollapsed"
        class="absolute -right-3 top-20 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-500 transition-colors z-[60]">
        <svg :class="[isCollapsed ? 'rotate-180' : '']" class="w-4 h-4 transition-transform duration-300" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <div class="flex items-center gap-3 px-6 pt-8 overflow-hidden h-[88px] shrink-0">
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <span v-show="!isCollapsed"
          class="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-opacity duration-300">Console</span>
      </div>

      <nav class="flex-1 flex flex-col gap-2 mt-4 px-3 overflow-hidden">
        <NuxtLink to="/" :title="isCollapsed ? 'Overview' : ''"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-300 group whitespace-nowrap overflow-hidden"
          active-class="!text-white bg-blue-600/10 border border-blue-600/20"
          exact-active-class="!text-white bg-blue-600/10 border border-blue-600/20">
          <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
            </path>
          </svg>
          <span v-show="!isCollapsed" class="font-medium">Home</span>
        </NuxtLink>
        <NuxtLink to="/dashboard" :title="isCollapsed ? 'Overview' : ''"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-300 group whitespace-nowrap overflow-hidden"
          active-class="!text-white bg-blue-600/10 border border-blue-600/20"
          exact-active-class="!text-white bg-blue-600/10 border border-blue-600/20">
          <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
            </path>
          </svg>
          <span v-show="!isCollapsed" class="font-medium">Overview</span>
        </NuxtLink>

        <NuxtLink to="/dashboard/posts" :title="isCollapsed ? 'Manage Posts' : ''"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-300 group whitespace-nowrap overflow-hidden"
          active-class="!text-white bg-blue-600/10 border border-blue-600/20">
          <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
            </path>
          </svg>
          <span v-show="!isCollapsed" class="font-medium">Manage Posts</span>
        </NuxtLink>

        <NuxtLink to="/dashboard/users" :title="isCollapsed ? 'Manage Users' : ''"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-300 group whitespace-nowrap overflow-hidden"
          active-class="!text-white bg-blue-600/10 border border-blue-600/20">
          <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
            </path>
          </svg>
          <span v-show="!isCollapsed" class="font-medium">Manage Users</span>
        </NuxtLink>

        <NuxtLink to="/dashboard/profile" :title="isCollapsed ? 'My Profile' : ''"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-300 group whitespace-nowrap overflow-hidden"
          active-class="!text-white bg-blue-600/10 border border-blue-600/20">
          <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span v-show="!isCollapsed" class="font-medium">My Profile</span>
        </NuxtLink>
      </nav>

      <div class="mt-auto border-t border-slate-800/50 pt-3 px-3 pb-8 shrink-0 overflow-hidden">
        <button @click="handleLogout"
          class="w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-left flex items-center gap-3 group whitespace-nowrap overflow-hidden">
          <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span v-show="!isCollapsed" class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-gradient-to-br from-[#020617] to-[#0f172a] overflow-y-auto">
      <div class="p-10 max-w-7xl mx-auto w-full">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-white mb-2">
              {{ $route.path.split('/').pop()?.charAt(0).toUpperCase() + ($route.path.split('/').pop()?.slice(1) ||
                'Overview') }}
            </h1>
            <p class="text-slate-500 text-sm">Dashboard Overview</p>
          </div>

          <div class="flex items-center gap-4 px-4 py-2 rounded-full bg-slate-900 border border-slate-800/50">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg">
              {{ user?.username.charAt(0).toUpperCase() }}
            </div>
            <span class="font-semibold text-sm text-slate-300">{{ user?.username }}</span>
          </div>
        </header>

        <div class="animate-content-in">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.animate-content-in {
  animation: content-in 0.5s ease-out forwards;
}

@keyframes content-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script setup>
const isCollapsed = ref(false)
const { data: authData } = await useFetch('/api/auth/me')
const user = computed(() => authData.value?.user)

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/login')
}
</script>
