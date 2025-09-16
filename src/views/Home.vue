<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Vue Store
        </h1>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing products with our modern Vue.js e-commerce platform
        </p>
        <RouterLink 
          to="/products"
          class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose Vue Store?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
            <p class="text-gray-600">Built with Vue 3 and Vite for lightning-fast loading</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Secure Shopping</h3>
            <p class="text-gray-600">Safe and secure checkout process</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Great Experience</h3>
            <p class="text-gray-600">Smooth and intuitive user interface</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
        <p class="text-xl text-gray-600 mb-8">
          Explore our collection of products and find something you love
        </p>
        <RouterLink 
          to="/products"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home page component
</script>