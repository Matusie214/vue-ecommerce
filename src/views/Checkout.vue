<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Order Summary -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <div class="bg-gray-50 p-6 rounded-lg space-y-4">
          <div v-for="item in cartStore.items" :key="item.product.id" class="flex justify-between">
            <span>{{ item.product.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </div>
          <hr>
          <div class="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Payment Form -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
        
        <form @submit.prevent="handlePayment" class="space-y-4">
          <!-- Billing Address -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                v-model="billingForm.firstName"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                v-model="billingForm.lastName"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="billingForm.email"
              type="email" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              v-model="billingForm.address"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <!-- Payment Method -->
          <div class="border-t pt-6 mt-6">
            <h3 class="text-lg font-medium mb-4">Payment Method</h3>
            
            <!-- Mock Stripe Elements -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  v-model="paymentForm.cardNumber"
                  type="text" 
                  placeholder="4242 4242 4242 4242"
                  maxlength="19"
                  @input="formatCardNumber"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    v-model="paymentForm.expiry"
                    type="text" 
                    placeholder="MM/YY"
                    maxlength="5"
                    @input="formatExpiry"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input 
                    v-model="paymentForm.cvc"
                    type="text" 
                    placeholder="123"
                    maxlength="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="error" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ error }}
          </div>
          
          <button
            type="submit"
            :disabled="isProcessing"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-semibold"
          >
            <span v-if="isProcessing">Processing Payment...</span>
            <span v-else>Complete Payment - ${{ cartStore.total.toFixed(2) }}</span>
          </button>
        </form>
        
        <!-- Demo Notice -->
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This is a demonstration checkout. No real payment will be processed.
            Use card number 4242 4242 4242 4242 for testing.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore } from '@/stores/orders'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const billingForm = ref({
  firstName: '',
  lastName: '',
  email: authStore.user?.email || '',
  address: ''
})

const paymentForm = ref({
  cardNumber: '',
  expiry: '',
  cvc: ''
})

const isProcessing = ref(false)
const error = ref('')

const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  paymentForm.value.cardNumber = formattedValue
}

const formatExpiry = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '')
  const formattedValue = value.replace(/(\d{2})(\d)/, '$1/$2')
  paymentForm.value.expiry = formattedValue
}

const handlePayment = async () => {
  if (cartStore.items.length === 0) {
    error.value = 'Your cart is empty'
    return
  }

  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  isProcessing.value = true
  error.value = ''

  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success (90% success rate for demo)
    if (Math.random() > 0.1) {
      // Create order in database
      const orderResult = await ordersStore.createOrder(cartStore.items, cartStore.total)
      
      if (orderResult.success) {
        // Clear cart and redirect to success page
        cartStore.clearCart()
        router.push('/order-success')
      } else {
        throw new Error(orderResult.error || 'Failed to create order')
      }
    } else {
      throw new Error('Payment failed. Please try again.')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Payment failed'
  } finally {
    isProcessing.value = false
  }
}
</script>