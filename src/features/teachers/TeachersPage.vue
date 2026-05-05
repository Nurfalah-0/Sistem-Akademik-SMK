<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Daftar Guru</h1>
      <p class="text-gray-600 mt-1">Total: {{ teachers.length }} guru</p>
    </div>

    <!-- Teachers Grid -->
    <div v-if="teachers.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada data guru</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card 
        v-for="teacher in teachers" 
        :key="teacher.id" 
        class="hover:shadow-lg transition"
      >
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 text-lg">{{ teacher.name }}</h3>
          <p class="text-sm text-gray-600">{{ teacher.subject }}</p>
          <p class="text-xs text-gray-500 mt-2">NIP: {{ teacher.nip }}</p>
          <p class="text-xs text-gray-500">Email: {{ teacher.email }}</p>
          <p class="text-xs text-gray-500">Telp: {{ teacher.phone }}</p>
          <div class="mt-3">
            <p class="text-xs font-medium text-gray-700 mb-1">Mengajar:</p>
            <div class="flex flex-wrap gap-1">
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
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Teacher } from '../../types'
import teachersData from '../../data/teachers.json'
import Card from '../../components/ui/Card.vue'
import Badge from '../../components/ui/Badge.vue'

const teachers = ref<Teacher[]>(teachersData.teachers)
</script>

