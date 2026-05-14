<template>
  <div class="space-y-10 pb-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Presensi Kehadiran</h1>
        <p class="text-slate-500 mt-1 flex items-center gap-2">
          <span class="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          Pemantauan kehadiran siswa harian
        </p>
      </div>
      <Button v-if="canEdit" variant="primary" @click="saveAttendance" class="shadow-lg shadow-indigo-100 min-w-[140px]">
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-1.5-1.5M12 14l3-3m-3 4v-7" />
          </svg>
          Simpan Rekap
        </span>
      </Button>
    </div>

    <!-- Controls Bar -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end bg-white p-7 rounded-[32px] border border-slate-200/60 shadow-sm">
      <div class="space-y-2">
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Pilih Tanggal</label>
        <div class="relative">
          <input
            v-model="selectedDate"
            type="date"
            class="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
          <svg class="w-5 h-5 text-slate-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Pilih Kelas</label>
        <div class="relative">
          <select
            v-model="selectedClass"
            class="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
          >
            <option value="">Semua Kelas</option>
            <option value="XII-A">Kelas XII-A</option>
            <option value="XI-B">Kelas XI-B</option>
            <option value="X-C">Kelas X-C</option>
          </select>
          <svg class="w-5 h-5 text-slate-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      
      <!-- Stats Quick View -->
      <div class="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
         <div class="flex-1 text-center py-2 px-1 bg-white rounded-xl shadow-sm border border-slate-200/50">
            <p class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Hadir</p>
            <p class="text-sm font-extrabold text-slate-900">{{ stats.present }}</p>
         </div>
         <div class="flex-1 text-center py-2 px-1 bg-white rounded-xl shadow-sm border border-slate-200/50">
            <p class="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Izin</p>
            <p class="text-sm font-extrabold text-slate-900">{{ stats.permission }}</p>
         </div>
         <div class="flex-1 text-center py-2 px-1 bg-white rounded-xl shadow-sm border border-slate-200/50">
            <p class="text-[9px] font-bold text-rose-500 uppercase tracking-widest">Alfa</p>
            <p class="text-sm font-extrabold text-slate-900">{{ stats.absent }}</p>
         </div>
      </div>
    </div>

    <!-- Attendance Table -->
    <div class="bg-white border border-slate-200/60 rounded-[32px] shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-20">No</th>
              <th class="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nama Siswa</th>
              <th class="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th class="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Keterangan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="(student, idx) in filteredStudents" :key="student.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-8 py-5 text-slate-400 font-mono text-sm">{{ String(idx + 1).padStart(2, '0') }}</td>
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px]">
                    {{ student.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">{{ student.name }}</div>
                    <div class="text-[11px] text-indigo-500 font-bold uppercase tracking-wider mt-0.5">{{ student.class }}</div>
                  </div>
                </div>
              </td>
              <td class="px-8 py-5">
                <select
                  :value="getAttendanceStatus(student.id)"
                  @change="setAttendanceStatus(student.id, ($event.target as HTMLSelectElement).value as any)"
                  :disabled="!canEdit"
                  class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all disabled:opacity-50 appearance-none min-w-[100px] cursor-pointer"
                  :class="{
                    'text-emerald-600 !bg-emerald-50 !border-emerald-100': getAttendanceStatus(student.id) === 'hadir',
                    'text-amber-600 !bg-amber-50 !border-amber-100': getAttendanceStatus(student.id) === 'izin',
                    'text-rose-600 !bg-rose-50 !border-rose-100': getAttendanceStatus(student.id) === 'alfa',
                  }"
                >
                  <option value="hadir">Hadir</option>
                  <option value="izin">Izin</option>
                  <option value="alfa">Alfa</option>
                </select>
              </td>
              <td class="px-8 py-5">
                <input
                  :value="getAttendanceNote(student.id)"
                  @input="setAttendanceNote(student.id, ($event.target as HTMLInputElement).value)"
                  type="text"
                  placeholder="Catatan..."
                  :disabled="!canEdit"
                  class="w-full max-w-[200px] px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="group bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:border-emerald-300 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tingkat Kehadiran</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900">{{ stats.present }}</p>
        <p class="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-2">Siswa Hadir</p>
      </div>

      <div class="group bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:border-amber-300 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Izin / Sakit</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900">{{ stats.permission }}</p>
        <p class="text-xs font-bold text-amber-500 uppercase tracking-widest mt-2">Siswa Berhalangan</p>
      </div>

      <div class="group bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:border-rose-300 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanpa Keterangan</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900">{{ stats.absent }}</p>
        <p class="text-xs font-bold text-rose-500 uppercase tracking-widest mt-2">Siswa Absen</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Student } from '../../types'
import studentsData from '../../data/students.json'
import Button from '../../components/ui/Button.vue'
import { useAuthStore } from '../../stores/auth'

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

const authStore = useAuthStore()
const canEdit = computed(() => ['admin', 'guru'].includes(authStore.user?.role || ''))

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

