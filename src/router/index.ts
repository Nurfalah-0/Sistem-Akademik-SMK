import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginPage from '../features/auth/LoginPage.vue'
import DashboardPage from '../features/dashboard/DashboardPage.vue'
import StudentsPage from '../features/students/StudentsPage.vue'
import TeachersPage from '../features/teachers/TeachersPage.vue'
import SchedulePage from '../features/schedule/SchedulePage.vue'
import AttendancePage from '../features/attendance/AttendancePage.vue'
import GradesPage from '../features/grades/GradesPage.vue'
import AnnouncementsPage from '../features/announcements/AnnouncementsPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false, layout: 'auth' }
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/students',
    component: StudentsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/teachers',
    component: TeachersPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    component: SchedulePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/attendance',
    component: AttendancePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/grades',
    component: GradesPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/announcements',
    component: AnnouncementsPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    authStore.initAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
