import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })

  const addToCart = (product: Product) => {
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})