<template>
  <div class="max-w-4xl mx-auto space-y-10">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-black text-white">My Profile</h1>
      <p class="text-slate-500 mt-2">Manage your account settings and preferences</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Profile Information -->
      <div class="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 space-y-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h2 class="text-xl font-bold text-white">Personal Info</h2>
        </div>

        <form @submit.prevent="updateProfile" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Username</label>
            <input v-model="profileForm.username" type="text" class="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
            <input v-model="profileForm.email" type="email" class="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white" />
          </div>
          
          <button 
            type="submit" 
            :disabled="profileLoading"
            class="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-blue-500/10"
          >
            {{ profileLoading ? 'Updating...' : 'Save Changes' }}
          </button>
          
          <p v-if="profileMessage" :class="[profileError ? 'text-red-400' : 'text-green-400']" class="text-xs font-bold mt-4">{{ profileMessage }}</p>
        </form>
      </div>

      <!-- Password Security -->
      <div class="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 space-y-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 class="text-xl font-bold text-white">Security</h2>
        </div>

        <form @submit.prevent="updatePassword" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Current Password</label>
            <input v-model="passwordForm.currentPassword" type="password" class="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-white" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">New Password</label>
            <input v-model="passwordForm.newPassword" type="password" class="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-white" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm New Password</label>
            <input v-model="passwordForm.confirmPassword" type="password" class="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-white" />
          </div>
          
          <button 
            type="submit" 
            :disabled="passwordLoading"
            class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-500/10"
          >
            {{ passwordLoading ? 'Changing...' : 'Update Password' }}
          </button>
          
          <p v-if="passwordMessage" :class="[passwordError ? 'text-red-400' : 'text-green-400']" class="text-xs font-bold mt-4">{{ passwordMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

interface User {
  id: number
  username: string
  email: string
}

const { data: authData, refresh: refreshUser } = await useFetch<{ user: User }>('/api/auth/me')
const user = computed(() => authData.value?.user)

const profileForm = ref({
  username: user.value?.username || '',
  email: user.value?.email || ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const profileLoading = ref(false)
const profileMessage = ref('')
const profileError = ref(false)

const passwordLoading = ref(false)
const passwordMessage = ref('')
const passwordError = ref(false)

const updateProfile = async () => {
  profileLoading.value = true
  profileMessage.value = ''
  profileError.value = false
  
  try {
    await $fetch('/api/auth/profile', {
      method: 'PUT',
      body: {
        username: profileForm.value.username,
        email: profileForm.value.email
      }
    })
    profileMessage.value = 'Profile updated successfully!'
    await refreshUser()
  } catch (err: any) {
    profileError.value = true
    profileMessage.value = err.data?.statusMessage || 'Failed to update profile'
  } finally {
    profileLoading.value = false
  }
}

const updatePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = true
    passwordMessage.value = 'New passwords do not match'
    return
  }

  passwordLoading.value = true
  passwordMessage.value = ''
  passwordError.value = false
  
  try {
    await $fetch('/api/auth/password', {
      method: 'PUT',
      body: {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword
      }
    })
    passwordMessage.value = 'Password updated successfully!'
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (err: any) {
    passwordError.value = true
    passwordMessage.value = err.data?.statusMessage || 'Failed to change password'
  } finally {
    passwordLoading.value = false
  }
}
</script>
