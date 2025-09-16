<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Vue Store</h3>
          <p class="text-gray-400">
            Modern e-commerce platform built with Vue.js and TypeScript.
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-gray-400">
            <li><RouterLink to="/products" class="hover:text-white transition-colors">Products</RouterLink></li>
            <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Tech Stack</h3>
          <ul class="space-y-2 text-gray-400">
            <li>Vue 3 + TypeScript</li>
            <li>Pinia State Management</li>
            <li>Tailwind CSS</li>
            <li>Vite Build Tool</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
        <p>&copy; 2024 Vue Store - Demo E-commerce Application</p>
      </div>
    </div>
  </footer>
</template>