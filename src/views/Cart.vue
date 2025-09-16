<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-xl text-gray-600 mb-4">Your cart is empty</h2>
      <RouterLink 
        to="/products"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else>
      <!-- Cart Items -->
      <div class="space-y-4 mb-8">
        <div 
          v-for="item in cartStore.items" 
          :key="item.product.id"
          class="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
              {{ getProductEmoji(item.product.id) }}
            </div>
            <div>
              <h3 class="font-semibold">{{ item.product.name }}</h3>
              <p class="text-gray-600">${{ item.product.price }} each</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button 
                @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <button 
                @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
            
            <div class="text-right">
              <div class="font-semibold">${{ (item.product.price * item.quantity).toFixed(2) }}</div>
              <button 
                @click="cartStore.removeFromCart(item.product.id)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Total -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <div class="flex justify-between items-center text-xl font-bold mb-4">
          <span>Total: ${{ cartStore.total.toFixed(2) }}</span>
        </div>
        
        <div class="flex space-x-4">
          <RouterLink 
            to="/checkout"
            class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
          >
            Proceed to Checkout
          </RouterLink>
          <button 
            @click="cartStore.clearCart"
            class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const productEmojis: Record<number, string> = {
  1: '🎧', 2: '⌚', 3: '☕', 4: '🎒', 5: '📱', 6: '👟', 7: '💻', 8: '🕶️'
}

const getProductEmoji = (id: number) => productEmojis[id] || '📦'
</script>