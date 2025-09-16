<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
      <p class="text-lg text-gray-600">Discover our amazing collection</p>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-square bg-gray-200 flex items-center justify-center">
          <span class="text-4xl">{{ product.emoji }}</span>
        </div>
        
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
            <button 
              @click="addToCart(product)"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/stores/cart'

const cartStore = useCartStore()

const products = ref<(Product & { emoji: string })[]>([
  { id: 1, name: 'Wireless Headphones', price: 199, emoji: '🎧', description: 'Premium noise-cancelling headphones', category: 'electronics', image: '' },
  { id: 2, name: 'Smart Watch', price: 299, emoji: '⌚', description: 'Fitness tracking and notifications', category: 'electronics', image: '' },
  { id: 3, name: 'Coffee Maker', price: 149, emoji: '☕', description: 'Automatic drip coffee maker', category: 'home', image: '' },
  { id: 4, name: 'Backpack', price: 79, emoji: '🎒', description: 'Durable travel backpack', category: 'accessories', image: '' },
  { id: 5, name: 'Smartphone', price: 699, emoji: '📱', description: 'Latest flagship smartphone', category: 'electronics', image: '' },
  { id: 6, name: 'Sneakers', price: 129, emoji: '👟', description: 'Comfortable running shoes', category: 'fashion', image: '' },
  { id: 7, name: 'Laptop', price: 999, emoji: '💻', description: 'High-performance laptop', category: 'electronics', image: '' },
  { id: 8, name: 'Sunglasses', price: 89, emoji: '🕶️', description: 'UV protection sunglasses', category: 'accessories', image: '' }
])

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}
</script>