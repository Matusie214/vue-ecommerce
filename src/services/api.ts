import { supabase } from '@/lib/supabase'
import type { Product, ProductReview, StockNotification, Order, OrderItem } from '@/lib/supabase'

export class ApiService {
  // Products
  static async getProducts(): Promise<Product[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async getProduct(id: number): Promise<Product | null> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async updateProductStock(id: number, stock_quantity: number): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('products')
      .update({ stock_quantity })
      .eq('id', id)
    
    if (error) throw error
  }

  static async addProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteProduct(id: number): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Reviews
  static async getProductReviews(productId: number): Promise<ProductReview[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async addReview(review: Omit<ProductReview, 'id' | 'created_at'>): Promise<ProductReview> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('product_reviews')
      .insert(review)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteReview(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('product_reviews')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Stock Notifications
  static async addStockNotification(notification: Omit<StockNotification, 'id' | 'created_at' | 'status'>): Promise<StockNotification> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('stock_notifications')
      .insert({
        ...notification,
        status: 'pending'
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getStockNotifications(productId: number): Promise<StockNotification[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('stock_notifications')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async updateNotificationStatus(id: string, status: StockNotification['status']): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('stock_notifications')
      .update({ status })
      .eq('id', id)
    
    if (error) throw error
  }

  // Orders
  static async createOrder(order: Omit<Order, 'id' | 'created_at' | 'order_items'>): Promise<Order> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async addOrderItems(orderItems: Omit<OrderItem, 'id'>[]): Promise<OrderItem[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()
    
    if (error) throw error
    return data || []
  }

  static async getUserOrders(userId: string): Promise<Order[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async updateOrderStatus(id: string, status: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
    
    if (error) throw error
  }

  // Inventory Management
  static async decreaseStock(productId: number, quantity: number): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    // Get current stock
    const { data: product, error: getError } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', productId)
      .single()
    
    if (getError) throw getError
    
    const newStock = Math.max(0, product.stock_quantity - quantity)
    
    const { error } = await supabase
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', productId)
    
    if (error) throw error
  }

  static async increaseStock(productId: number, quantity: number): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    // Get current stock
    const { data: product, error: getError } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', productId)
      .single()
    
    if (getError) throw getError
    
    const newStock = product.stock_quantity + quantity
    
    const { error } = await supabase
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', productId)
    
    if (error) throw error
  }

  // Bulk operations for admin
  static async bulkUpdateStock(updates: { id: number; stock_quantity: number }[]): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    for (const update of updates) {
      await this.updateProductStock(update.id, update.stock_quantity)
    }
  }

  // Search and filtering
  static async searchProducts(query: string, category?: string, priceRange?: string): Promise<Product[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    let queryBuilder = supabase
      .from('products')
      .select('*')
    
    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }
    
    if (category) {
      queryBuilder = queryBuilder.eq('category', category)
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number)
      if (max) {
        queryBuilder = queryBuilder.gte('price', min).lte('price', max)
      } else {
        queryBuilder = queryBuilder.gte('price', min)
      }
    }
    
    const { data, error } = await queryBuilder.order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}