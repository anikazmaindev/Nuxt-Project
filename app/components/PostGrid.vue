<script setup lang="ts">
const { data: posts, pending, error } = await useFetch('/api/posts')
</script>

<template>
  <section class="py-24 bg-slate-950">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Latest Stories
        </h2>
        <p class="text-slate-400 max-w-xl mx-auto">
          Explore the latest thoughts, updates, and innovations from our community.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>

      <div v-else-if="error" class="text-center py-12 text-red-500 max-w-2xl mx-auto px-4">
        <div class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
          <p class="font-bold mb-2">Failed to load posts</p>
          <p class="text-sm opacity-80">{{ error.data?.data || error.data?.statusMessage || error.message }}</p>
        </div>
      </div>

      <div v-else-if="posts?.length === 0" class="text-center py-12 text-slate-500 italic">
        No posts yet. Be the first to publish!
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="post in posts" 
          :key="post.id"
          class="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
        >
          <!-- Image Section -->
          <div class="relative h-64 overflow-hidden">
            <img 
              v-if="post.image" 
              :src="post.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Post Image" 
            />
            <div v-else class="w-full h-full bg-slate-800 flex items-center justify-center">
              <svg class="w-12 h-12 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            
            <!-- Date Badge -->
            <div class="absolute top-4 left-4 inline-flex px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-white border border-white/10">
              {{ new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-[10px] font-bold text-primary-400">
                {{ post.author?.username.charAt(0).toUpperCase() }}
              </div>
              <span class="text-xs text-slate-400 font-medium">{{ post.author?.username }}</span>
            </div>
            
            <h3 class="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors line-clamp-1">
              {{ post.title }}
            </h3>
            
            <p class="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
              {{ post.description }}
            </p>
            
            <div class="flex items-center justify-between pt-6 border-t border-slate-800">
              <NuxtLink to="#" class="text-xs font-bold text-primary-500 flex items-center gap-2 group/btn">
                READ MORE
                <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
