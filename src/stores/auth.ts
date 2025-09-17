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
        throw new Error('Database connection not configured. Please contact administrator.')
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
          // If profile doesn't exist, create one with default user role
          const newProfile = {
            id: data.user.id,
            email: data.user.email!,
            full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
            role: 'user' as const
          }

          const { error: insertError } = await supabase
            .from('users')
            .insert([newProfile])

          if (insertError) {
            console.error('Error creating profile:', insertError)
          }

          user.value = newProfile
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
        throw new Error('Database connection not configured. Please contact administrator.')
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
        const newProfile = {
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          role: 'user' as const
        }

        const { error: profileError } = await supabase
          .from('users')
          .insert([newProfile])

        if (profileError) throw profileError

        user.value = {
          ...newProfile,
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
        // Auto-create profile if missing
        const newProfile = {
          id: authUser.id,
          email: authUser.email!,
          full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
          role: 'user' as const
        }

        const { error: insertError } = await supabase
          .from('users')
          .insert([newProfile])

        if (!insertError) {
          user.value = {
            ...newProfile,
            created_at: authUser.created_at!
          }
        }
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