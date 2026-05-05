<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Selamat datang, {{ authStore.user?.name }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Students -->
      <Card>
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-600 text-sm">Total Siswa</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ dashboardStore.studentsCount }}
            </p>
          </div>
          <div class="text-4xl">👥</div>
        </div>
      </Card>

      <!-- Teachers -->
      <Card>
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-600 text-sm">Total Guru</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ dashboardStore.teachersCount }}
            </p>
          </div>
          <div class="text-4xl">🧑‍🏫</div>
        </div>
      </Card>

      <!-- Attendance Today -->
      <Card>
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-600 text-sm">Hadir (Hari Ini)</p>
            <p class="text-3xl font-bold text-green-600 mt-2">
              {{ dashboardStore.attendanceTodayStats.present }}
            </p>
          </div>
          <div class="text-4xl">✅</div>
        </div>
      </Card>

      <!-- Absent Today -->
      <Card>
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-600 text-sm">Alfa (Hari Ini)</p>
            <p class="text-3xl font-bold text-red-600 mt-2">
              {{ dashboardStore.attendanceTodayStats.absent }}
            </p>
          </div>
          <div class="text-4xl">❌</div>
        </div>
      </Card>
    </div>

    <!-- Announcements Section -->
    <Card>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-900">📢 Pengumuman Terbaru</h2>
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
      <h2 class="text-xl font-semibold text-gray-900 mb-4">⚡ Akses Cepat</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RouterLink
          to="/students"
          class="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-center"
        >
          <div class="text-2xl mb-2">👥</div>
          <p class="text-sm font-medium text-gray-800">Siswa</p>
        </RouterLink>
        <RouterLink
          to="/teachers"
          class="p-4 rounded-lg bg-green-50 hover:bg-green-100 transition text-center"
        >
          <div class="text-2xl mb-2">🧑‍🏫</div>
          <p class="text-sm font-medium text-gray-800">Guru</p>
        </RouterLink>
        <RouterLink
          to="/attendance"
          class="p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition text-center"
        >
          <div class="text-2xl mb-2">✋</div>
          <p class="text-sm font-medium text-gray-800">Absensi</p>
        </RouterLink>
        <RouterLink
          to="/announcements"
          class="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition text-center"
        >
          <div class="text-2xl mb-2">📢</div>
          <p class="text-sm font-medium text-gray-800">Pengumuman</p>
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
