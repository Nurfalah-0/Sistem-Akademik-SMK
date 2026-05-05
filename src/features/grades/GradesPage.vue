<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Nilai Siswa</h1>
      <p class="text-gray-600">Input dan lihat nilai siswa</p>
    </div>

    <!-- Filters -->
    <Card>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
          <select
            v-model="selectedClass"
            @change="filterGrades"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kelas</option>
            <option value="XII-A">XII-A</option>
            <option value="XI-B">XI-B</option>
            <option value="X-C">X-C</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
          <select
            v-model="selectedSubject"
            @change="filterGrades"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Mapel</option>
            <option value="Matematika">Matematika</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="Teknologi Informasi">Teknologi Informasi</option>
            <option value="Fisika">Fisika</option>
            <option value="Kimia">Kimia</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Grades Table -->
    <Card>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nama Siswa</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Kelas</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700">Mapel</th>
              <th class="px-6 py-3 text-center text-xs font-semibold text-gray-700">Nilai</th>
              <th class="px-6 py-3 text-center text-xs font-semibold text-gray-700">Grade</th>
              <th class="px-6 py-3 text-center text-xs font-semibold text-gray-700">Tanggal</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="grade in filteredGrades" :key="grade.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900">{{ grade.studentName }}</td>
              <td class="px-6 py-4 text-gray-600">
                <Badge variant="info">{{ getStudentClass(grade.studentId) }}</Badge>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ grade.subject }}</td>
              <td class="px-6 py-4 text-center">
                <span class="inline-block px-3 py-1 rounded-lg font-semibold" :class="getScoreClass(grade.score)">
                  {{ grade.score }}
                </span>
              </td>
              <td class="px-6 py-4 text-center font-medium">
                <Badge :variant="getGradeColor(grade.score)">
                  {{ getGrade(grade.score) }}
                </Badge>
              </td>
              <td class="px-6 py-4 text-center text-gray-600 text-sm">
                {{ new Date(grade.date).toLocaleDateString('id-ID') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Grade Distribution Chart -->
    <Card>
      <h2 class="text-xl font-semibold text-gray-900 mb-4">📊 Distribusi Nilai</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="text-center">
          <p class="text-3xl font-bold text-green-600">{{ gradeDistribution.A }}</p>
          <p class="text-sm text-gray-600 mt-1">A (90-100)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-blue-600">{{ gradeDistribution.B }}</p>
          <p class="text-sm text-gray-600 mt-1">B (80-89)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-yellow-600">{{ gradeDistribution.C }}</p>
          <p class="text-sm text-gray-600 mt-1">C (70-79)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-orange-600">{{ gradeDistribution.D }}</p>
          <p class="text-sm text-gray-600 mt-1">D (60-69)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-red-600">{{ gradeDistribution.E }}</p>
          <p class="text-sm text-gray-600 mt-1">E (<60)</p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Grade } from '../../types'
import gradesData from '../../data/grades.json'
import studentsData from '../../data/students.json'
import Card from '../../components/ui/Card.vue'
import Badge from '../../components/ui/Badge.vue'

const grades = ref<Grade[]>(gradesData.grades)
const selectedClass = ref('')
const selectedSubject = ref('')
const filteredGrades = ref<Grade[]>(gradesData.grades)

const getStudentClass = (studentId: string) => {
  const student = studentsData.students.find(s => s.id === studentId)
  return student?.class || '-'
}

const getGrade = (score: number): string => {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'E'
}

const getGradeColor = (score: number) => {
  if (score >= 90) return 'success'
  if (score >= 80) return 'info'
  if (score >= 70) return 'warning'
  if (score >= 60) return 'danger'
  return 'danger'
}

const getScoreClass = (score: number) => {
  if (score >= 90) return 'bg-green-100 text-green-800'
  if (score >= 80) return 'bg-blue-100 text-blue-800'
  if (score >= 70) return 'bg-yellow-100 text-yellow-800'
  if (score >= 60) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

const gradeDistribution = computed(() => {
  const allGrades = filteredGrades.value
  return {
    A: allGrades.filter(g => g.score >= 90).length,
    B: allGrades.filter(g => g.score >= 80 && g.score < 90).length,
    C: allGrades.filter(g => g.score >= 70 && g.score < 80).length,
    D: allGrades.filter(g => g.score >= 60 && g.score < 70).length,
    E: allGrades.filter(g => g.score < 60).length
  }
})

const filterGrades = () => {
  filteredGrades.value = grades.value.filter(grade => {
    const studentClass = getStudentClass(grade.studentId)
    const matchClass = !selectedClass.value || studentClass === selectedClass.value
    const matchSubject = !selectedSubject.value || grade.subject === selectedSubject.value
    return matchClass && matchSubject
  })
}
</script>
