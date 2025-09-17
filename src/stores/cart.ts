import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '@/lib/supabase'
import { useProductsStore } from './products'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })

  const addToCart = (product: Product) => {
    // Check if product is in stock
    if (product.stock_quantity <= 0) {
      throw new Error('Product is out of stock')
    }
    
    const existingItem = items.value.find(item => item.product.id === product.id)
    const currentCartQuantity = existingItem ? existingItem.quantity : 0
    
    // Check if adding one more would exceed stock
    if (currentCartQuantity + 1 > product.stock_quantity) {
      throw new Error('Not enough stock available')
    }
    
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
      // Check stock availability
      if (quantity > item.product.stock_quantity) {
        throw new Error('Not enough stock available')
      }
      
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      }
    }
  }

  const getCartItemQuantity = (productId: number): number => {
    const item = items.value.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  const canAddToCart = (product: Product): boolean => {
    const currentQuantity = getCartItemQuantity(product.id)
    return product.stock_quantity > 0 && currentQuantity < product.stock_quantity
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
    getCartItemQuantity,
    canAddToCart,
    clearCart
  }
})