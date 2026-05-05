import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { Announcement } from '../types'
import studentsData from '../data/students.json'
import teachersData from '../data/teachers.json'
import announcementsData from '../data/announcements.json'
import attendancesData from '../data/attendances.json'

export const useDashboardStore = defineStore('dashboard', () => {
  const studentsCount = computed(() => studentsData.students.length)
  const teachersCount = computed(() => teachersData.teachers.length)

  const attendanceTodayStats = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayAttendances = attendancesData.attendances.filter(
      a => a.date === today
    )

    return {
      total: todayAttendances.length,
      present: todayAttendances.filter(a => a.status === 'hadir').length,
      absent: todayAttendances.filter(a => a.status === 'alfa').length,
      permission: todayAttendances.filter(a => a.status === 'izin').length
    }
  })

  const latestAnnouncements = computed(() => {
    return announcementsData.announcements
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5) as Announcement[]
  })

  return {
    studentsCount,
    teachersCount,
    attendanceTodayStats,
    latestAnnouncements
  }
})
