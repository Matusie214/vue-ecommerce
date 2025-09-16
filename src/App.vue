<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>