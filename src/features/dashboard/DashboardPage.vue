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
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 text-xl">👥</span>
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
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span class="text-green-600 text-xl">👨‍🏫</span>
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
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <span class="text-emerald-600 text-xl">✓</span>
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
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span class="text-red-600 text-xl">—</span>
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
          to="/students"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <p class="text-xl mb-2">👥</p>
          <p class="text-sm font-medium text-gray-900 group-hover:text-blue-600">Siswa</p>
        </RouterLink>
        <RouterLink
          to="/teachers"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <p class="text-xl mb-2">👨‍🏫</p>
          <p class="text-sm font-medium text-gray-900 group-hover:text-green-600">Guru</p>
        </RouterLink>
        <RouterLink
          to="/attendance"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <p class="text-xl mb-2">📋</p>
          <p class="text-sm font-medium text-gray-900 group-hover:text-orange-600">Absensi</p>
        </RouterLink>
        <RouterLink
          to="/grades"
          class="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-center group"
        >
          <p class="text-xl mb-2">📊</p>
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
