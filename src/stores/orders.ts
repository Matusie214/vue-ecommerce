import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase, type Order, type OrderItem, type Product } from '@/lib/supabase'
import { useAuthStore } from './auth'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createOrder = async (items: { product: Product; quantity: number }[], total: number) => {
    loading.value = true
    error.value = null

    try {
      const authStore = useAuthStore()
      
      if (!authStore.user) {
        throw new Error('User must be authenticated to create order')
      }

      if (!supabase) {
        // Mock order creation
        const mockOrder: Order = {
          id: Math.random().toString(36).substr(2, 9),
          user_id: authStore.user.id,
          total,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          order_items: items.map(item => ({
            id: Math.random().toString(36).substr(2, 9),
            order_id: '',
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
        
        orders.value.unshift(mockOrder)
        return { success: true, order: mockOrder }
      }

      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: authStore.user.id,
            total,
            status: 'confirmed'
          }
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))

      const { data: createdItems, error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)
        .select()

      if (itemsError) throw itemsError

      const fullOrder: Order = {
        ...order,
        order_items: createdItems
      }

      orders.value.unshift(fullOrder)
      return { success: true, order: fullOrder }

    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchUserOrders = async () => {
    loading.value = true
    error.value = null

    try {
      const authStore = useAuthStore()
      
      if (!authStore.user) {
        orders.value = []
        return
      }

      if (!supabase) {
        // Return mock orders if any exist
        return
      }

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', authStore.user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      orders.value = data || []

    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchUserOrders
  }
})