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
    meta: { requiresAuth: true, roles: ['admin', 'guru', 'siswa', 'orangtua'] }
  },
  {
    path: '/students',
    component: StudentsPage,
    meta: { requiresAuth: true, roles: ['admin', 'guru', 'orangtua'] }
  },
  {
    path: '/teachers',
    component: TeachersPage,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/schedule',
    component: SchedulePage,
    meta: { requiresAuth: true, roles: ['admin', 'guru', 'siswa', 'orangtua'] }
  },
  {
    path: '/attendance',
    component: AttendancePage,
    meta: { requiresAuth: true, roles: ['admin', 'guru', 'siswa', 'orangtua'] }
  },
  {
    path: '/grades',
    component: GradesPage,
    meta: { requiresAuth: true, roles: ['admin', 'guru', 'siswa', 'orangtua'] }
  },
  {
    path: '/announcements',
    component: AnnouncementsPage,
    meta: { requiresAuth: true, roles: ['admin', 'guru', 'siswa', 'orangtua'] }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    authStore.initAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard')
  } else if (to.meta.roles && !((to.meta.roles as string[]).includes(authStore.user?.role || ''))) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
