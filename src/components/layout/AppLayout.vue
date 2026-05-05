<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white hidden md:flex flex-col">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-2xl font-bold">📚 Akademik</h1>
      </div>

      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          :class="{ 'bg-blue-600': isActive(item.path) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center gap-3 mb-4">
          <img :src="authStore.user?.avatar" :alt="authStore.user?.name" class="w-10 h-10 rounded-full" />
          <div>
            <p class="text-sm font-medium">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-400">{{ authStore.user?.role }}</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" class="w-full" @click="handleLogout">
          Logout
        </Button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header class="bg-white border-b px-6 py-4 flex justify-between items-center md:hidden">
        <h1 class="text-xl font-bold">📚 Akademik</h1>
        <button class="text-gray-600">☰</button>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Button from './ui/Button.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const navigationItems = [
  { label: '📊 Dashboard', path: '/dashboard' },
  { label: '👥 Siswa', path: '/students' },
  { label: '🧑‍🏫 Guru', path: '/teachers' },
  { label: '📅 Jadwal', path: '/schedule' },
  { label: '✋ Absensi', path: '/attendance' },
  { label: '📝 Nilai', path: '/grades' },
  { label: '📢 Pengumuman', path: '/announcements' }
]

const isActive = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
