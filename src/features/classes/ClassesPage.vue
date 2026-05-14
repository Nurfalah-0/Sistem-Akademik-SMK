<template>
  <div class="space-y-12 pb-20">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div>
        <h1 class="text-4xl font-black text-white tracking-tight">Manajemen Kelas</h1>
        <p class="text-slate-500 mt-2 flex items-center gap-2 font-medium">
          <span class="flex h-2 w-2 rounded-full bg-accent-cyan shadow-glow-cyan animate-pulse"></span>
          {{ classes.length }} Kelas terdaftar dalam ekosistem
        </p>
      </div>
      <Button variant="primary" @click="openAddModal" class="shadow-glow-violet bg-gradient-to-r from-accent-violet to-fuchsia-600 border-none px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Kelas
        </span>
      </Button>
    </div>

    <!-- Classes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div
        v-for="cls in classes"
        :key="cls.id"
        class="group relative"
      >
        <!-- Card Glow Effect -->
        <div class="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-[32px] opacity-0 group-hover:opacity-20 transition duration-700 blur"></div>
        
        <div class="relative glass-card h-full flex flex-col border-white/5 group-hover:border-white/20 transition-all duration-500 overflow-hidden">
          <!-- Card Header Decor -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[100px] pointer-events-none opacity-20"></div>

          <div class="p-8 space-y-6 flex-1">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-accent-cyan/30 transition-all duration-500">
              <svg class="w-8 h-8 text-slate-400 group-hover:neon-text-cyan transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            <div>
              <h3 class="text-3xl font-black text-white tracking-tighter group-hover:text-accent-cyan transition-colors">{{ cls.name }}</h3>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{{ cls.major }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Wali Kelas</p>
                <p class="text-xs font-bold text-slate-300 mt-2 truncate">{{ cls.teacher }}</p>
              </div>
              <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Kapasitas</p>
                <p class="text-xs font-bold text-slate-300 mt-2">{{ cls.capacity }} Siswa</p>
              </div>
            </div>
          </div>

          <!-- Card Footer Actions -->
          <div class="px-8 py-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
            <RouterLink to="/schedule" class="text-xs font-black text-accent-cyan uppercase tracking-widest hover:neon-text-cyan transition-all flex items-center gap-2">
              Lihat Jadwal
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4 4H3" />
              </svg>
            </RouterLink>
            <div class="flex gap-1">
              <button @click="openEditModal(cls)" class="p-2 text-slate-500 hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button @click="deleteClass(cls.id)" class="p-2 text-slate-500 hover:text-rose-500 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="classes.length === 0" class="glass-card py-32 text-center border-white/5">
       <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
          <svg class="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
       </div>
       <h3 class="text-2xl font-black text-white tracking-tight">Ekosistem Kelas Kosong</h3>
       <p class="text-slate-500 mt-2 font-medium">Belum ada data kelas yang diinisialisasi dalam sistem ini.</p>
    </div>

    <!-- Modal remains functional with UI updates -->
    <Modal
      :is-open="showModal"
      :title="editingClass ? 'Re-konfigurasi Kelas' : 'Inisialisasi Kelas Baru'"
      confirm-text="Terapkan Perubahan"
      @close="closeModal"
      @confirm="saveClass"
    >
      <div class="space-y-6">
        <Input
          v-model="formData.name"
          label="Identitas Kelas"
          placeholder="Contoh: XII RPL 1"
          required
        />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Program Keahlian</label>
            <select v-model="formData.major" class="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold outline-none focus:border-accent-cyan transition-all appearance-none">
              <option value="RPL">RPL</option>
              <option value="TKJ">TKJ</option>
              <option value="DKV">DKV</option>
              <option value="TPTL">TPTL</option>
            </select>
          </div>
          <Input
            v-model.number="formData.capacity"
            type="number"
            label="Kapasitas Maksimal"
            placeholder="36"
            required
          />
        </div>
        <Input
          v-model="formData.teacher"
          label="Wali Kelas"
          placeholder="Nama lengkap beserta gelar"
          required
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Class } from '../../types'
import classesData from '../../data/classes.json'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import Input from '../../components/ui/Input.vue'

const classes = ref<Class[]>(classesData.classes)
const showModal = ref(false)
const editingClass = ref<Class | null>(null)
const formData = reactive({
  name: '',
  major: 'RPL',
  teacher: '',
  capacity: 36
})

const openAddModal = () => {
  editingClass.value = null
  formData.name = ''
  formData.major = 'RPL'
  formData.teacher = ''
  formData.capacity = 36
  showModal.value = true
}

const openEditModal = (cls: Class) => {
  editingClass.value = cls
  Object.assign(formData, cls)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveClass = () => {
  if (editingClass.value) {
    const index = classes.value.findIndex(c => c.id === editingClass.value?.id)
    if (index !== -1) {
      classes.value[index] = { ...editingClass.value, ...formData }
    }
  } else {
    classes.value.push({
      id: `class-${Date.now()}`,
      ...formData
    })
  }
  closeModal()
  saveClassesToFile()
}

const saveClassesToFile = async () => {
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: 'classes',
        data: { classes: classes.value }
      })
    })
  } catch (error) {
    console.error('Failed to save classes:', error)
  }
}

const deleteClass = (id: string) => {
  if (confirm('Hapus data kelas ini?')) {
    classes.value = classes.value.filter(c => c.id !== id)
    saveClassesToFile()
  }
}
</script>

