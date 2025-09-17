import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if Supabase is properly configured
// Make sure to use anon key, not service_role key (which would cause "Forbidden" error)
const hasValidConfig = supabaseUrl && 
                      supabaseAnonKey && 
                      supabaseUrl.includes('supabase.co') &&
                      !supabaseAnonKey.includes('service_role') &&
                      !supabaseAnonKey.includes('sb_secret_') &&
                      supabaseUrl !== 'https://your-project.supabase.co' // Not placeholder

// Debug logging for deployment troubleshooting
if (import.meta.env.DEV) {
  console.log('Supabase Config Check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    validUrl: supabaseUrl.includes('supabase.co'),
    isNotServiceRole: !supabaseAnonKey.includes('service_role') && !supabaseAnonKey.includes('sb_secret_'),
    hasValidConfig
  })
}

export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  emoji: string
  stock_quantity: number
  images: string[]
  specifications?: Record<string, string>
  created_at?: string
}

export interface ProductReview {
  id: string
  product_id: number
  user_id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
}

export interface StockNotification {
  id: string
  product_id: number
  user_email: string
  user_name: string
  message: string
  created_at: string
  status: 'pending' | 'notified' | 'cancelled'
}

export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url?: string
  phone?: string
  address?: string
  created_at: string
  updated_at?: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: number
  quantity: number
  price: number
}

export interface CartItem {
  product: Product
  quantity: number
}