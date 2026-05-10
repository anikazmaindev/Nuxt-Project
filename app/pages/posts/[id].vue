<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)

// Fetch the current post
const { data: post, pending, error, refresh: refreshPost } = await useAsyncData<any>(
  `post-${id.value}`,
  () => $fetch(`/api/posts/${id.value}` as string) as Promise<any>
)

// Fetch latest posts for the sidebar
const { data: latestPosts, refresh: refreshLatest } = await useAsyncData<any[]>(
  'latest-posts-sidebar',
  () => $fetch('/api/posts?limit=10' as string) as Promise<any[]>
)

// Fetch random posts for the bottom section
const { data: randomPosts, refresh: refreshRandom } = await useAsyncData<any[]>(
  'random-posts-bottom',
  () => $fetch('/api/posts?limit=10&random=true' as string) as Promise<any[]>,
  { watch: [id] } // Re-fetch random posts when navigating to a different post
)

// Watch for ID changes to refresh everything
watch(id, () => {
  refreshPost()
  refreshLatest()
  refreshRandom()
})

// Filter out the current post from the latest posts
const filteredLatest = computed(() => {
  return latestPosts.value?.filter((p: any) => String(p.id) !== String(id.value)).slice(0, 5) || []
})

// Filter out the current post from the random posts
const filteredRandom = computed(() => {
  return randomPosts.value?.filter((p: any) => String(p.id) !== String(id.value)).slice(0, 3) || []
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 pt-32 pb-20">
    <div class="max-w-7xl mx-auto px-6">
      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>

      <div v-else-if="error || !post" class="text-center py-20">
        <div class="bg-red-500/10 border border-red-500/20 rounded-3xl p-12 max-w-2xl mx-auto">
          <h1 class="text-2xl font-bold text-red-500 mb-4">Post Not Found</h1>
          <p class="text-slate-400 mb-8">{{ error?.message || 'The post you are looking for does not exist or has been removed.' }}</p>
          <NuxtLink to="/"
            class="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold transition-all">
            Back to Home
          </NuxtLink>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content (Left) -->
        <article class="lg:col-span-2 space-y-10">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <NuxtLink to="/"
                class="text-xs font-bold text-primary-500 uppercase tracking-widest hover:text-primary-400 transition-colors">
                &larr; Back to Home
              </NuxtLink>
              <div class="h-1 w-1 bg-slate-700 rounded-full"></div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {{ new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                }) }}
              </span>
            </div>

            <h1 class="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              {{ post.title }}
            </h1>

            <div class="flex items-center gap-4 pt-4">
              <div
                class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary-500/20">
                {{ post.author?.username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <div class="text-white font-bold">{{ post.author?.username }}</div>
                <div class="text-xs text-slate-500">Editor & Contributor</div>
              </div>
            </div>
          </div>

          <div v-if="post.image" class="relative rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
            <img :src="post.image" class="w-full h-auto object-cover max-h-[500px]" :alt="post.title" />
          </div>

          <!-- Blog Content -->
          <div class="prose prose-invert prose-slate max-w-none">
            <div class="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-sans">
              {{ post.description }}
            </div>
          </div>
        </article>

        <!-- Sidebar (Right) -->
        <aside class="space-y-12">
          <!-- Latest News -->
          <div class="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 space-y-8">
            <h2 class="text-xl font-black text-white uppercase tracking-wider flex items-center gap-3">
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Latest Blogs
            </h2>

            <div class="space-y-6">
              <NuxtLink v-for="latest in filteredLatest" :key="latest.id" :to="'/posts/' + latest.id"
                class="flex gap-4 group cursor-pointer">
                <div class="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/5">
                  <img v-if="latest.image" :src="latest.image"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div v-else class="w-full h-full bg-slate-800 flex items-center justify-center">
                    <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="space-y-1">
                  <h3
                    class="text-sm font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                    {{ latest.title }}
                  </h3>
                  <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {{ new Date(latest.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Featured Newsletter/Promotion (Optional) -->
          <div
            class="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div class="relative z-10 space-y-4">
              <h3 class="text-2xl font-black leading-tight">Stay updated with Tech Blogs</h3>
              <p class="text-sm text-white/80">Get the latest insights and news delivered straight to your inbox.</p>
              <button
                class="w-full py-3 bg-white text-primary-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-xl">
                Subscribe Now
              </button>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </aside>
      </div>

      <!-- Random Posts Section (Bottom) -->
      <div v-if="filteredRandom.length > 0" class="mt-32 pt-20 border-t border-white/5 space-y-12">
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <h2 class="text-3xl font-black text-white uppercase tracking-tight">Discover More Blogs</h2>
            <p class="text-slate-500 text-sm">Explore random thoughts and news from our community</p>
          </div>
          <NuxtLink to="/"
            class="px-6 py-2 rounded-full border border-slate-800 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all uppercase tracking-widest">
            View All
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink v-for="post in filteredRandom" :key="post.id" :to="'/posts/' + post.id"
            class="group bg-slate-900/40 border border-white/5 rounded-[40px] overflow-hidden hover:border-primary-500/50 transition-all duration-500 hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img v-if="post.image" :src="post.image"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div v-else class="w-full h-full bg-slate-800 flex items-center justify-center">
                <svg class="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
            </div>
            <div class="p-8 space-y-4">
              <h3 class="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {{ post.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
