<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Jadwal Pelajaran</h1>
        <p class="text-gray-600 mt-1">Jadwal mengajar untuk semua kelas</p>
      </div>
      <Button v-if="isAdmin" variant="primary" @click="openAddModal">
        Tambah Jadwal
      </Button>
    </div>

    <!-- Schedule by Classes -->
    <div class="space-y-6">
      <Card v-for="className in classes" :key="className">
        <h2 class="text-lg font-semibold text-gray-900 mb-5">Jadwal Kelas {{ className }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Jam</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Mata Pelajaran</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Guru</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Ruangan</th>
                <th v-if="isAdmin" class="px-4 py-3 text-center font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="slot in getSchedulesByClass(className)" :key="slot.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ slot.time }}</td>
                <td class="px-4 py-3">{{ slot.subject }}</td>
                <td class="px-4 py-3">{{ slot.teacher }}</td>
                <td class="px-4 py-3">{{ slot.room }}</td>
                <td v-if="isAdmin" class="px-4 py-3 text-center">
                  <div class="flex justify-center gap-2">
                    <Button size="sm" variant="secondary" @click="openEditModal(slot)">
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" @click="deleteSchedule(slot.id)">
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="getSchedulesByClass(className).length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                  Belum ada jadwal untuk kelas ini
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    <!-- Add/Edit Modal -->
    <Modal
      :is-open="showModal"
      :title="editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'"
      confirm-text="Simpan"
      @close="closeModal"
      @confirm="saveSchedule"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
          <select
            v-model="formData.class"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <Input
          v-model="formData.time"
          label="Jam Pelajaran"
          placeholder="Contoh: 07:00 - 08:30"
          required
        />

        <Input
          v-model="formData.subject"
          label="Mata Pelajaran"
          placeholder="Masukkan nama mata pelajaran"
          required
        />

        <Input
          v-model="formData.teacher"
          label="Guru Pengajar"
          placeholder="Masukkan nama guru"
          required
        />

        <Input
          v-model="formData.room"
          label="Ruangan"
          placeholder="Contoh: A-101 atau Lab IT"
          required
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import Card from '../../components/ui/Card.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import Input from '../../components/ui/Input.vue'

interface ScheduleSlot {
  id: string
  time: string
  subject: string
  teacher: string
  room: string
  class: string
}

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')

const schedules = ref<ScheduleSlot[]>([
  { id: '1', class: 'XII-A', time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Budi Santoso', room: 'A-101' },
  { id: '2', class: 'XII-A', time: '08:30 - 10:00', subject: 'Bahasa Indonesia', teacher: 'Siti Rahayu', room: 'A-101' },
  { id: '3', class: 'XII-A', time: '10:15 - 11:45', subject: 'Teknologi Informasi', teacher: 'Adi Wijaya', room: 'Lab IT' },
  { id: '4', class: 'XII-A', time: '12:30 - 14:00', subject: 'Fisika', teacher: 'Dina Kusumawardhani', room: 'A-102' },
  { id: '5', class: 'XI-B', time: '07:00 - 08:30', subject: 'Bahasa Inggris', teacher: 'Budi Santoso', room: 'B-201' },
  { id: '6', class: 'XI-B', time: '08:30 - 10:00', subject: 'Matematika', teacher: 'Siti Rahayu', room: 'B-201' },
  { id: '7', class: 'XI-B', time: '10:15 - 11:45', subject: 'Fisika', teacher: 'Adi Wijaya', room: 'Lab' },
  { id: '8', class: 'XI-B', time: '12:30 - 14:00', subject: 'Kimia', teacher: 'Dina Kusumawardhani', room: 'B-202' },
  { id: '9', class: 'X-C', time: '07:00 - 08:30', subject: 'Teknologi Informasi', teacher: 'Adi Wijaya', room: 'Lab IT' },
  { id: '10', class: 'X-C', time: '08:30 - 10:00', subject: 'Matematika', teacher: 'Budi Santoso', room: 'C-301' },
  { id: '11', class: 'X-C', time: '10:15 - 11:45', subject: 'Bahasa Indonesia', teacher: 'Siti Rahayu', room: 'C-301' },
  { id: '12', class: 'X-C', time: '12:30 - 14:00', subject: 'Penjas Orkes', teacher: 'Dina Kusumawardhani', room: 'Lapangan' }
])

const classes = ['XII-A', 'XI-B', 'X-C']

const getSchedulesByClass = (className: string) => {
  return schedules.value.filter(s => s.class === className)
}

const showModal = ref(false)
const editingSchedule = ref<ScheduleSlot | null>(null)
const formData = reactive({
  class: '',
  time: '',
  subject: '',
  teacher: '',
  room: ''
})

const openAddModal = () => {
  editingSchedule.value = null
  formData.class = 'XII-A'
  formData.time = ''
  formData.subject = ''
  formData.teacher = ''
  formData.room = ''
  showModal.value = true
}

const openEditModal = (slot: ScheduleSlot) => {
  editingSchedule.value = slot
  formData.class = slot.class
  formData.time = slot.time
  formData.subject = slot.subject
  formData.teacher = slot.teacher
  formData.room = slot.room
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveSchedule = () => {
  if (editingSchedule.value) {
    const index = schedules.value.findIndex(s => s.id === editingSchedule.value?.id)
    if (index !== -1) {
      schedules.value[index] = { ...editingSchedule.value, ...formData }
    }
  } else {
    schedules.value.push({
      id: Date.now().toString(),
      ...formData
    })
  }
  closeModal()
}

const deleteSchedule = (id: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
    schedules.value = schedules.value.filter(s => s.id !== id)
  }
}
</script>
