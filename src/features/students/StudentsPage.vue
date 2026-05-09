<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center flex-col md:flex-row gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Daftar Siswa</h1>
        <p class="text-gray-600 mt-1">Total: {{ studentStore.filteredStudents.length }} siswa</p>
      </div>
      <Button variant="primary" @click="openAddModal">
        Tambah Siswa
      </Button>
    </div>

    <!-- Filters -->
    <Card>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          :model-value="studentStore.searchQuery"
          type="text"
          label="Cari Siswa"
          placeholder="Nama, NISN, atau Email"
          @update:model-value="(val) => studentStore.setSearch(String(val))"
        />
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Filter Kelas
          </label>
          <select
            :value="studentStore.classFilter"
            @change="studentStore.setClassFilter(($event.target as HTMLSelectElement).value as any)"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
          >
            <option value="">Semua Kelas</option>
            <option v-for="kelas in studentStore.classes" :key="kelas" :value="kelas">
              {{ kelas }}
            </option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Empty State -->
    <div v-if="studentStore.filteredStudents.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada siswa yang ditemukan</p>
    </div>

    <!-- Students Table -->
    <Card v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">NISN</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Kelas</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Telepon</th>
            <th class="px-6 py-3 text-center text-xs font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr
            v-for="student in studentStore.filteredStudents"
            :key="student.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-gray-900 font-medium">{{ student.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ student.nisn }}</td>
            <td class="px-6 py-4">
              <Badge variant="info">{{ student.class }}</Badge>
            </td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ student.email }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ student.phone || '-' }}</td>
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  @click="editStudent(student)"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  @click="deleteStudent(student.id)"
                >
                  Hapus
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <!-- Add/Edit Modal -->
    <Modal
      :is-open="showModal"
      :title="editingStudent ? 'Edit Siswa' : 'Tambah Siswa Baru'"
      confirm-text="Simpan"
      @close="closeModal"
      @confirm="saveStudent"
    >
      <div class="space-y-4">
        <Input
          v-model="formData.name"
          label="Nama Lengkap"
          placeholder="Masukkan nama siswa"
          :error="formErrors.name"
          required
        />

        <Input
          v-model="formData.nisn"
          label="NISN"
          placeholder="Nomor Identitas Siswa Nasional"
          :error="formErrors.nisn"
          required
        />

        <Input
          v-model="formData.class"
          label="Kelas"
          placeholder="XII-A"
          :error="formErrors.class"
          required
        />

        <Input
          v-model="formData.email"
          type="email"
          label="Email"
          placeholder="siswa@example.com"
          :error="formErrors.email"
          required
        />

        <Input
          v-model="formData.phone"
          label="Telepon"
          placeholder="082xxx"
          :error="formErrors.phone"
        />

        <Input
          v-model="formData.address"
          label="Alamat"
          placeholder="Masukkan alamat"
          :error="formErrors.address"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStudentStore } from '../../stores/student'
import { useFormValidation } from '../../composables/useFormValidation'
import type { Student } from '../../types'
import Card from '../../components/ui/Card.vue'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import Badge from '../../components/ui/Badge.vue'
import Modal from '../../components/ui/Modal.vue'

const studentStore = useStudentStore()
const showModal = ref(false)
const editingStudent = ref<Student | null>(null)

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
  if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
    studentStore.deleteStudent(id)
  }
}

const closeModal = () => {
  showModal.value = false
  clearForm()
}
</script>
