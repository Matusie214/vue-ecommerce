<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
      <p class="text-lg text-gray-600">Discover our amazing collection</p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home & Garden</option>
            <option value="fashion">Fashion</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        
        <!-- Price Range -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select 
            v-model="priceRange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Prices</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-300">$100 - $300</option>
            <option value="300-500">$300 - $500</option>
            <option value="500+">$500+</option>
          </select>
        </div>
      </div>
      
      <!-- Sort -->
      <div class="mt-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">Sort by:</span>
          <select 
            v-model="sortBy"
            class="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="category">Category</option>
          </select>
        </div>
        
        <div class="text-sm text-gray-600">
          {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in filteredProducts" 
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
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { Product } from '@/lib/supabase'

const cartStore = useCartStore()
const productsStore = useProductsStore()

const products = computed(() => productsStore.products)

// Filter and search state
const searchQuery = ref('')
const selectedCategory = ref('')
const priceRange = ref('')
const sortBy = ref('name')

// Computed filtered products
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Price range filter
  if (priceRange.value) {
    filtered = filtered.filter(product => {
      const price = product.price
      switch (priceRange.value) {
        case '0-100': return price <= 100
        case '100-300': return price > 100 && price <= 300
        case '300-500': return price > 300 && price <= 500
        case '500+': return price > 500
        default: return true
      }
    })
  }

  // Sorting
  switch (sortBy.value) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'category':
      filtered.sort((a, b) => a.category.localeCompare(b.category))
      break
  }

  return filtered
})

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}
</script>