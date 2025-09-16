import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

const hasValidConfig = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'

export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  emoji: string
  created_at?: string
}

export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
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