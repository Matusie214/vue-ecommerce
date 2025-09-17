<template>
  <!-- Demo Mode Banner -->
  <div class="bg-blue-600 text-white text-center py-2 text-sm">
    <span class="font-medium">🚀 Demo Mode</span> - 
    Login with demo@example.com / demo123 to explore features
  </div>
  
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="text-2xl font-bold text-blue-600">
            Vue Store
          </RouterLink>
        </div>
        
        <div class="hidden md:flex space-x-8">
          <RouterLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </RouterLink>
          <RouterLink to="/products" class="text-gray-700 hover:text-blue-600 transition-colors">
            Products
          </RouterLink>
        </div>
        
        <div class="flex items-center space-x-4">
          <RouterLink to="/cart" class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8.5M7 13h10m0 0v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
            </svg>
            <span v-if="cartStore.itemCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>
          
          <!-- User menu -->
          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-2">
            <RouterLink to="/admin" class="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Admin
            </RouterLink>
            <span class="text-2xl">👤</span>
            <span class="hidden md:block text-gray-700">{{ authStore.user?.full_name || authStore.user?.name }}</span>
            <button 
              @click="authStore.logout"
              class="text-gray-700 hover:text-blue-600 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
          
          <div v-else class="flex items-center space-x-2">
            <RouterLink to="/login" class="text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </RouterLink>
            <RouterLink to="/register" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
</script>