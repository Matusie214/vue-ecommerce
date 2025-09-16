import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, type User } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  // Mock users for demo when Supabase is not configured
  const mockUsers = [
    { id: '1', email: 'demo@example.com', full_name: 'Demo User', created_at: new Date().toISOString() },
    { id: '2', email: 'john@example.com', full_name: 'John Doe', created_at: new Date().toISOString() },
  ]

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      if (!supabase) {
        // Mock authentication
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockUser = mockUsers.find(u => u.email === email)
        
        if (mockUser && password === 'demo123') {
          user.value = mockUser
          localStorage.setItem('user', JSON.stringify(mockUser))
          return { success: true }
        } else {
          throw new Error('Invalid credentials')
        }
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      if (data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        user.value = profile || {
          id: data.user.id,
          email: data.user.email!,
          full_name: data.user.user_metadata?.full_name || 'User',
          created_at: data.user.created_at!
        }
      }

      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    loading.value = true
    error.value = null

    try {
      if (!supabase) {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 1000))
        const existingUser = mockUsers.find(u => u.email === email)
        
        if (existingUser) {
          throw new Error('User already exists')
        }
        
        const newUser: User = {
          id: (mockUsers.length + 1).toString(),
          email: email,
          full_name: fullName,
          created_at: new Date().toISOString()
        }
        
        mockUsers.push(newUser)
        user.value = newUser
        localStorage.setItem('user', JSON.stringify(newUser))
        return { success: true }
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (authError) throw authError

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              full_name: fullName
            }
          ])

        if (profileError) throw profileError

        user.value = {
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          created_at: data.user.created_at!
        }
      }

      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut()
      }
      user.value = null
      localStorage.removeItem('user')
    } catch (err: any) {
      error.value = err.message
    }
  }

  const initAuth = async () => {
    if (!supabase) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
      return
    }

    const { data: { user: authUser } } = await supabase.auth.getUser()
    
    if (authUser) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      user.value = profile || {
        id: authUser.id,
        email: authUser.email!,
        full_name: authUser.user_metadata?.full_name || 'User',
        created_at: authUser.created_at!
      }
    }
  }

  // Initialize on store creation
  initAuth()

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth
  }
})