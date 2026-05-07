<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const { data: posts, refresh } = await useFetch('/api/posts')

const deletePost = async (id: number) => {
  if (!confirm('Are you sure you want to delete this post?')) return

  try {
    await $fetch(`/api/posts/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (err: any) {
    alert('Failed to delete post: ' + (err.data?.statusMessage || err.message))
  }
}
</script>

<template>
  <div class="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 overflow-hidden">
    <div class="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-600/5 to-transparent">
      <div>
        <h2 class="text-xl font-bold text-white">Manage Posts</h2>
        <p class="text-xs text-slate-500 mt-1">Review and organize your published content</p>
      </div>
      <NuxtLink to="/dashboard/posts/create" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
        + Create Post
      </NuxtLink>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-black/20 text-slate-400">
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Content</th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Author</th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Published At</th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-white/[0.02] transition-colors group">
            <td class="px-8 py-6">
              <div class="flex items-center gap-5">
                <div class="w-16 h-16 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors shadow-lg">
                  <img v-if="post.image" :src="post.image" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
                <div>
                  <div class="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{{ post.title }}</div>
                  <div class="text-xs text-slate-500 line-clamp-1 max-w-xs leading-relaxed">{{ post.description }}</div>
                </div>
              </div>
            </td>
            <td class="px-8 py-6">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-500">
                  {{ post.author?.username.charAt(0).toUpperCase() }}
                </div>
                <span class="text-sm font-semibold text-slate-300">{{ post.author?.username }}</span>
              </div>
            </td>
            <td class="px-8 py-6">
              <div class="flex flex-col">
                <span class="text-sm font-medium text-slate-400">{{ new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</span>
                <span class="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">PUBLISHED</span>
              </div>
            </td>
            <td class="px-8 py-6 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink 
                  :to="`/dashboard/posts/${post.id}`" 
                  class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600/5 text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-blue-500/10 shadow-lg shadow-blue-500/5 group/edit"
                  title="Edit Post"
                >
                  <svg class="w-5 h-5 group-hover/edit:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </NuxtLink>
                <button 
                  @click="deletePost(post.id)" 
                  class="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600/5 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 border border-red-500/10 shadow-lg shadow-red-500/5 group/delete"
                  title="Delete Post"
                >
                  <svg class="w-5 h-5 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="posts?.length === 0">
            <td colspan="4" class="px-8 py-20 text-center">
              <div class="flex flex-col items-center opacity-40">
                <svg class="w-16 h-16 mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <p class="text-sm italic font-medium">No posts found. Start sharing your stories!</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
