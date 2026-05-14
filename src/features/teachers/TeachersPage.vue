<template>
  <div class="space-y-6 pb-20">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Manajemen Guru</h1>
        <p class="text-sm text-slate-500 mt-0.5">Kelola data tenaga pendidik dan bidang studi mereka.</p>
      </div>
      <Button v-if="isAdmin" variant="primary" @click="openAddModal">
        <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Guru
      </Button>
    </div>

    <!-- Filters Bar -->
    <div class="clean-card p-4 flex flex-col lg:flex-row lg:items-end gap-4">
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          label="Cari Guru"
          placeholder="Nama, NIP, atau Mata Pelajaran..."
        />
      </div>
      <div class="w-full lg:w-64">
        <label class="clean-label">Mata Pelajaran</label>
        <select 
          v-model="filterSubject"
          class="clean-input appearance-none cursor-pointer"
        >
          <option value="">Semua Mata Pelajaran</option>
          <option v-for="s in uniqueSubjects" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
        <button 
          @click="viewMode = 'table'"
          class="p-2 rounded-md transition-all"
          :class="viewMode === 'table' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          @click="viewMode = 'grid'"
          class="p-2 rounded-md transition-all"
          :class="viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Data Display -->
    <div v-if="filteredTeachers.length === 0" class="clean-card py-20 text-center">
      <p class="text-slate-400 font-medium">Tidak ada data guru yang sesuai.</p>
    </div>

    <div v-else-if="viewMode === 'table'" class="clean-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Nama Guru</th>
              <th class="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Identitas / NIP</th>
              <th class="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Spesialisasi</th>
              <th class="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Email</th>
              <th v-if="isAdmin" class="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-[10px] text-right">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {{ teacher.name.charAt(0) }}
                  </div>
                  <span class="font-semibold text-slate-900">{{ teacher.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600 font-medium">{{ teacher.nip }}</td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="s in teacher.subjects" :key="s" class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{{ s }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-500">{{ teacher.email }}</td>
              <td v-if="isAdmin" class="px-6 py-4 text-right">
                <div class="flex justify-end gap-1">
                  <button @click="openEditModal(teacher)" class="p-2 text-slate-400 hover:text-indigo-600 rounded hover:bg-indigo-50 transition-all">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button @click="deleteTeacher(teacher.id)" class="p-2 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-all">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Grid Mode -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="teacher in filteredTeachers" :key="teacher.id" class="clean-card p-6 group">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            {{ teacher.name.charAt(0) }}
          </div>
          <div v-if="isAdmin" class="flex gap-1">
            <button @click="openEditModal(teacher)" class="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
            <button @click="deleteTeacher(teacher.id)" class="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
          </div>
        </div>
        <h3 class="font-bold text-slate-900">{{ teacher.name }}</h3>
        <p class="text-xs text-slate-500 mt-0.5">NIP: {{ teacher.nip }}</p>
        <div class="flex flex-wrap gap-1.5 mt-4">
          <span v-for="s in teacher.subjects" :key="s" class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{{ s }}</span>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Aktif</span>
          </div>
          <button class="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Detail Profil</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      :is-open="showModal"
      :title="editingTeacher ? 'Edit Data Guru' : 'Tambah Guru Baru'"
      subtitle="Pastikan data yang dimasukkan sesuai dengan dokumen resmi."
      confirm-text="Simpan Data"
      @close="closeModal"
      @confirm="saveTeacher"
    >
      <div class="space-y-4">
        <Input v-model="formData.name" label="Nama Lengkap" placeholder="Masukkan nama dan gelar" />
        <Input v-model="formData.nip" label="NIP" placeholder="Nomor Induk Pegawai" />
        <Input v-model="subjectsInput" label="Mata Pelajaran" placeholder="Gunakan koma sebagai pemisah" />
        <Input v-model="formData.email" label="Email" type="email" placeholder="nama@sekolah.sch.id" />
        <Input v-model="classesInput" label="Daftar Kelas" placeholder="Contoh: X RPL 1, XI TKJ 2" />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import type { Teacher } from '../../types'
import teachersData from '../../data/teachers.json'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import Input from '../../components/ui/Input.vue'

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')

const teachers = ref<Teacher[]>(teachersData.teachers)
const searchQuery = ref('')
const filterSubject = ref('')
const viewMode = ref<'table' | 'grid'>('table')

const uniqueSubjects = computed(() => {
  const subs = new Set<string>()
  teachers.value.forEach(t => t.subjects.forEach(s => subs.add(s)))
  return Array.from(subs).sort()
})

const filteredTeachers = computed(() => {
  return teachers.value.filter(t => {
    const matchesSearch = !searchQuery.value || 
      t.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      t.nip.includes(searchQuery.value) ||
      t.subjects.some(s => s.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesSubject = !filterSubject.value || t.subjects.includes(filterSubject.value)
    return matchesSearch && matchesSubject
  })
})

const showModal = ref(false)
const editingTeacher = ref<Teacher | null>(null)
const classesInput = ref('')
const subjectsInput = ref('')
const formData = reactive({ name: '', nip: '', email: '', phone: '' })

const openAddModal = () => {
  editingTeacher.value = null
  formData.name = ''; formData.nip = ''; formData.email = ''; formData.phone = '';
  classesInput.value = ''; subjectsInput.value = '';
  showModal.value = true
}

const openEditModal = (teacher: Teacher) => {
  editingTeacher.value = teacher
  formData.name = teacher.name; formData.nip = teacher.nip; formData.email = teacher.email; formData.phone = teacher.phone || '';
  classesInput.value = teacher.classes.join(', '); subjectsInput.value = teacher.subjects.join(', ');
  showModal.value = true
}

const closeModal = () => { showModal.value = false }

const saveTeacher = () => {
  const tClasses = classesInput.value.split(',').map(c => c.trim()).filter(c => c !== '')
  const tSubjects = subjectsInput.value.split(',').map(s => s.trim()).filter(s => s !== '')
  
  if (editingTeacher.value) {
    const index = teachers.value.findIndex(t => t.id === editingTeacher.value?.id)
    if (index !== -1) {
      teachers.value[index] = { ...editingTeacher.value, ...formData, classes: tClasses, subjects: tSubjects }
    }
  } else {
    teachers.value.push({ id: Date.now().toString(), ...formData, classes: tClasses, subjects: tSubjects } as Teacher)
  }
  closeModal()
  saveTeachersToFile()
}

const saveTeachersToFile = async () => {
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: 'teachers', data: { teachers: teachers.value } })
    })
  } catch (error) { console.error('Failed to save teachers:', error) }
}

const deleteTeacher = (id: string) => {
  if (confirm('Hapus data guru ini?')) {
    teachers.value = teachers.value.filter(t => t.id !== id)
    saveTeachersToFile()
  }
}
</script>
