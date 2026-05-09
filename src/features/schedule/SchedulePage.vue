<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Jadwal Pelajaran</h1>
      <p class="text-gray-600 mt-1">Jadwal mengajar untuk semua kelas</p>
    </div>

    <!-- Schedule by Classes -->
    <div class="space-y-6">
      <Card>
        <h2 class="text-lg font-semibold text-gray-900 mb-5">Jadwal Kelas XII-A</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Jam</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Mata Pelajaran</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Guru</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Ruangan</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="(slot, idx) in scheduleXIIA" :key="idx" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ slot.time }}</td>
                <td class="px-4 py-3">{{ slot.subject }}</td>
                <td class="px-4 py-3">{{ slot.teacher }}</td>
                <td class="px-4 py-3">{{ slot.room }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 class="text-lg font-semibold text-gray-900 mb-5">Jadwal Kelas XI-B</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Jam</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Mata Pelajaran</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Guru</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Ruangan</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="(slot, idx) in scheduleXIB" :key="idx" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ slot.time }}</td>
                <td class="px-4 py-3">{{ slot.subject }}</td>
                <td class="px-4 py-3">{{ slot.teacher }}</td>
                <td class="px-4 py-3">{{ slot.room }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 class="text-lg font-semibold text-gray-900 mb-5">Jadwal Kelas X-C</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Jam</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Mata Pelajaran</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Guru</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Ruangan</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="(slot, idx) in scheduleXC" :key="idx" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ slot.time }}</td>
                <td class="px-4 py-3">{{ slot.subject }}</td>
                <td class="px-4 py-3">{{ slot.teacher }}</td>
                <td class="px-4 py-3">{{ slot.room }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '../../components/ui/Card.vue'

interface ScheduleSlot {
  time: string
  subject: string
  teacher: string
  room: string
}

const scheduleXIIA = ref<ScheduleSlot[]>([
  { time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Budi Santoso', room: 'A-101' },
  { time: '08:30 - 10:00', subject: 'Bahasa Indonesia', teacher: 'Siti Rahayu', room: 'A-101' },
  { time: '10:15 - 11:45', subject: 'Teknologi Informasi', teacher: 'Adi Wijaya', room: 'Lab IT' },
  { time: '12:30 - 14:00', subject: 'Fisika', teacher: 'Dina Kusumawardhani', room: 'A-102' }
])

const scheduleXIB = ref<ScheduleSlot[]>([
  { time: '07:00 - 08:30', subject: 'Bahasa Inggris', teacher: 'Budi Santoso', room: 'B-201' },
  { time: '08:30 - 10:00', subject: 'Matematika', teacher: 'Siti Rahayu', room: 'B-201' },
  { time: '10:15 - 11:45', subject: 'Fisika', teacher: 'Adi Wijaya', room: 'Lab' },
  { time: '12:30 - 14:00', subject: 'Kimia', teacher: 'Dina Kusumawardhani', room: 'B-202' }
])

const scheduleXC = ref<ScheduleSlot[]>([
  { time: '07:00 - 08:30', subject: 'Teknologi Informasi', teacher: 'Adi Wijaya', room: 'Lab IT' },
  { time: '08:30 - 10:00', subject: 'Matematika', teacher: 'Budi Santoso', room: 'C-301' },
  { time: '10:15 - 11:45', subject: 'Bahasa Indonesia', teacher: 'Siti Rahayu', room: 'C-301' },
  { time: '12:30 - 14:00', subject: 'Penjas Orkes', teacher: 'Dina Kusumawardhani', room: 'Lapangan' }
])
</script>
