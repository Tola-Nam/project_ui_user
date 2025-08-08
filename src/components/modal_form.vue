<template>
  <div>
    <!-- Trigger Button -->
    <button
      @click="openModal"
      class="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <SearchIcon class="w-5 h-5" />
    </button>

    <!-- Modal Overlay -->
    <div
      v-if="isModalOpen"
      class="fixed inset-x-0 top-0 h-30 bg-opacity-500 flex justify-between items-center z-10">
      <!-- Modal Box -->
      <div class="bg-gray-100 rounded-sm p-6 w-full relative">
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <div class="mb-4 relative">
            <div
              class="flex items-center relative justify-between px-4 sm:px-8 md:mx-[50px] lg:mx-[150px] xl:mx-[350px]">
              <input
                v-model="form.name"
                type="text"
                id="name"
                placeholder="What are you searching for?"
                class="w-full rounded px-3 py-2 pr-10 focus:outline-none text-decoration-underline border-0 border-gray-300 transition-colors"
                required />

              <!-- Search Icon -->
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none me-6">
                <SearchIcon class="w-5 h-5" />
              </span>

              <!-- Close Button (visible on mobile) -->
              <button
                @click="closeModal"
                class="md:absolute md:top-2 md:right-2 text-gray-600 hover:text-black ml-2 md:ml-0">
                <span class="hidden sm:inline">✕</span>
                <span class="sm:hidden">✕</span>
              </button>
            </div>
            <hr class="w-full border-t border-gray-300 my-2" />
          </div>

          <div class="flex justify-end">
            <button type="submit" class="sr-only">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isModalOpen = ref(false);
const form = ref({
  name: "",
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = () => {
  console.log("Submitted name:", form.value.name);
  closeModal();
};
</script>
