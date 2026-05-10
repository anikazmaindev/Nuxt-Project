<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const id = route.params.id

const { data: post, pending, error: fetchError } = await useFetch(`/api/posts/${id}`)

const title = ref('')
const description = ref('')
const imageBase64 = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

// Initialize form once data is loaded
watch(post, (newVal) => {
  if (newVal) {
    title.value = newVal.title
    description.value = newVal.description
    imageBase64.value = newVal.image || ''
  }
}, { immediate: true })

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    imageBase64.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const updatePost = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await $fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: {
        title: title.value,
        description: description.value,
        image: imageBase64.value
      }
    })

    success.value = 'Post updated successfully!'
    setTimeout(() => navigateTo('/dashboard/posts'), 1500)
  } catch (err: any) {
    error.value = err.data?.data || err.data?.statusMessage || 'Failed to update post.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class=" mx-auto">
    <div class="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 overflow-hidden">
      <div class="p-8 border-b border-white/5 bg-gradient-to-r from-blue-600/5 to-transparent flex items-center gap-4">
        <NuxtLink to="/dashboard/posts"
          class="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-bold text-white">Edit Post</h1>
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">MODIFICATION MODE</p>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-blue-500/10"></div>
          <div class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      </div>

      <div v-else class="p-8">
        <div v-if="error || fetchError"
          class="mb-6 p-4 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20 text-sm font-medium flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ error || (fetchError?.data?.data || fetchError?.data?.statusMessage || fetchError?.message) }}
        </div>

        <div v-if="success"
          class="mb-6 p-4 text-green-400 bg-green-500/10 rounded-xl border border-green-500/20 text-sm font-medium flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ success }}
        </div>

        <form @submit.prevent="updatePost" class="space-y-8">
          <div class="space-y-2">
            <label for="title" class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Post
              Title</label>
            <input v-model="title" type="text" id="title" required
              class="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-white" />
          </div>

          <div class="space-y-2">
            <label for="image" class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Featured
              Image</label>
            <div class="relative group mt-1">
              <div v-if="imageBase64" class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img :src="imageBase64" class="w-full max-h-72 object-cover" alt="Preview" />
                <div
                  class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label for="image-upload-edit"
                    class="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold transition-all border border-white/10">
                    Replace Image
                  </label>
                  <button @click="imageBase64 = ''" type="button"
                    class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md rounded-lg text-xs font-bold text-red-400 transition-all border border-red-500/10">
                    Remove
                  </button>
                  <input id="image-upload-edit" type="file" class="sr-only" accept="image/*"
                    @change="handleFileChange" />
                </div>
              </div>

              <label v-else for="image-upload-new"
                class="flex flex-col items-center justify-center px-8 py-12 border-2 border-dashed border-white/5 rounded-2xl hover:border-blue-500/50 hover:bg-blue-600/[0.02] transition-all cursor-pointer group/upload">
                <div
                  class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform">
                  <svg class="w-8 h-8 text-slate-500 group-hover/upload:text-blue-500 transition-colors" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                </div>
                <span class="text-sm font-bold text-slate-300 group-hover/upload:text-white transition-colors">Select
                  new image</span>
                <input id="image-upload-new" type="file" class="sr-only" accept="image/*" @change="handleFileChange" />
              </label>
            </div>
          </div>

          <div class="space-y-2">
            <label for="description" class="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Post
              Description</label>
            <textarea v-model="description" id="description" rows="8" required
              class="w-full px-5 py-4 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-white resize-none font-sans leading-relaxed"></textarea>
          </div>

          <div class="pt-4">
            <button type="submit" :disabled="loading"
              class="w-full py-4 px-8 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_20px_50px_rgba(37,99,235,0.2)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
              :class="loading ? 'bg-slate-800' : 'bg-blue-600 hover:bg-blue-500'">
              {{ loading ? 'Saving Changes...' : 'Save Updates' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
