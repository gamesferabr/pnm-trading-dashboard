import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DEMO_USERS } from '@/data/mockData'

const AUTH_KEY = 'pnm_crm_auth'

interface AuthUser {
  email: string
  name: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  function restoreSession(): void {
    const stored = localStorage.getItem(AUTH_KEY)
    if (!stored) return
    try {
      user.value = JSON.parse(stored) as AuthUser
    } catch {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null

    await new Promise((resolve) => setTimeout(resolve, 800))

    const match = DEMO_USERS.find(
      (demo) => demo.email === email.trim().toLowerCase() && demo.password === password,
    )

    loading.value = false

    if (!match) {
      error.value = 'E-mail ou senha incorretos.'
      return false
    }

    user.value = { email: match.email, name: match.name, role: match.role }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user.value))
    return true
  }

  function logout(): void {
    user.value = null
    localStorage.removeItem(AUTH_KEY)
  }

  restoreSession()

  return { user, loading, error, isAuthenticated, login, logout }
})
