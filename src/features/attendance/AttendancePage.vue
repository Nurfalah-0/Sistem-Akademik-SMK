<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center flex-col md:flex-row gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Absensi Siswa</h1>
        <p class="text-gray-600">Pencatatan kehadiran siswa</p>
      </div>
    </div>

    <!-- Date Selector -->
    <Card>
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
          <input
            v-model="selectedDate"
            type="date"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
          <select
            v-model="selectedClass"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
          >
            <option value="">Semua Kelas</option>
            <option value="XII-A">XII-A</option>
            <option value="XI-B">XI-B</option>
            <option value="X-C">X-C</option>
          </select>
        </div>
        <Button variant="primary" @click="saveAttendance" class="mt-6">
          Simpan
        </Button>
      </div>
    </Card>

    <!-- Attendance Table -->
    <Card>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">No</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nama Siswa</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Kelas</th>
              <th class="px-6 py-3 text-center text-xs font-semibold text-gray-700">Status</th>
              <th class="px-6 py-3 text-center text-xs font-semibold text-gray-700">Keterangan</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(student, idx) in filteredStudents" :key="student.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-gray-600">{{ idx + 1 }}</td>
              <td class="px-6 py-4 font-medium text-gray-900">{{ student.name }}</td>
              <td class="px-6 py-4 text-gray-600">
                <Badge variant="info">{{ student.class }}</Badge>
              </td>
              <td class="px-6 py-4 text-center">
                <select
                  :value="getAttendanceStatus(student.id)"
                  @change="setAttendanceStatus(student.id, ($event.target as HTMLSelectElement).value as any)"
                  class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all"
                >
                  <option value="hadir">Hadir</option>
                  <option value="izin">Izin</option>
                  <option value="alfa">Alfa</option>
                </select>
              </td>
              <td class="px-6 py-4 text-center">
                <input
                  :value="getAttendanceNote(student.id)"
                  @input="setAttendanceNote(student.id, ($event.target as HTMLInputElement).value)"
                  type="text"
                  placeholder="Keterangan"
                  class="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <p class="text-gray-600 text-sm">Total Hadir</p>
        <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.present }}</p>
      </Card>
      <Card>
        <p class="text-gray-600 text-sm">Total Izin</p>
        <p class="text-3xl font-bold text-yellow-600 mt-2">{{ stats.permission }}</p>
      </Card>
      <Card>
        <p class="text-gray-600 text-sm">Total Alfa</p>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ stats.absent }}</p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Student } from '../../types'
import studentsData from '../../data/students.json'
import Card from '../../components/ui/Card.vue'
import Button from '../../components/ui/Button.vue'
import Badge from '../../components/ui/Badge.vue'

interface AttendanceEntry {
  studentId: string
  status: 'hadir' | 'izin' | 'alfa'
  note?: string
}

const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedClass = ref('')
const students = ref<Student[]>(studentsData.students)
const attendance = ref<Map<string, AttendanceEntry>>(new Map())
const notes = ref<Map<string, string>>(new Map())

const filteredStudents = computed(() => {
  if (!selectedClass.value) {
    return students.value
  }
  return students.value.filter(s => s.class === selectedClass.value)
})

const stats = computed(() => {
  const entries = Array.from(attendance.value.values()).filter(a =>
    filteredStudents.value.some(s => s.id === a.studentId)
  )

  return {
    present: entries.filter(a => a.status === 'hadir').length,
    permission: entries.filter(a => a.status === 'izin').length,
    absent: entries.filter(a => a.status === 'alfa').length
  }
})

const getAttendanceStatus = (studentId: string) => {
  return attendance.value.get(studentId)?.status || 'hadir'
}

const setAttendanceStatus = (studentId: string, status: 'hadir' | 'izin' | 'alfa') => {
  const entry = attendance.value.get(studentId) || { studentId, status: 'hadir' }
  entry.status = status
  attendance.value.set(studentId, entry)
}

const getAttendanceNote = (studentId: string) => {
  return notes.value.get(studentId) || ''
}

const setAttendanceNote = (studentId: string, note: string) => {
  notes.value.set(studentId, note)
}

const saveAttendance = () => {
  alert(`Absensi untuk tanggal ${selectedDate.value} berhasil disimpan!`)
}
</script>
