import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Student } from '../types'
import studentsData from '../data/students.json'

export const useStudentStore = defineStore('student', () => {
  const students = ref<Student[]>(studentsData.students)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const classFilter = ref<string>('')

  const filteredStudents = computed(() => {
    let filtered = students.value

    // Search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.nisn.includes(query) ||
          s.email.toLowerCase().includes(query)
      )
    }

    // Class filter
    if (classFilter.value) {
      filtered = filtered.filter(s => s.class === classFilter.value)
    }

    return filtered
  })

  const classes = computed(() => {
    const uniqueClasses = new Set(students.value.map(s => s.class))
    return Array.from(uniqueClasses).sort()
  })

  const getStudentById = (id: string): Student | undefined => {
    return students.value.find(s => s.id === id)
  }

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: `std-${Date.now()}`
    }
    students.value.push(newStudent)
    return newStudent
  }

  const updateStudent = (id: string, updates: Partial<Student>): boolean => {
    const index = students.value.findIndex(s => s.id === id)
    if (index !== -1) {
      students.value[index] = { ...students.value[index], ...updates }
      return true
    }
    return false
  }

  const deleteStudent = (id: string): boolean => {
    const index = students.value.findIndex(s => s.id === id)
    if (index !== -1) {
      students.value.splice(index, 1)
      return true
    }
    return false
  }

  const setSearch = (query: string) => {
    searchQuery.value = query
  }

  const setClassFilter = (classValue: string) => {
    classFilter.value = classValue
  }

  return {
    students,
    loading,
    error,
    searchQuery,
    classFilter,
    filteredStudents,
    classes,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    setSearch,
    setClassFilter
  }
})
