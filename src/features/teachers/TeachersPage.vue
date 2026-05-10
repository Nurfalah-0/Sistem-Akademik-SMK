<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Daftar Guru</h1>
        <p class="text-gray-600 mt-1">Total: {{ teachers.length }} guru</p>
      </div>
      <Button v-if="isAdmin" variant="primary" @click="openAddModal">
        Tambah Guru
      </Button>
    </div>

    <!-- Teachers Grid -->
    <div v-if="teachers.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada data guru</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="teacher in teachers"
        :key="teacher.id"
        class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all flex flex-col"
      >
        <div class="flex justify-between items-start mb-1">
          <h3 class="font-semibold text-gray-900 text-lg">{{ teacher.name }}</h3>
          <div v-if="isAdmin" class="flex gap-1">
            <button @click="openEditModal(teacher)" class="text-blue-600 hover:text-blue-800 p-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button @click="deleteTeacher(teacher.id)" class="text-red-600 hover:text-red-800 p-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-1 mb-3">
          <Badge v-for="sub in teacher.subjects" :key="sub" variant="secondary" size="sm">
            {{ sub }}
          </Badge>
        </div>
        <div class="space-y-2 text-sm text-gray-600 border-t pt-3 flex-1">
          <p><span class="font-medium">NIP:</span> {{ teacher.nip }}</p>
          <p><span class="font-medium">Email:</span> {{ teacher.email }}</p>
          <p><span class="font-medium">Telp:</span> {{ teacher.phone }}</p>
        </div>
        <div class="mt-4">
          <p class="text-xs font-semibold text-gray-700 mb-2">Mengajar di Kelas:</p>
          <div class="flex flex-wrap gap-1.5">
            <Badge
              v-for="kelas in teacher.classes"
              :key="kelas"
              variant="info"
            >
              {{ kelas }}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Modal
      :is-open="showModal"
      :title="editingTeacher ? 'Edit Data Guru' : 'Tambah Guru Baru'"
      confirm-text="Simpan"
      @close="closeModal"
      @confirm="saveTeacher"
    >
      <div class="space-y-4">
        <Input
          v-model="formData.name"
          label="Nama Lengkap"
          placeholder="Masukkan nama guru"
          required
        />
        <Input
          v-model="formData.nip"
          label="NIP"
          placeholder="Masukkan NIP"
          required
        />
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran (pisahkan dengan koma)</label>
          <Input
            v-model="subjectsInput"
            placeholder="Contoh: Matematika, Fisika"
          />
        </div>
        <Input
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="guru@example.com"
          required
        />
        <Input
          v-model="formData.phone"
          label="No. Telepon"
          placeholder="Masukkan nomor telepon"
        />
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kelas yang Diajar (pisahkan dengan koma)</label>
          <Input
            v-model="classesInput"
            placeholder="Contoh: XII-A, XI-B"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import type { Teacher } from '../../types'
import teachersData from '../../data/teachers.json'
import Badge from '../../components/ui/Badge.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import Input from '../../components/ui/Input.vue'

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')

const teachers = ref<Teacher[]>(teachersData.teachers)

const showModal = ref(false)
const editingTeacher = ref<Teacher | null>(null)
const classesInput = ref('')
const subjectsInput = ref('')
const formData = reactive({
  name: '',
  nip: '',
  email: '',
  phone: ''
})

const openAddModal = () => {
  editingTeacher.value = null
  formData.name = ''
  formData.nip = ''
  formData.email = ''
  formData.phone = ''
  classesInput.value = ''
  subjectsInput.value = ''
  showModal.value = true
}

const openEditModal = (teacher: Teacher) => {
  editingTeacher.value = teacher
  formData.name = teacher.name
  formData.nip = teacher.nip
  formData.email = teacher.email
  formData.phone = teacher.phone || ''
  classesInput.value = teacher.classes.join(', ')
  subjectsInput.value = teacher.subjects.join(', ')
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveTeacher = () => {
  const teacherClasses = classesInput.value.split(',').map(c => c.trim()).filter(c => c !== '')
  const teacherSubjects = subjectsInput.value.split(',').map(s => s.trim()).filter(s => s !== '')
  
  if (editingTeacher.value) {
    const index = teachers.value.findIndex(t => t.id === editingTeacher.value?.id)
    if (index !== -1) {
      teachers.value[index] = {
        ...editingTeacher.value,
        ...formData,
        classes: teacherClasses,
        subjects: teacherSubjects
      }
    }
  } else {
    teachers.value.push({
      id: Date.now().toString(),
      ...formData,
      classes: teacherClasses,
      subjects: teacherSubjects
    } as Teacher)
  }
  closeModal()
  saveTeachersToFile()
}

const saveTeachersToFile = async () => {
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: 'teachers',
        data: { teachers: teachers.value }
      })
    })
  } catch (error) {
    console.error('Failed to save teachers:', error)
    alert('Gagal menyimpan ke file JSON')
  }
}

const deleteTeacher = (id: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
    teachers.value = teachers.value.filter(t => t.id !== id)
    saveTeachersToFile()
  }
}
</script>


