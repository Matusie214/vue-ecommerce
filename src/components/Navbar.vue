<template>
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>