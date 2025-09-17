import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/lib/supabase'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      price: 199, 
      emoji: '🎧', 
      description: 'Premium noise-cancelling headphones with superior sound quality', 
      category: 'electronics', 
      image: '', 
      stock_quantity: 15,
      images: [],
      specifications: {
        'Battery Life': '30 hours',
        'Wireless Range': '10 meters',
        'Noise Cancellation': 'Active',
        'Weight': '250g'
      }
    },
    { 
      id: 2, 
      name: 'Smart Watch', 
      price: 299, 
      emoji: '⌚', 
      description: 'Advanced fitness tracking and notifications on your wrist', 
      category: 'electronics', 
      image: '', 
      stock_quantity: 8,
      images: [],
      specifications: {
        'Display': '1.4" AMOLED',
        'Battery Life': '7 days',
        'Water Resistance': '5ATM',
        'GPS': 'Built-in'
      }
    },
    { 
      id: 3, 
      name: 'Coffee Maker', 
      price: 149, 
      emoji: '☕', 
      description: 'Automatic drip coffee maker with programmable timer', 
      category: 'home', 
      image: '', 
      stock_quantity: 12,
      images: [],
      specifications: {
        'Capacity': '12 cups',
        'Material': 'Stainless Steel',
        'Auto Shut-off': '2 hours',
        'Filter Type': 'Permanent'
      }
    },
    { 
      id: 4, 
      name: 'Backpack', 
      price: 79, 
      emoji: '🎒', 
      description: 'Durable travel backpack with multiple compartments', 
      category: 'accessories', 
      image: '', 
      stock_quantity: 0,
      images: [],
      specifications: {
        'Capacity': '30L',
        'Material': 'Waterproof Nylon',
        'Laptop Compartment': '15.6 inch',
        'Weight': '1.2kg'
      }
    },
    { 
      id: 5, 
      name: 'Smartphone', 
      price: 699, 
      emoji: '📱', 
      description: 'Latest flagship smartphone with advanced camera system', 
      category: 'electronics', 
      image: '', 
      stock_quantity: 3,
      images: [],
      specifications: {
        'Screen Size': '6.1 inch',
        'Storage': '128GB',
        'Camera': '48MP Triple',
        'Battery': '4000mAh'
      }
    },
    { 
      id: 6, 
      name: 'Sneakers', 
      price: 129, 
      emoji: '👟', 
      description: 'Comfortable running shoes with advanced cushioning', 
      category: 'fashion', 
      image: '', 
      stock_quantity: 20,
      images: [],
      specifications: {
        'Material': 'Mesh Upper',
        'Sole Type': 'Rubber',
        'Cushioning': 'Air Cushion',
        'Sizes': '36-46'
      }
    },
    { 
      id: 7, 
      name: 'Laptop', 
      price: 999, 
      emoji: '💻', 
      description: 'High-performance laptop for work and gaming', 
      category: 'electronics', 
      image: '', 
      stock_quantity: 5,
      images: [],
      specifications: {
        'Processor': 'Intel i7',
        'RAM': '16GB',
        'Storage': '512GB SSD',
        'Graphics': 'NVIDIA GTX'
      }
    },
    { 
      id: 8, 
      name: 'Sunglasses', 
      price: 89, 
      emoji: '🕶️', 
      description: 'UV protection sunglasses with polarized lenses', 
      category: 'accessories', 
      image: '', 
      stock_quantity: 0,
      images: [],
      specifications: {
        'UV Protection': '100% UV400',
        'Lens Type': 'Polarized',
        'Frame Material': 'Titanium',
        'Style': 'Aviator'
      }
    },
    { 
      id: 9, 
      name: 'Gaming Mouse', 
      price: 59, 
      emoji: '🖱️', 
      description: 'High-precision gaming mouse with customizable buttons', 
      category: 'electronics', 
      image: '', 
      stock_quantity: 25,
      images: [],
      specifications: {
        'DPI': '16000',
        'Buttons': '8 Programmable',
        'Sensor': 'Optical',
        'Cable Length': '1.8m'
      }
    },
    { 
      id: 10, 
      name: 'Plant Pot', 
      price: 25, 
      emoji: '🪴', 
      description: 'Ceramic decorative plant pot with drainage holes', 
      category: 'home', 
      image: '', 
      stock_quantity: 30,
      images: [],
      specifications: {
        'Material': 'Ceramic',
        'Size': '15cm diameter',
        'Drainage': 'Yes',
        'Color': 'Terracotta'
      }
    },
    { 
      id: 11, 
      name: 'Wallet', 
      price: 45, 
      emoji: '👛', 
      description: 'Leather bi-fold wallet with RFID protection', 
      category: 'accessories', 
      image: '', 
      stock_quantity: 18,
      images: [],
      specifications: {
        'Material': 'Genuine Leather',
        'Card Slots': '8',
        'RFID Protection': 'Yes',
        'Dimensions': '11x9x2 cm'
      }
    },
    { 
      id: 12, 
      name: 'T-Shirt', 
      price: 29, 
      emoji: '👕', 
      description: 'Cotton crew neck t-shirt in various colors', 
      category: 'fashion', 
      image: '', 
      stock_quantity: 50,
      images: [],
      specifications: {
        'Material': '100% Cotton',
        'Fit': 'Regular',
        'Care': 'Machine Washable',
        'Sizes': 'S, M, L, XL'
      }
    }
  ])

  const addProduct = (product: Product) => {
    products.value.push(product)
  }

  const updateProduct = (id: number, updatedProduct: Product) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index > -1) {
      products.value[index] = updatedProduct
    }
  }

  const updateStock = (id: number, newQuantity: number) => {
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.stock_quantity = newQuantity
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
    updateStock,
    deleteProduct,
    getProductById
  }
})