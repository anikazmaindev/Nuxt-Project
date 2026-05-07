<script setup>
definePageMeta({
  layout: 'dashboard'
})

const { data: posts } = await useFetch('/api/posts')
const postCount = computed(() => posts.value?.length || 0)
</script>

<template>
  <div class="space-y-10">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 transition-all group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-blue-600/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Global</span>
        </div>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-tight mb-1">Total Posts</p>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-black text-white">{{ postCount }}</span>
          <span class="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">ACTIVE</span>
        </div>
      </div>

      <div class="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-indigo-500/30 transition-all group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-indigo-600/10 rounded-xl text-indigo-500 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Media</span>
        </div>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-tight mb-1">Assets Used</p>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-black text-white">{{ postCount }}</span>
          <span class="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">CLOUD</span>
        </div>
      </div>

      <div class="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-purple-500/30 transition-all group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-purple-600/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
          <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Reach</span>
        </div>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-tight mb-1">Total Views</p>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-black text-white">0</span>
          <span class="text-xs font-bold text-slate-600 bg-slate-600/10 px-2 py-0.5 rounded-full">NEW</span>
        </div>
      </div>
    </div>

    <!-- Quick Action / Empty State -->
    <div class="relative p-12 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 flex flex-col items-center justify-center text-center overflow-hidden group">
      <!-- Background Glow -->
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full group-hover:bg-indigo-600/20 transition-all"></div>

      <div class="relative">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-blue-500/20 transform group-hover:rotate-3 transition-transform">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3">Begin Your Next Masterpiece</h3>
        <p class="text-slate-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Your creative workspace is ready. Every post you publish here is instantly synchronized with your live homepage.
        </p>
        <NuxtLink to="/dashboard/posts/create" class="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl hover:scale-105 active:scale-95">
          Get Started
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
