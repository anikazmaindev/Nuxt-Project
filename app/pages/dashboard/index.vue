<script setup>
definePageMeta({
  layout: 'dashboard'
})

const { data: authData } = await useFetch('/api/auth/me')
const user = computed(() => authData.value?.user)
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800">
        <p class="text-slate-400 text-sm mb-2">Total Users</p>
        <span class="text-3xl font-bold">1,284</span>
      </div>
      <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800">
        <p class="text-slate-400 text-sm mb-2">Revenue</p>
        <span class="text-3xl font-bold">$12,450</span>
      </div>
      <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800">
        <p class="text-slate-400 text-sm mb-2">Active Now</p>
        <span class="text-3xl font-bold">42</span>
      </div>
    </div>

    <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 h-96 flex items-center justify-center">
      <p class="text-slate-500">Activity Chart Placeholder</p>
    </div>
  </div>
</template>
