<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Image -->
      <div class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-8xl">
        {{ getProductEmoji(product.id) }}
      </div>
      
      <!-- Product Info -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
        <p class="text-2xl font-bold text-blue-600 mb-6">${{ product.price }}</p>
        <p class="text-gray-600 mb-8">{{ product.description }}</p>
        
        <button 
          @click="addToCart(product)"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
    
    <div v-else class="text-center py-12">
      <h1 class="text-2xl text-gray-600">Product not found</h1>
      <RouterLink to="/products" class="text-blue-600 hover:underline">
        Back to Products
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const productEmojis: Record<number, string> = {
  1: '🎧', 2: '⌚', 3: '☕', 4: '🎒', 5: '📱', 6: '👟', 7: '💻', 8: '🕶️'
}

// Mock product data - in real app would come from API
const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 199, description: 'Premium noise-cancelling headphones with superior sound quality', category: 'electronics', image: '' },
  { id: 2, name: 'Smart Watch', price: 299, description: 'Advanced fitness tracking with notifications and health monitoring', category: 'electronics', image: '' }
]

const product = computed(() => {
  const id = parseInt(route.params.id as string)
  return products.find(p => p.id === id)
})

const getProductEmoji = (id: number) => productEmojis[id] || '📦'

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}
</script>