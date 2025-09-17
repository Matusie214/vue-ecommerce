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
        <button
          @click="activeTab = 'notifications'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'notifications'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Stock Notifications
        </button>
      </nav>
    </div>

    <!-- Products Management -->
    <div v-if="activeTab === 'products'" class="space-y-6">
      <!-- Add Product Form -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Add New Product</h2>
        <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Image URL 
              <span class="text-xs text-gray-500">(max 500 chars)</span>
            </label>
            <input
              v-model="newProduct.image"
              type="url"
              maxlength="500"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            <p class="text-xs text-gray-500 mt-1">
              {{ newProduct.image ? newProduct.image.length : 0 }}/500 characters
              <span v-if="newProduct.image && newProduct.image.length > 500" class="text-red-500 font-medium">
                - URL too long!
              </span>
            </p>
            <!-- Image Preview for Add Form -->
            <div v-if="newProduct.image" class="mt-2">
              <img 
                :src="newProduct.image" 
                :alt="newProduct.name || 'Product'"
                class="w-20 h-20 object-cover rounded border"
                @error="newProductImageError = true"
                @load="newProductImageError = false"
              />
              <p v-if="newProductImageError" class="text-red-500 text-xs mt-1">
                Invalid image URL
              </p>
            </div>
            <div class="text-xs text-blue-600 mt-1">
              💡 Try: <a href="https://unsplash.com" target="_blank" class="underline">Unsplash</a>, 
              <a href="https://pexels.com" target="_blank" class="underline">Pexels</a> for free images
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              v-model.number="newProduct.stock_quantity"
              type="number"
              min="0"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          
          <div class="md:col-span-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newProduct.description"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div class="md:col-span-3">
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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in products" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12 mr-4">
                      <img 
                        v-if="product.image" 
                        :src="product.image" 
                        :alt="product.name"
                        class="h-12 w-12 object-cover rounded-lg border"
                        @error="$event.target.style.display='none'"
                      />
                      <div 
                        v-else
                        class="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl"
                      >
                        {{ product.emoji }}
                      </div>
                    </div>
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
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    product.stock_quantity > 10 ? 'bg-green-100 text-green-800' :
                    product.stock_quantity > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]">
                    {{ product.stock_quantity }} {{ product.stock_quantity === 1 ? 'item' : 'items' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="openEditModal(product)"
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

    <!-- Stock Notifications Management -->
    <div v-if="activeTab === 'notifications'" class="space-y-6">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Stock Availability Requests</h2>
          <p class="text-sm text-gray-600 mt-1">Customers waiting for out-of-stock products</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="notification in notificationsStore.notifications" :key="notification.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      {{ getProductName(notification.product_id) }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ notification.user_name }}</div>
                  <div class="text-sm text-gray-500">{{ notification.user_email }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate">
                    {{ notification.message }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(notification.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    notification.status === 'notified' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ notification.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="notificationsStore.notifications.length === 0">
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                  No stock notifications yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeEditModal"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                  Edit Product
                </h3>
                
                <form @submit.prevent="updateProduct" class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        v-model="editingProduct.name"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        v-model.number="editingProduct.price"
                        type="number"
                        step="0.01"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        v-model="editingProduct.category"
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
                        v-model="editingProduct.emoji"
                        type="text"
                        maxlength="2"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="📱"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input
                      v-model.number="editingProduct.stock_quantity"
                      type="number"
                      min="0"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Image URL 
                      <span class="text-xs text-gray-500">(max 500 chars)</span>
                    </label>
                    <input
                      v-model="editingProduct.image"
                      type="url"
                      maxlength="500"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      {{ editingProduct.image ? editingProduct.image.length : 0 }}/500 characters
                      <span v-if="editingProduct.image && editingProduct.image.length > 500" class="text-red-500 font-medium">
                        - URL too long!
                      </span>
                    </p>
                  </div>
                  
                  <!-- Image Preview -->
                  <div v-if="editingProduct.image" class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                    <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <img 
                        :src="editingProduct.image" 
                        :alt="editingProduct.name"
                        class="max-w-full h-32 object-contain mx-auto"
                        @error="imageError = true"
                        @load="imageError = false"
                      />
                      <p v-if="imageError" class="text-red-500 text-sm mt-2 text-center">
                        Failed to load image. Please check the URL.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      v-model="editingProduct.description"
                      required
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Modal footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="updateProduct"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update Product
            </button>
            <button
              @click="closeEditModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
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
import { useNotificationsStore } from '@/stores/notifications'
import { useRouter } from 'vue-router'

const router = useRouter()
const productsStore = useProductsStore()
const ordersStore = useOrdersStore()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

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
  image: '',
  stock_quantity: 0,
  images: [],
  specifications: {}
})

const showEditModal = ref(false)
const editingProduct = ref({
  id: 0,
  name: '',
  price: 0,
  category: '',
  description: '',
  emoji: '',
  image: '',
  stock_quantity: 0,
  images: [],
  specifications: {}
})
const imageError = ref(false)
const newProductImageError = ref(false)

const addProduct = () => {
  if (!newProduct.value.name || !newProduct.value.price || !newProduct.value.category) {
    alert('Please fill in all required fields')
    return
  }

  if (newProduct.value.image && newProduct.value.image.length > 500) {
    alert('Image URL is too long. Please use a shorter URL (max 500 characters) or try uploading to a different service like Unsplash or Imgur.')
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
    image: '',
    stock_quantity: 0,
    images: [],
    specifications: {}
  }

  alert('Product added successfully!')
}

const openEditModal = (product: any) => {
  editingProduct.value = { ...product }
  imageError.value = false
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingProduct.value = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    description: '',
    emoji: '',
    image: '',
    stock_quantity: 0,
    images: [],
    specifications: {}
  }
}

const updateProduct = () => {
  if (!editingProduct.value.name || !editingProduct.value.price || !editingProduct.value.category) {
    alert('Please fill in all required fields')
    return
  }

  if (editingProduct.value.image && editingProduct.value.image.length > 500) {
    alert('Image URL is too long. Please use a shorter URL (max 500 characters) or try uploading to a different service like Unsplash or Imgur.')
    return
  }

  productsStore.updateProduct(editingProduct.value.id, editingProduct.value)
  closeEditModal()
  alert('Product updated successfully!')
}

const deleteProduct = (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    productsStore.deleteProduct(id)
    alert('Product deleted successfully!')
  }
}

const getProductName = (productId: number) => {
  const product = productsStore.getProductById(productId)
  return product ? product.name : 'Unknown Product'
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