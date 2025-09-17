<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Admin Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Admin Panel</h1>
      <p class="text-gray-600 mt-2">Manage products, orders and users</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="text-3xl mr-4">📦</div>
          <div>
            <p class="text-sm text-gray-600">Total Products</p>
            <p class="text-2xl font-bold">{{ products.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="text-3xl mr-4">📊</div>
          <div>
            <p class="text-sm text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold">{{ ordersStore.orders.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="text-3xl mr-4">💰</div>
          <div>
            <p class="text-sm text-gray-600">Revenue</p>
            <p class="text-2xl font-bold">${{ totalRevenue.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="text-3xl mr-4">👥</div>
          <div>
            <p class="text-sm text-gray-600">Active Users</p>
            <p class="text-2xl font-bold">24</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'products'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'products'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Products Management
        </button>
        <button
          @click="activeTab = 'orders'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'orders'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Orders
        </button>
      </nav>
    </div>

    <!-- Products Management -->
    <div v-if="activeTab === 'products'" class="space-y-6">
      <!-- Add Product Form -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Add New Product</h2>
        <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="newProduct.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              v-model.number="newProduct.price"
              type="number"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="newProduct.category"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Garden</option>
              <option value="fashion">Fashion</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
            <input
              v-model="newProduct.emoji"
              type="text"
              maxlength="2"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="📱"
            />
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newProduct.description"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div class="md:col-span-2">
            <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      <!-- Products List -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Products List</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in products" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">{{ product.emoji }}</div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ product.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ product.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="editProduct(product)"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Orders Management -->
    <div v-if="activeTab === 'orders'" class="space-y-6">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in ordersStore.orders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  #{{ order.id.substring(0, 8) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.user_id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ order.total.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(order.created_at).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useOrdersStore } from '@/stores/orders'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const productsStore = useProductsStore()
const ordersStore = useOrdersStore()
const authStore = useAuthStore()

const activeTab = ref('products')

const products = computed(() => productsStore.products)

const totalRevenue = computed(() => {
  return ordersStore.orders.reduce((total, order) => total + order.total, 0)
})

const newProduct = ref({
  name: '',
  price: 0,
  category: '',
  description: '',
  emoji: '',
  image: ''
})

const addProduct = () => {
  if (!newProduct.value.name || !newProduct.value.price || !newProduct.value.category) {
    alert('Please fill in all required fields')
    return
  }

  productsStore.addProduct({
    ...newProduct.value,
    id: Date.now()
  })

  // Reset form
  newProduct.value = {
    name: '',
    price: 0,
    category: '',
    description: '',
    emoji: '',
    image: ''
  }

  alert('Product added successfully!')
}

const editProduct = (product: any) => {
  const newName = prompt('Enter new name:', product.name)
  const newPrice = prompt('Enter new price:', product.price.toString())
  
  if (newName && newPrice) {
    productsStore.updateProduct(product.id, {
      ...product,
      name: newName,
      price: parseFloat(newPrice)
    })
    alert('Product updated successfully!')
  }
}

const deleteProduct = (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    productsStore.deleteProduct(id)
    alert('Product deleted successfully!')
  }
}

onMounted(() => {
  // Check if user is admin (in demo mode, allow all authenticated users)
  if (!authStore.isAuthenticated) {
    alert('Please login to access admin panel')
    router.push('/login')
    return
  }
  
  // Load orders
  ordersStore.fetchUserOrders()
})
</script>