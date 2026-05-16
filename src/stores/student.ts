import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Student } from '../types'
import studentsData from '../data/students.json'

export const useStudentStore = defineStore('student', () => {
  const students = ref<Student[]>(studentsData.students as Student[])
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
          s.niup.includes(query)
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

  const levels = computed(() => {
    if (!students.value) return []
    const uniqueLevels = new Set(
      students.value
        .filter(s => s && s.class)
        .map(s => s.class.split(' ')[0])
    )
    return Array.from(uniqueLevels).filter(Boolean).sort()
  })

  const majors = computed(() => {
    if (!students.value) return []
    const uniqueMajors = new Set(
      students.value
        .filter(s => s && s.class)
        .map(s => s.class.split(' ').slice(1).join(' '))
    )
    return Array.from(uniqueMajors).filter(Boolean).sort()
  })

  const getStudentById = (id: string): Student | undefined => {
    return students.value.find(s => s.id === id)
  }

  const saveStudentsToFile = async () => {
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'students',
          data: { students: students.value }
        })
      })
    } catch (err) {
      console.error('Failed to save students:', err)
    }
  }

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: `std-${Date.now()}`
    }
    students.value.push(newStudent)
    saveStudentsToFile()
    return newStudent
  }

  const updateStudent = (id: string, updates: Partial<Student>): boolean => {
    const index = students.value.findIndex(s => s.id === id)
    if (index !== -1) {
      students.value[index] = { ...students.value[index], ...updates }
      saveStudentsToFile()
      return true
    }
    return false
  }

  const deleteStudent = (id: string): boolean => {
    const index = students.value.findIndex(s => s.id === id)
    if (index !== -1) {
      students.value.splice(index, 1)
      saveStudentsToFile()
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

  const bulkAddStudents = (newStudents: Omit<Student, 'id'>[]) => {
    const studentsWithIds = newStudents.map(s => ({
      ...s,
      id: `std-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }))
    students.value.push(...studentsWithIds)
    saveStudentsToFile()
    return studentsWithIds
  }

  return {
    students,
    loading,
    error,
    searchQuery,
    classFilter,
    filteredStudents,
    classes,
    levels,
    majors,
    getStudentById,
    addStudent,
    bulkAddStudents,
    updateStudent,
    deleteStudent,
    setSearch,
    setClassFilter
  }
})
