<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">📚 Akademik SMK</h1>
        <p class="text-gray-600">Sistem Manajemen Akademik Sekolah</p>
      </div>

      <!-- Demo Users Info -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p class="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</p>
        <div class="space-y-1 text-xs text-blue-700">
          <p>Admin: admin@smk.com / admin123</p>
          <p>Guru: guru@smk.com / guru123</p>
          <p>Siswa: siswa@smk.com / siswa123</p>
          <p>Orang Tua: orangtua@smk.com / orangtua123</p>
        </div>
      </div>

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

        <div v-if="authStore.error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ authStore.error }}
        </div>

        <Button
          type="submit"
          variant="primary"
          :disabled="authStore.loading"
          class="w-full"
        >
          {{ authStore.loading ? 'Loading...' : 'Login' }}
        </Button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Sistem Akademik Frontend Demo
      </p>
    </Card>
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
