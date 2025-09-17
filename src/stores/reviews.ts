import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductReview } from '@/lib/supabase'
import { ApiService } from '@/services/api'

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<ProductReview[]>([
    {
      id: '1',
      product_id: 1,
      user_id: '1',
      user_name: 'Demo User',
      rating: 5,
      comment: 'Excellent headphones! Great sound quality and comfortable to wear for long periods.',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      product_id: 1,
      user_id: '2',
      user_name: 'John Doe',
      rating: 4,
      comment: 'Very good noise cancellation. Battery life is as advertised.',
      created_at: '2024-01-12T14:20:00Z'
    },
    {
      id: '3',
      product_id: 2,
      user_id: '1',
      user_name: 'Demo User',
      rating: 5,
      comment: 'Perfect smartwatch for fitness tracking. Love the heart rate monitor!',
      created_at: '2024-01-10T16:45:00Z'
    },
    {
      id: '4',
      product_id: 5,
      user_id: '3',
      user_name: 'Alice Smith',
      rating: 4,
      comment: 'Great camera quality and fast performance. Highly recommended!',
      created_at: '2024-01-08T09:15:00Z'
    }
  ])

  const getProductReviews = (productId: number) => {
    return reviews.value.filter(review => review.product_id === productId)
  }

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / productReviews.length) * 10) / 10
  }

  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadProductReviews = async (productId: number) => {
    loading.value = true
    error.value = null
    try {
      const data = await ApiService.getProductReviews(productId)
      // Update only reviews for this product
      reviews.value = reviews.value.filter(r => r.product_id !== productId)
      reviews.value.push(...data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reviews'
      console.error('Failed to load reviews:', err)
    } finally {
      loading.value = false
    }
  }

  const addReview = async (review: Omit<ProductReview, 'id' | 'created_at'>) => {
    try {
      const newReview = await ApiService.addReview(review)
      reviews.value.unshift(newReview)
      return newReview
    } catch (err) {
      // Fallback to local storage
      const localReview: ProductReview = {
        ...review,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      }
      reviews.value.unshift(localReview)
      return localReview
    }
  }

  const deleteReview = async (id: string) => {
    try {
      await ApiService.deleteReview(id)
      const index = reviews.value.findIndex(review => review.id === id)
      if (index > -1) {
        reviews.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete review'
      throw err
    }
  }

  return {
    reviews,
    loading,
    error,
    getProductReviews,
    getAverageRating,
    loadProductReviews,
    addReview,
    deleteReview
  }
})