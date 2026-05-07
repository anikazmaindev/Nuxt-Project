<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">Manage Users</h1>
        <p class="text-slate-400 text-sm mt-1">View and manage registered accounts</p>
      </div>
    </div>

    <div class="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
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
            <tr v-for="u in usersList" :key="u.id" class="hover:bg-white/[0.02] transition-colors group">
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
            <tr v-if="usersList.length === 0">
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

const { data: usersList, refresh } = await useFetch('/api/users')

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
