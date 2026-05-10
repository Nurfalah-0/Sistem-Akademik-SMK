<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 text-gray-900 hidden md:flex flex-col shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">Akademik SMK</h1>
      </div>

      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          :class="{ 
            'bg-blue-100 text-blue-700': isActive(item.path), 
            'text-gray-700 hover:bg-gray-100': !isActive(item.path) 
          }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3 mb-4 p-3 rounded-lg bg-gray-50">
          <img :src="authStore.user?.avatar" :alt="authStore.user?.name" class="w-10 h-10 rounded-full object-cover" />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 truncate">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-500 capitalize">{{ authStore.user?.role }}</p>
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
      <header class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center md:hidden shadow-sm">
        <h1 class="text-lg font-bold text-gray-900">Akademik</h1>
        <button class="text-gray-700">☰</button>
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
import { useAuthStore } from '../../stores/auth'
import Button from '../ui/Button.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const navigationConfig = [
  { label: 'Dashboard', path: '/dashboard', roles: ['admin', 'guru', 'siswa', 'orangtua'] },
  { label: 'Siswa', path: '/students', roles: ['admin', 'guru', 'orangtua'] },
  { label: 'Guru', path: '/teachers', roles: ['admin'] },
  { label: 'Jadwal', path: '/schedule', roles: ['admin', 'guru', 'siswa', 'orangtua'] },
  { label: 'Absensi', path: '/attendance', roles: ['admin', 'guru', 'siswa', 'orangtua'] },
  { label: 'Nilai', path: '/grades', roles: ['admin', 'guru', 'siswa', 'orangtua'] },
  { label: 'Pengumuman', path: '/announcements', roles: ['admin', 'guru', 'siswa', 'orangtua'] }
]

const navigationItems = computed(() => {
  const userRole = authStore.user?.role || ''
  return navigationConfig.filter(item => item.roles.includes(userRole))
})

const isActive = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
