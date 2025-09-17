<template>
  <div class="max-w-md mx-auto px-4 py-12">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-8">Login to Vue Store</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="demo@example.com"
          />
        </div>
        
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="demo123"
          />
        </div>
        
        <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ error }}
        </div>
        
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <span v-if="authStore.loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Don't have an account? 
          <RouterLink to="/register" class="text-blue-600 hover:underline">
            Sign up
          </RouterLink>
        </p>
      </div>
      
      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center mb-2">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm font-medium text-blue-800">Demo Mode Active</span>
        </div>
        <p class="text-sm text-blue-700">
          <strong>Demo credentials:</strong><br>
          Email: demo@example.com<br>
          Password: demo123
        </p>
        <p class="text-xs text-blue-600 mt-2">
          No real data is stored. All changes are temporary.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  const result = await authStore.login(form.value.email, form.value.password)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error || 'Login failed'
  }
}
</script>