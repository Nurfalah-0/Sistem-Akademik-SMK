import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserRole } from '../types'
import users from '../data/users.json'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Initialize auth from localStorage
  const initAuth = () => {
    const stored = localStorage.getItem('currentUser')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
        isAuthenticated.value = true
      } catch (e) {
        localStorage.removeItem('currentUser')
      }
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500))

      const foundUser = users.users.find(
        u => u.email === email && u.password === password
      )

      if (!foundUser) {
        error.value = 'Email atau password salah'
        return false
      }

      user.value = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role as UserRole,
        avatar: foundUser.avatar
      }

      isAuthenticated.value = true
      localStorage.setItem('currentUser', JSON.stringify(user.value))

      return true
    } catch (err) {
      error.value = 'Terjadi kesalahan saat login'
      console.error('Login error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('currentUser')
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user.value) return false
    if (Array.isArray(role)) {
      return role.includes(user.value.role)
    }
    return user.value.role === role
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    initAuth,
    login,
    logout,
    hasRole
  }
})
