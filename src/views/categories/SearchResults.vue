<template>
  <div class="w-full flex justify-center">
    <div class="w-[90%] max-w-7xl">
      <navbar class="bg-gray-200 shadow-none p-0" />
      <!-- Search Results Header -->
      <div v-if="searchQuery" class="py-6">
        <!-- <h2 class="text-xl sm:text-2xl font-semibold text-gray-900">
          Search Results for "{{ searchQuery }}"
        </h2> -->
        <p class="text-sm text-gray-500 mt-1">
          {{ results.length }} products found
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-red-500 p-4 text-center">
        {{ error }}
      </div>

      <!-- Product Grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        ref="productsGrid">
        <div
          v-for="(item, index) in results"
          :key="item.pro_id"
          class="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
          <div class="absolute top-3 right-3 flex flex-col space-y-2 z-10">
            <FavoriteButton
              :item="item"
              @favorite-toggled="handleFavoriteToggle" />
          </div>
          <!-- Product Image -->
          <router-link
            :to="{
              path: 'card',
              query: { pro_id: item.pro_id, category: item.category },
            }"
            class="relative block overflow-hidden flex-grow group">
            <div
              class="w-full overflow-hidden relative flex items-center justify-center aspect-square">
              <img
                :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`"
                :alt="item.productName"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="handleImageError" />
              <div
                class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
          </router-link>

          <!-- Product Info -->
          <div class="p-4 flex flex-col flex-grow bg-gray-50">
            <div class="mb-2 max-w-full">
              <h3
                class="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {{ item.productName.toUpperCase() }}
              </h3>
              <p class="text-xs text-gray-500 uppercase tracking-wide">
                {{ item.category.toLowerCase() }}
              </p>
            </div>

            <div class="flex items-center space-x-2 mb-2 text-gray-500 text-xs">
              <div class="flex items-center space-x-0.5">
                <StarIcon
                  v-for="star in 5"
                  :key="star"
                  class="w-3 h-3 sm:w-4 sm:h-4 transition-colors"
                  :class="
                    star <= item.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  " />
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-red-500 text-xs">{{
                  item.product_viewers || 0
                }}</span>
                <EyeIcon class="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>

            <div class="mt-auto flex items-center justify-between">
              <div>
                <span class="text-base font-bold text-gray-900">
                  ៛{{ item.price }}
                </span>
                <span
                  v-if="item.originalPrice"
                  class="ml-2 text-xs text-gray-400 line-through">
                  ៛{{ item.originalPrice }}
                </span>
              </div>
              <button
                @click.stop="addToCart(item)"
                class="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110"
                aria-label="Add to Cart">
                <ShoppingCartIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="results.length > 0"
        class="flex justify-center items-center py-8 space-x-4">
        <button
          @click="prevPage"
          :disabled="page <= 1"
          class="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors">
          Previous
        </button>
        <span class="text-sm text-gray-700">Page {{ page }}</span>
        <button
          @click="nextPage"
          :disabled="results.length < perPage"
          class="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors">
          Next
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && results.length === 0" class="text-center py-12">
        <p class="text-gray-500">No products found matching your search</p>
        <button
          @click="clearSearch"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Clear Search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StarIcon, EyeIcon, ShoppingCartIcon } from "lucide-vue-next";
import FavoriteButton from "../mod/FavoriteButton.vue";
import navbar from "../../components/navbar.vue";
const route = useRoute();
const router = useRouter();

// State
const searchQuery = ref(route.query.q || "");
const results = ref([]);
const loading = ref(false);
const error = ref(null);
const page = ref(1);
const perPage = ref(20);

// Fetch data from API
const fetchResults = async () => {
  loading.value = true;
  error.value = null;
  results.value = [];

  try {
    const url = new URL(
      "http://localhost/ApplicationBackend/api/middleware/search_products.php"
    );
    url.searchParams.append("q", searchQuery.value);
    url.searchParams.append("page", page.value);
    url.searchParams.append("perPage", perPage.value);

    const response = await fetch(url.toString(), { credentials: "include" });
    const data = await response.json();

    if (!data.success) throw new Error(data.message || "Search failed");
    results.value = data.results || [];
  } catch (err) {
    error.value = err.message;
    console.error("Search error:", err);
  } finally {
    loading.value = false;
  }
};

// Pagination
const nextPage = () => {
  page.value++;
  fetchResults();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchResults();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// const clearSearch = () => {
//   router.push({ query: { ...route.query, q: undefined } });
//   searchQuery.value = "";
//   page.value = 1;
// };
//! for clear search when user search not found.
const clearSearch = () => {
  // Reset reactive state
  searchQuery.value = "";
  page.value = 1;

  // Navigate to default route ("/") without any query
  router.push({ path: "/" });
};

// Product actions
const addToCart = (product) => {
  console.log("Added to cart:", product.productName);
};

const handleImageError = (event) => {
  event.target.src = "/placeholder-image.png";
};

// Initial fetch and watchers
onMounted(fetchResults);

watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ || "";
    page.value = 1;
    fetchResults();
  }
);
</script>

<style scoped>
/* Custom styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1/1;
}

/* Card hover effect */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
