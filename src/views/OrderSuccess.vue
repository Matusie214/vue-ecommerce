<template>
  <div class="max-w-2xl mx-auto px-4 py-12 text-center">
    <div class="mb-8">
      <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Successful! 🎉</h1>
      <p class="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
      </p>
    </div>
    
    <div class="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Order Details</h2>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Order Number:</span>
          <span class="font-mono">#{{ orderNumber }}</span>
        </div>
        <div class="flex justify-between">
          <span>Order Date:</span>
          <span>{{ new Date().toLocaleDateString() }}</span>
        </div>
        <div class="flex justify-between">
          <span>Status:</span>
          <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Confirmed</span>
        </div>
      </div>
    </div>
    
    <div class="space-y-4">
      <RouterLink 
        to="/products"
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Continue Shopping
      </RouterLink>
      <div>
        <RouterLink 
          to="/"
          class="text-blue-600 hover:underline"
        >
          Back to Home
        </RouterLink>
      </div>
    </div>
    
    <div class="mt-8 p-4 bg-blue-50 rounded-lg">
      <p class="text-sm text-blue-800">
        <strong>Demo Notice:</strong> This was a demonstration purchase. No real transaction occurred.
        In a real application, you would receive an email confirmation and tracking information.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const orderNumber = ref('')

onMounted(() => {
  // Generate mock order number
  orderNumber.value = Math.random().toString(36).substr(2, 9).toUpperCase()
})
</script>