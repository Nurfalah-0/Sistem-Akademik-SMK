<template>
  <div class="space-y-10 pb-20">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-surface-900 tracking-tight">Manajemen Siswa</h1>
        <p class="text-surface-500 mt-1 flex items-center gap-2 font-medium">
          <span class="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
          {{ studentStore.filteredStudents.length }} Siswa terverifikasi dalam database
        </p>
      </div>
      <Button v-if="authStore.user?.role === 'admin'" variant="primary" size="lg" @click="openAddModal">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Registrasi Siswa
      </Button>
    </div>

    <!-- Filters Bar -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end premium-card p-6">
      <div class="lg:col-span-3">
        <Input
          :model-value="studentStore.searchQuery"
          type="text"
          label="Pencarian Global"
          placeholder="Cari identitas, NISN, atau kontak siswa..."
          @update:model-value="(val) => studentStore.setSearch(String(val))"
        />
      </div>
      <div>
        <label class="block text-[11px] font-black text-surface-400 uppercase tracking-widest mb-2 px-1">
          Klaster Kelas
        </label>
        <select
          :value="studentStore.classFilter"
          @change="studentStore.setClassFilter(($event.target as HTMLSelectElement).value as any)"
          class="w-full px-5 py-3.5 bg-surface-100/50 border border-surface-200/60 rounded-2xl text-surface-900 font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all appearance-none cursor-pointer"
        >
          <option value="">Semua Klaster</option>
          <option v-for="c in classesList" :key="c.id" :value="c.name">
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Content Area -->
    <div v-if="studentStore.filteredStudents.length === 0" class="premium-card py-24 text-center">
       <div class="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-surface-200">
        <svg class="w-10 h-10 text-surface-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-2xl font-black text-surface-900 tracking-tight">Data Tidak Terdeteksi</h3>
      <p class="text-surface-500 mt-2 font-medium">Sesuaikan parameter pencarian atau filter klaster Anda.</p>
    </div>

    <div v-else class="premium-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-surface-50 border-b border-surface-200/60">
              <th class="px-8 py-5 text-[10px] font-black text-surface-400 uppercase tracking-[0.2em]">Profil Siswa</th>
              <th class="px-8 py-5 text-[10px] font-black text-surface-400 uppercase tracking-[0.2em]">Identitas (NISN)</th>
              <th class="px-8 py-5 text-[10px] font-black text-surface-400 uppercase tracking-[0.2em] text-center">Klaster</th>
              <th class="px-8 py-5 text-[10px] font-black text-surface-400 uppercase tracking-[0.2em]">Kontak</th>
              <th v-if="authStore.user?.role === 'admin'" class="px-8 py-5 text-[10px] font-black text-surface-400 uppercase tracking-[0.2em] text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr
              v-for="student in studentStore.filteredStudents"
              :key="student.id"
              class="hover:bg-surface-50/80 transition-all duration-300 group"
            >
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <div class="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 font-black text-base uppercase border border-brand-100 group-hover:bg-brand-600 group-hover:text-white transition-all">
                      {{ student.name.charAt(0) }}
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div>
                    <div class="font-black text-surface-900 text-base tracking-tight leading-tight group-hover:text-brand-600 transition-colors">{{ student.name }}</div>
                    <div class="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-1">Siswa Aktif</div>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span class="px-3 py-1.5 bg-surface-100 rounded-lg text-[11px] font-bold text-surface-600 border border-surface-200/60 font-mono">
                  {{ student.nisn }}
                </span>
              </td>
              <td class="px-8 py-6 text-center">
                <span class="inline-flex px-4 py-1.5 bg-brand-50 text-brand-600 text-[10px] font-black rounded-xl border border-brand-100 uppercase tracking-widest">
                  {{ student.class }}
                </span>
              </td>
              <td class="px-8 py-6">
                <div class="text-[13px] text-surface-900 font-bold">{{ student.email }}</div>
                <div class="text-[10px] text-surface-400 font-medium mt-0.5 uppercase tracking-tighter">{{ student.phone || 'N/A' }}</div>
              </td>
              <td v-if="authStore.user?.role === 'admin'" class="px-8 py-6 text-right">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button
                    @click="editStudent(student)"
                    class="p-2.5 bg-surface-100 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl border border-surface-200/60 transition-all"
                    title="Edit Profil"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteStudent(student.id)"
                    class="p-2.5 bg-surface-100 text-surface-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl border border-surface-200/60 transition-all"
                    title="Hapus Record"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

    <!-- Modal Form -->
    <Modal
      :is-open="showModal"
      :title="editingStudent ? 'Ubah Informasi Siswa' : 'Registrasi Siswa Baru'"
      subtitle="Silakan lengkapi data identitas siswa untuk pendaftaran ke dalam sistem."
      confirm-text="Simpan Record"
      @close="closeModal"
      @confirm="saveStudent"
    >
      <div class="space-y-6">
        <Input
          v-model="formData.name"
          label="Nama Lengkap Siswa"
          placeholder="Masukkan identitas resmi siswa"
          :error="formErrors.name"
          required
        />

        <Input
          v-model="formData.nisn"
          label="Nomor Induk Siswa Nasional (NISN)"
          placeholder="10 digit angka unik"
          :error="formErrors.nisn"
          required
        />

        <div>
          <label class="block text-[11px] font-black text-surface-400 uppercase tracking-widest mb-2 px-1">Klaster Kelas</label>
          <select
            v-model="formData.class"
            class="w-full px-5 py-3.5 bg-surface-100/50 border border-surface-200/60 rounded-2xl text-surface-900 font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all appearance-none cursor-pointer"
            required
          >
            <option v-for="c in classesList" :key="c.id" :value="c.name">{{ c.name }}</option>
          </select>
          <p v-if="formErrors.class" class="mt-2 text-[10px] text-rose-500 font-bold uppercase tracking-widest px-1">{{ formErrors.class }}</p>
        </div>

        <Input
          v-model="formData.email"
          type="email"
          label="Alamat Email Siswa"
          placeholder="siswa@domain.edu"
          :error="formErrors.email"
          required
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Input
            v-model="formData.phone"
            label="Nomor Telepon"
            placeholder="08..."
            :error="formErrors.phone"
          />
          <Input
            v-model="formData.address"
            label="Alamat Domisili"
            placeholder="Kota Asal / Alamat"
            :error="formErrors.address"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStudentStore } from '../../stores/student'
