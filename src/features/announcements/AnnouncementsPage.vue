<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center flex-col md:flex-row gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Pengumuman</h1>
        <p class="text-gray-600 mt-1">Total: {{ filteredAnnouncements.length }} pengumuman</p>
      </div>
      <Button v-if="authStore.hasRole(['admin', 'guru'])" variant="primary" @click="openAddModal">
        Buat Pengumuman
      </Button>
    </div>

    <!-- Category Filter -->
    <Card>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = selectedCategory === cat ? '' : cat"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition',
            selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          ]"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>
    </Card>

    <!-- Empty State -->
    <div v-if="filteredAnnouncements.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada pengumuman</p>
    </div>

    <!-- Announcements List -->
    <div v-else class="space-y-4">
      <div
        v-for="announcement in filteredAnnouncements"
        :key="announcement.id"
        class="bg-white rounded-lg p-6 border-l-4 shadow-sm hover:shadow-md transition-all"
        :class="{
          'border-red-500': announcement.category === 'urgent',
          'border-yellow-500': announcement.category === 'warning',
          'border-blue-500': announcement.category === 'info'
        }"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h2 class="text-lg font-semibold text-gray-900">{{ announcement.title }}</h2>
              <Badge :variant="announcement.category">
                {{ announcement.category.toUpperCase() }}
              </Badge>
            </div>
            <p class="text-gray-700">{{ announcement.content }}</p>
          </div>
          <div v-if="authStore.hasRole(['admin', 'guru'])" class="flex gap-2 ml-4">
            <Button size="sm" variant="secondary" @click="editAnnouncement(announcement)">
              Edit
            </Button>
            <Button size="sm" variant="danger" @click="deleteAnnouncement(announcement.id)">
              Hapus
            </Button>
          </div>
        </div>

        <div class="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span>{{ announcement.author }}</span>
          <span>{{ formatDate(announcement.createdAt) }}</span>
          <span>{{ formatTime(announcement.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Modal
      :is-open="showModal"
      :title="editingAnnouncement ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'"
      confirm-text="Publish"
      @close="closeModal"
      @confirm="saveAnnouncement"
    >
      <div class="space-y-4">
        <Input
          v-model="formData.title"
          label="Judul Pengumuman"
          placeholder="Masukkan judul pengumuman"
          :error="formErrors.title"
          required
        />

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Isi Pengumuman
            <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="formData.content"
            placeholder="Masukkan isi pengumuman"
            rows="5"
            :class="[
              'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              formErrors.content ? 'border-red-500' : 'border-gray-300'
            ]"
          />
          <p v-if="formErrors.content" class="mt-1 text-sm text-red-500">
            {{ formErrors.content }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            v-model="formData.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="info">Info</option>
            <option value="warning">Peringatan</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useFormValidation } from '../../composables/useFormValidation'
import type { Announcement } from '../../types'
import announcementsData from '../../data/announcements.json'
import Card from '../../components/ui/Card.vue'
import Badge from '../../components/ui/Badge.vue'
import Button from '../../components/ui/Button.vue'
import Input from '../../components/ui/Input.vue'
import Modal from '../../components/ui/Modal.vue'

const authStore = useAuthStore()
const announcements = ref<Announcement[]>(announcementsData.announcements)
const showModal = ref(false)
const editingAnnouncement = ref<Announcement | null>(null)
const selectedCategory = ref('')
const categories = ['info', 'warning', 'urgent']

const formData = reactive({
  title: '',
  content: '',
  category: 'info' as 'info' | 'warning' | 'urgent'
})

const { errors: formErrors, validateForm, clearErrors } = useFormValidation({
  title: { required: true },
  content: { required: true }
})

const filteredAnnouncements = computed(() => {
  let filtered = announcements.value

  if (selectedCategory.value) {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

const getCategoryLabel = (cat: string) => {
  const labels: Record<string, string> = {
    info: 'Info',
    warning: 'Peringatan',
    urgent: 'Urgent'
  }
  return labels[cat] || cat
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openAddModal = () => {
  editingAnnouncement.value = null
  clearForm()
  showModal.value = true
}

const clearForm = () => {
  clearErrors()
  formData.title = ''
  formData.content = ''
  formData.category = 'info'
}

const editAnnouncement = (announcement: Announcement) => {
  editingAnnouncement.value = announcement
  formData.title = announcement.title
  formData.content = announcement.content
  formData.category = announcement.category
  showModal.value = true
}

const saveAnnouncement = () => {
  if (!validateForm(formData)) {
    return
  }

  if (editingAnnouncement.value) {
    Object.assign(editingAnnouncement.value, formData)
  } else {
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      ...formData,
      author: authStore.user?.name || 'Unknown',
      createdAt: new Date().toISOString()
    }
    announcements.value.unshift(newAnnouncement)
  }

  closeModal()
}

const deleteAnnouncement = (id: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
    const index = announcements.value.findIndex(a => a.id === id)
    if (index !== -1) {
      announcements.value.splice(index, 1)
    }
  }
}

const closeModal = () => {
  showModal.value = false
  clearForm()
}
</script>
