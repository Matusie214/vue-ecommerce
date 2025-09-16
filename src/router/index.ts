import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})

export default router