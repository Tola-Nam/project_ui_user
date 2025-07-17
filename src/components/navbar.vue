<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-900">ShopVue</h1>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" class="text-gray-700 hover:text-gray-900">Products</a>
          <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
          <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
        <div class="flex items-center space-x-4">
          <button class="text-gray-700 hover:text-gray-900">
            <SearchIcon class="w-5 h-5" />
          </button>
          <button class="text-gray-700 hover:text-gray-900 relative">
            <ShoppingCartIcon class="w-5 h-5" />
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >2</span
            >
          </button>
          <!-- <button class="text-gray-700 hover:text-gray-900">
              <MessageSquare class="w-6 h-6 text-gray-700" />
            </button> -->
          <modal ref="modalRef" />
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { SearchIcon, ShoppingCartIcon } from "lucide-vue-next";
import modal from "../views/modal.vue";
</script>
