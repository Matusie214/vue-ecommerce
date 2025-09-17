<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <RouterLink to="/" class="text-gray-500 hover:text-gray-700">Home</RouterLink>
        </li>
        <li class="text-gray-400">/</li>
        <li>
          <RouterLink to="/products" class="text-gray-500 hover:text-gray-700">Products</RouterLink>
        </li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900 font-medium">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <img 
            v-if="selectedImage || product.image" 
            :src="selectedImage || product.image" 
            :alt="product.name"
            class="w-full h-full object-cover"
            @error="showImageError = true"
          />
          <div 
            v-else-if="!showImageError"
            class="w-full h-full flex items-center justify-center text-6xl"
          >
            {{ product.emoji }}
          </div>
          <div 
            v-else
            class="w-full h-full flex items-center justify-center text-6xl"
          >
            {{ product.emoji }}
          </div>
        </div>
        
        <!-- Image Gallery -->
        <div v-if="product.images && product.images.length > 0" class="grid grid-cols-4 gap-2">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = image"
            :class="[
              'aspect-square rounded-lg overflow-hidden border-2 transition-colors',
              selectedImage === image ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          
          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex items-center">
              <span v-for="star in 5" :key="star" class="text-yellow-400">
                <svg 
                  class="w-5 h-5" 
                  :class="star <= averageRating ? 'fill-current' : 'fill-gray-300'"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </span>
            </div>
            <span class="ml-2 text-sm text-gray-600">
              {{ averageRating.toFixed(1) }} ({{ productReviews.length }} {{ productReviews.length === 1 ? 'review' : 'reviews' }})
            </span>
          </div>
          
          <p class="text-3xl font-bold text-blue-600 mb-4">${{ product.price }}</p>
          
          <!-- Stock Status -->
          <div class="mb-6">
            <div v-if="product.stock_quantity > 0" class="flex items-center">
              <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span class="text-green-700 font-medium">
                {{ product.stock_quantity }} in stock
              </span>
            </div>
            <div v-else class="flex items-center">
              <span class="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              <span class="text-red-700 font-medium">Out of stock</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>

        <!-- Specifications -->
        <div v-if="product.specifications">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              v-for="(value, key) in product.specifications" 
              :key="key"
              class="flex border-b border-gray-200 last:border-b-0"
            >
              <div class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 w-1/3">
                {{ key }}
              </div>
              <div class="px-4 py-3 text-sm text-gray-600 flex-1">
                {{ value }}
              </div>
            </div>
          </div>
        </div>

        <!-- Add to Cart / Stock Notification -->
        <div class="border-t pt-6">
          <div v-if="product.stock_quantity > 0" class="flex gap-4">
            <button 
              @click="addToCart"
              class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Add to Cart - ${{ product.price }}
            </button>
          </div>
          
          <!-- Out of Stock Notification Form -->
          <div v-else class="space-y-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 class="font-semibold text-red-800 mb-2">Product Currently Unavailable</h4>
              <p class="text-red-700 text-sm">
                This item is currently out of stock. Leave your details below and we'll notify you when it becomes available.
              </p>
            </div>
            
            <form @submit.prevent="submitStockNotification" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  v-model="notificationForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  v-model="notificationForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  v-model="notificationForm.message"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific requirements or questions about this product..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Notify Me When Available
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="mt-16 border-t pt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
      
      <!-- Add Review Form (only if authenticated) -->
      <div v-if="authStore.isAuthenticated" class="mb-8 bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Write a Review</h3>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div class="flex items-center space-x-1">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="reviewForm.rating = star"
                class="text-2xl"
                :class="star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'"
              >
                ★
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
            <textarea
              v-model="reviewForm.comment"
              required
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Share your experience with this product..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
      
      <!-- Reviews List -->
      <div class="space-y-6">
        <div v-if="productReviews.length === 0" class="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this product!
        </div>
        
        <div 
          v-for="review in productReviews" 
          :key="review.id"
          class="border border-gray-200 rounded-lg p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center mb-2">
                <span class="font-semibold text-gray-900 mr-3">{{ review.user_name }}</span>
                <div class="flex items-center">
                  <span v-for="star in 5" :key="star" class="text-yellow-400">
                    <svg 
                      class="w-4 h-4" 
                      :class="star <= review.rating ? 'fill-current' : 'fill-gray-300'"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </span>
                </div>
              </div>
              <p class="text-sm text-gray-500">
                {{ new Date(review.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
          
          <p class="text-gray-700">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Product Not Found -->
  <div v-else class="max-w-2xl mx-auto px-4 py-12 text-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
    <p class="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
    <RouterLink 
      to="/products"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Back to Products
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useReviewsStore } from '@/stores/reviews'
import { useNotificationsStore } from '@/stores/notifications'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const productsStore = useProductsStore()
const reviewsStore = useReviewsStore()
const notificationsStore = useNotificationsStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const productId = computed(() => parseInt(route.params.id as string))
const product = computed(() => productsStore.getProductById(productId.value))

const selectedImage = ref('')
const showImageError = ref(false)

const productReviews = computed(() => reviewsStore.getProductReviews(productId.value))
const averageRating = computed(() => reviewsStore.getAverageRating(productId.value))

const reviewForm = ref({
  rating: 5,
  comment: ''
})

const notificationForm = ref({
  name: authStore.user?.full_name || '',
  email: authStore.user?.email || '',
  message: ''
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    alert('Product added to cart!')
  }
}

const submitReview = () => {
  if (!authStore.user || !product.value) return
  
  reviewsStore.addReview({
    product_id: product.value.id,
    user_id: authStore.user.id,
    user_name: authStore.user.full_name || authStore.user.name || 'Anonymous',
    rating: reviewForm.value.rating,
    comment: reviewForm.value.comment
  })
  
  reviewForm.value = { rating: 5, comment: '' }
  alert('Review submitted successfully!')
}

const submitStockNotification = () => {
  if (!product.value) return
  
  notificationsStore.addStockNotification({
    product_id: product.value.id,
    user_email: notificationForm.value.email,
    user_name: notificationForm.value.name,
    message: notificationForm.value.message || `Please notify me when ${product.value.name} becomes available.`
  })
  
  notificationForm.value = { name: '', email: '', message: '' }
  alert('Thank you! We\'ll notify you when this product becomes available.')
}

onMounted(() => {
  if (product.value && product.value.image) {
    selectedImage.value = product.value.image
  }
})
</script>