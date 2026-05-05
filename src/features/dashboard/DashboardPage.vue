<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Selamat datang, {{ authStore.user?.name }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Students -->
      <Card class="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-blue-700 text-sm font-medium">Total Siswa</p>
            <p class="text-3xl font-bold text-blue-900 mt-2">
              {{ dashboardStore.studentsCount }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Teachers -->
      <Card class="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-green-700 text-sm font-medium">Total Guru</p>
            <p class="text-3xl font-bold text-green-900 mt-2">
              {{ dashboardStore.teachersCount }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Attendance Today -->
      <Card class="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-emerald-700 text-sm font-medium">Hadir Hari Ini</p>
            <p class="text-3xl font-bold text-emerald-900 mt-2">
              {{ dashboardStore.attendanceTodayStats.present }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Absent Today -->
      <Card class="bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-red-700 text-sm font-medium">Alfa Hari Ini</p>
            <p class="text-3xl font-bold text-red-900 mt-2">
              {{ dashboardStore.attendanceTodayStats.absent }}
            </p>
          </div>
        </div>
      </Card>
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
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Akses Cepat</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RouterLink
          to="/students"
          class="p-4 rounded border border-blue-200 bg-blue-50 hover:bg-blue-100 transition text-center"
        >
          <p class="text-sm font-medium text-blue-900">Siswa</p>
        </RouterLink>
        <RouterLink
          to="/teachers"
          class="p-4 rounded border border-green-200 bg-green-50 hover:bg-green-100 transition text-center"
        >
          <p class="text-sm font-medium text-green-900">Guru</p>
        </RouterLink>
        <RouterLink
          to="/attendance"
          class="p-4 rounded border border-orange-200 bg-orange-50 hover:bg-orange-100 transition text-center"
        >
          <p class="text-sm font-medium text-orange-900">Absensi</p>
        </RouterLink>
        <RouterLink
          to="/announcements"
          class="p-4 rounded border border-purple-200 bg-purple-50 hover:bg-purple-100 transition text-center"
        >
          <p class="text-sm font-medium text-purple-900">Pengumuman</p>
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
