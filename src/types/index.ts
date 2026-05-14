export type UserRole = 'admin' | 'guru' | 'siswa' | 'orang_tua'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Student {
  id: string
  name: string
  nisn: string
  class: string
  email: string
  phone?: string
  birthDate?: string
  address?: string
  parentName?: string
  parentPhone?: string
}

export interface Teacher {
  id: string
  name: string
  nip: string
  email: string
  phone?: string
  subjects: string[]
  classes: string[]
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  category: 'info' | 'warning' | 'urgent'
}

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  date: string
  status: 'hadir' | 'izin' | 'alfa'
}

export interface Grade {
  id: string
  studentId: string
  studentName: string
  subject: string
  score: number
  date: string
}

export interface Schedule {
  id: string
  class: string
  time: string
  subject: string
  teacher: string
  room: string
}

export interface Class {
  id: string
  name: string
  major?: string
}
