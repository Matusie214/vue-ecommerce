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
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 
      stock_quantity: 15,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 
      stock_quantity: 8,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500', 
      stock_quantity: 12,
      images: [
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500',
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 
      stock_quantity: 0,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 
      stock_quantity: 3,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 
      stock_quantity: 20,
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', 
      stock_quantity: 5,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', 
      stock_quantity: 0,
      images: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 
      stock_quantity: 25,
      images: [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500', 
      stock_quantity: 30,
      images: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', 
      stock_quantity: 18,
      images: [
        'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
      ],
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
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 
      stock_quantity: 50,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        'https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=500',
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500'
      ],
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