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

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input v-model="rememberMe" type="checkbox" class="peer sr-only" />
              <div class="w-5 h-5 border-2 border-slate-700 rounded-md peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all"></div>
              <svg class="absolute w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors uppercase tracking-widest">Remember Me</span>
          </label>
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
const rememberMe = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('login_credentials')
  if (saved) {
    try {
      const { username, password } = JSON.parse(saved)
      form.username = username
      form.password = password
      rememberMe.value = true
    } catch (e) {
      localStorage.removeItem('login_credentials')
    }
  }
})

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })
    if (rememberMe.value) {
      localStorage.setItem('login_credentials', JSON.stringify({
        username: form.username,
        password: form.password
      }))
    } else {
      localStorage.removeItem('login_credentials')
    }
    navigateTo('/dashboard')
  } catch (e) {
    error.value = e.data?.data || e.data?.statusMessage || e.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
