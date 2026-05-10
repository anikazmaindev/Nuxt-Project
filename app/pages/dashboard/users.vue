<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">Manage Users</h1>
        <p class="text-slate-400 text-sm mt-1">View and manage registered accounts</p>
      </div>
    </div>

    <div v-if="error" class="p-8 text-center bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5">
      <div class="inline-flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div class="text-left">
          <p class="font-bold text-sm">Failed to load users</p>
          <p class="text-xs opacity-80">{{ error.data?.data || error.data?.statusMessage || error.message }}</p>
        </div>
        <button @click="() => refresh()" class="ml-4 px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors">Retry</button>
      </div>
    </div>

    <div v-else class="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-white/5 bg-white/[0.02]">
              <th class="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">User</th>
              <th class="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Email</th>
              <th class="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Joined</th>
              <th class="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="u in (usersList || [])" :key="u.id" class="hover:bg-white/[0.02] transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                    {{ u.username.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-bold text-white">{{ u.username }}</p>
                    <p class="text-[10px] text-slate-500">ID: {{ u.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-slate-300">{{ u.email }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-slate-400">{{ formatDate(u.createdAt) }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">
                  Active
                </span>
              </td>
            </tr>
            <tr v-if="(usersList?.length || 0) === 0">
              <td colspan="4" class="px-6 py-20 text-center text-slate-500">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const { data: usersList, refresh, error } = await useFetch('/api/users')

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