import { useFormValidation } from '../../composables/useFormValidation'
import type { Student } from '../../types'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import { useAuthStore } from '../../stores/auth'
import classesData from '../../data/classes.json'

const studentStore = useStudentStore()
const authStore = useAuthStore()
const showModal = ref(false)
const editingStudent = ref<Student | null>(null)
const classesList = ref(classesData.classes)

const formData = reactive({
  name: '',
  nisn: '',
  class: '',
  email: '',
  phone: '',
  address: ''
})

const { errors: formErrors, validateForm, clearErrors } = useFormValidation({
  name: { required: true },
  nisn: { required: true },
  class: { required: true },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: {},
  address: {}
})

const openAddModal = () => {
  editingStudent.value = null
  clearForm()
  showModal.value = true
}

const clearForm = () => {
  clearErrors()
  formData.name = ''
  formData.nisn = ''
  formData.class = ''
  formData.email = ''
  formData.phone = ''
  formData.address = ''
}

const editStudent = (student: Student) => {
  editingStudent.value = student
  Object.assign(formData, student)
  showModal.value = true
}

const saveStudent = () => {
  if (!validateForm(formData)) {
    return
  }

  if (editingStudent.value) {
    studentStore.updateStudent(editingStudent.value.id, formData)
  } else {
    studentStore.addStudent(formData as any)
  }

  closeModal()
}

const deleteStudent = (id: string) => {
  if (confirm('Konfirmasi: Hapus record siswa ini secara permanen dari database?')) {
    studentStore.deleteStudent(id)
  }
}

const closeModal = () => {
  showModal.value = false
  clearForm()
}
</script>
