<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <div class="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-4">
          <span class="text-4xl"></span>
            <img src="/src/assets/download (2).jpg" alt="Logo" class="h-16 w-16 mx-auto">
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Sistem Akademik</h1>
        <p class="text-blue-100">Manajemen Akademik SMK</p>
      </div>

      <!-- Login Card -->
      <Card class="shadow-2xl">
        <!-- Demo Info -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p class="text-xs font-semibold text-blue-900 mb-2">Demo Akun:</p>
          <div class="space-y-1 text-xs text-blue-800">
            <p>Admin: admin@smk.com / admin123</p>
            <p>Guru: guru@smk.com / guru123</p>
            <p>Siswa: siswa@smk.com / siswa123</p>
            <p>Orang Tua: orangtua@smk.com / orangtua123</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <Input
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="admin@smk.com"
            :error="errors.email"
            required
          />

          <Input
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :error="errors.password"
            required
          />

          <div v-if="authStore.error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
            {{ authStore.error }}
          </div>

          <Button
            type="submit"
            variant="primary"
            :disabled="authStore.loading"
            class="w-full"
          >
            {{ authStore.loading ? 'Memproses...' : 'Masuk' }}
          </Button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Sistem Akademik Frontend Demo
        </p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useFormValidation } from '../../composables/useFormValidation'
import Card from '../../components/ui/Card.vue'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'

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
