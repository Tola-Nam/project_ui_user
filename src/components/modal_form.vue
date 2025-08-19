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
              <div class="flex flex-row items-center">
                <!-- Search Button -->
                <button
                  @click="submitForm"
                  class="text-gray-400 hover:text-gray-700 focus:outline-none p-2">
                  <SearchIcon class="w-5 h-5" />
                </button>

                <!-- Spacer - creates 10px gap -->
                <div class="w-2.5"></div>

                <!-- Close Button -->
                <button
                  @click="closeModal"
                  class="text-gray-600 hover:text-black p-2">
                  <span class="hidden sm:inline">✕</span>
                  <span class="sm:hidden">✕</span>
                </button>
              </div>
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
import { useRouter } from "vue-router";
import { SearchIcon } from "lucide-vue-next";

const router = useRouter();
const isModalOpen = ref(false);
const form = ref({ name: "" });

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = () => {
  const query = form.value.name.trim();
  if (!query) return;

  // Route to SearchResults page with query parameter
  router.push({ name: "SearchResults", query: { q: query } });
  closeModal();
};
</script>
