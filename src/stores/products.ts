import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/lib/supabase'

export const useProductsStore = defineStore('products', () => {
  const products = ref<(Product & { emoji: string })[]>([
    { id: 1, name: 'Wireless Headphones', price: 199, emoji: '🎧', description: 'Premium noise-cancelling headphones', category: 'electronics', image: '' },
    { id: 2, name: 'Smart Watch', price: 299, emoji: '⌚', description: 'Fitness tracking and notifications', category: 'electronics', image: '' },
    { id: 3, name: 'Coffee Maker', price: 149, emoji: '☕', description: 'Automatic drip coffee maker', category: 'home', image: '' },
    { id: 4, name: 'Backpack', price: 79, emoji: '🎒', description: 'Durable travel backpack', category: 'accessories', image: '' },
    { id: 5, name: 'Smartphone', price: 699, emoji: '📱', description: 'Latest flagship smartphone', category: 'electronics', image: '' },
    { id: 6, name: 'Sneakers', price: 129, emoji: '👟', description: 'Comfortable running shoes', category: 'fashion', image: '' },
    { id: 7, name: 'Laptop', price: 999, emoji: '💻', description: 'High-performance laptop', category: 'electronics', image: '' },
    { id: 8, name: 'Sunglasses', price: 89, emoji: '🕶️', description: 'UV protection sunglasses', category: 'accessories', image: '' },
    { id: 9, name: 'Gaming Mouse', price: 59, emoji: '🖱️', description: 'High-precision gaming mouse', category: 'electronics', image: '' },
    { id: 10, name: 'Plant Pot', price: 25, emoji: '🪴', description: 'Ceramic decorative plant pot', category: 'home', image: '' },
    { id: 11, name: 'Wallet', price: 45, emoji: '👛', description: 'Leather bi-fold wallet', category: 'accessories', image: '' },
    { id: 12, name: 'T-Shirt', price: 29, emoji: '👕', description: 'Cotton crew neck t-shirt', category: 'fashion', image: '' }
  ])

  const addProduct = (product: Product & { emoji: string }) => {
    products.value.push(product)
  }

  const updateProduct = (id: number, updatedProduct: Product & { emoji: string }) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index > -1) {
      products.value[index] = updatedProduct
    }
  }

  const deleteProduct = (id: number) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index > -1) {
      products.value.splice(index, 1)
    }
  }

  const getProductById = (id: number) => {
    return products.value.find(p => p.id === id)
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
  }
})