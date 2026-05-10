<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo & Header -->
      <div class="flex flex-col items-center">
        <div class="h-20 w-20 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center p-2 mb-6">
          <img src="/src/assets/download (2).jpg" alt="Logo SMK" class="h-full w-full object-contain">
        </div>
        <h2 class="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Sistem Akademik
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600">
          Manajemen Akademik Terpadu SMK
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/40 sm:rounded-2xl sm:px-10 border border-slate-100">
        
        <!-- Demo Info -->
        <div class="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-100">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">Akun Demo Tersedia</h3>
              <div class="mt-2 text-xs text-blue-700 space-y-1.5 font-mono">
                <p><span class="font-semibold">Admin:</span> admin@smk.com / admin123</p>
                <p><span class="font-semibold">Guru:</span> guru@smk.com / guru123</p>
                <p><span class="font-semibold">Siswa:</span> siswa@smk.com / siswa123</p>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700">
              Alamat Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Masukkan email Anda"
              />
            </div>
            <p v-if="errors.email" class="mt-1.5 text-xs text-red-500">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700">
              Kata Sandi
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
            <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
          </div>

          <div v-if="authStore.error" class="rounded-lg bg-red-50 p-4 border border-red-100">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ authStore.error }}</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ authStore.loading ? 'Sedang memproses...' : 'Masuk' }}
            </button>
          </div>
        </form>

        <div class="mt-8 text-center">
          <p class="text-xs text-slate-500">
            &copy; {{ new Date().getFullYear() }} Sistem Akademik SMK. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useFormValidation } from '../../composables/useFormValidation'


const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const { errors, validateForm, clearErrors } = useFormValidation({
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 6
  }
})

const handleLogin = async () => {
  clearErrors()

  if (!validateForm(form)) {
    return
  }

  const success = await authStore.login(form.email, form.password)

  if (success) {
    router.push('/dashboard')
  }
}
</script>
