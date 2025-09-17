import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, type User } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      if (!supabase) {
        throw new Error('Database connection not configured. Please check that Supabase environment variables are set correctly with the anon key (not service_role key).')
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('Profile not found:', profileError)
          throw new Error('User profile not found. Please try logging in again.')
        } else {
          user.value = profile
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
        throw new Error('Database connection not configured. Please check that Supabase environment variables are set correctly with the anon key (not service_role key).')
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
        // Profile will be created automatically by the database trigger
        // Wait a moment and then fetch the profile
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('Profile creation failed:', profileError)
          throw new Error('Account created but profile setup failed. Please try logging in.')
        }

        user.value = profile
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
      return
    }

    const { data: { user: authUser } } = await supabase.auth.getUser()
    
    if (authUser) {
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profile) {
        user.value = profile
      } else if (profileError) {
        console.error('Profile not found for existing user:', profileError)
        // Don't auto-create, trigger should have handled this
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
    isAdmin,
    login,
    register,
    logout,
    initAuth
  }
})