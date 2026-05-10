<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Selamat datang, {{ authStore.user?.name }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Students -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Siswa</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">
              {{ dashboardStore.studentsCount }}
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Teachers -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Guru</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">
              {{ dashboardStore.teachersCount }}
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Attendance Today -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Hadir Hari Ini</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">
              {{ dashboardStore.attendanceTodayStats.present }}
            </p>
          </div>
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Absent Today -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Alfa Hari Ini</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">
              {{ dashboardStore.attendanceTodayStats.absent }}
            </p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Announcements Section -->
    <Card>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-900">Pengumuman Terbaru</h2>
      </div>

      <div v-if="dashboardStore.latestAnnouncements.length === 0" class="text-center py-8">
        <p class="text-gray-500">Tidak ada pengumuman</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="announcement in dashboardStore.latestAnnouncements"
          :key="announcement.id"
          class="border-l-4 pl-4 py-3"
          :class="{
            'border-red-500 bg-red-50': announcement.category === 'urgent',
            'border-yellow-500 bg-yellow-50': announcement.category === 'warning',
            'border-blue-500 bg-blue-50': announcement.category === 'info'
          }"
        >
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-gray-900">{{ announcement.title }}</h3>
                <Badge :variant="announcement.category">
                  {{ announcement.category }}
                </Badge>
              </div>
              <p class="text-sm text-gray-600 line-clamp-2">{{ announcement.content }}</p>
              <p class="text-xs text-gray-500 mt-2">
                {{ new Date(announcement.createdAt).toLocaleDateString('id-ID') }} •
                {{ announcement.author }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Quick Actions -->
    <Card>
      <h2 class="text-xl font-semibold text-gray-900 mb-5">Akses Cepat</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RouterLink
          v-if="['admin', 'guru', 'orangtua'].includes(authStore.user?.role || '')"
          to="/students"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <div class="mb-2 text-blue-500 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-900 group-hover:text-blue-600">Siswa</p>
        </RouterLink>
        <RouterLink
          v-if="authStore.user?.role === 'admin'"
          to="/teachers"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <div class="mb-2 text-green-500 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-900 group-hover:text-green-600">Guru</p>
        </RouterLink>
        <RouterLink
          to="/attendance"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <div class="mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-900 group-hover:text-orange-600">Absensi</p>
        </RouterLink>
        <RouterLink
          to="/grades"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <div class="mb-2 text-purple-500 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-900 group-hover:text-purple-600">Nilai</p>
        </RouterLink>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '../../stores/dashboard'
import { useAuthStore } from '../../stores/auth'
import Card from '../../components/ui/Card.vue'
import Badge from '../../components/ui/Badge.vue'
import { RouterLink } from 'vue-router'

const dashboardStore = useDashboardStore()
const authStore = useAuthStore()
</script>
