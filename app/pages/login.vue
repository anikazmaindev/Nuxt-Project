<template>
  <div class="min-h-[80vh] flex items-center justify-center px-6">
    <div class="w-full max-w-md p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl animate-fade-in">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
        <p class="text-slate-400">Sign in to your account to continue</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Username</label>
          <input v-model="form.username" type="text" required
            class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
          <input v-model="form.password" type="password" required
            class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all">
        </div>

        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full py-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-8 text-center text-sm text-slate-500">
        Don't have an account? <a href="#" class="text-primary-400 hover:underline">Register</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  username: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })
    navigateTo('/dashboard')
  } catch (e) {
    error.value = e.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
