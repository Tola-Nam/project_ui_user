<template>
  <navbar />

  <div class="min-h-screen p-4 md:p-0 bg-gray-100">
    <div class="max-w-7xl mx-auto">
      <div v-if="loading" class="text-center py-10 text-gray-500 text-lg">
        Loading products...
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-600">
        {{ error }}
      </div>

      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 py-2">
        <div
          v-for="product in products"
          :key="product.pro_id"
          class="bg-white border-0 hover:shadow-md transition-all duration-300 relative group overflow-hidden flex flex-col">
          <!-- Wishlist Icon -->
          <button
            @click="toggleFavorite(product)"
            class="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all shadow-sm hover:shadow-md"
            :aria-label="
              product.isFavorite ? 'Remove from wishlist' : 'Add to wishlist'
            ">
            <svg
              :class="[
                'w-5 h-5 transition-colors',
                product.isFavorite ? 'text-red-500' : 'text-gray-400',
              ]"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <!-- Badges -->
          <div
            v-if="product.badges.length > 0"
            class="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
            <span
              v-for="badge in product.badges"
              :key="badge"
              :class="{
                'bg-red-500 text-white':
                  badge === '10% OFF' || badge === 'SALE',
                'bg-blue-500 text-white': badge === 'NEW',
                'bg-green-500 text-white': badge === 'FREE SHIPPING',
                'bg-purple-500 text-white': badge === 'LIMITED',
              }"
              class="px-2 py-1 text-xs font-bold rounded-full shadow-sm">
              {{ badge }}
            </span>
          </div>

          <!-- Product Image -->
          <div class="flex items-center justify-center h-48 md:h-52">
            <img
              :src="`http://localhost/ApplicationBackend/api/${product.thumbnail}`"
              :alt="`Product image of ${product.productName}`"
              @error="handleImageError"
              class="w-[90%] h-[90%] object-contain"
              loading="lazy" />
          </div>

          <!-- Product Info -->
          <div class="p-3 md:p-4 flex flex-col justify-between flex-grow">
            <div>
              <div v-if="product.freeShipping" class="mb-1.5">
                <span
                  class="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  FREE Shipping
                </span>
              </div>

              <h3
                class="text-sm font-medium text-gray-900 mb-1 leading-tight hover:text-blue-600 transition-colors">
                {{ product.productName.toUpperCase() }}
              </h3>

              <p class="text-xs text-gray-500 mb-1">
                Category: {{ product.category.toLowerCase() }}
              </p>
              <p class="text-xs text-gray-500 mb-1">
                Color: {{ product.color }} | Length: {{ product.length }}
              </p>
              <p class="text-xs text-gray-600 mb-2 line-clamp-2">
                {{ product.description }}
              </p>

              <!-- Rating -->
              <div class="flex items-center gap-1 mb-2">
                <div class="flex">
                  <span
                    v-for="(star, index) in renderStars(product.rating)"
                    :key="index"
                    :class="{
                      'text-yellow-400': star === '★',
                      'text-yellow-300': star === '☆',
                      'text-sm': true,
                    }">
                    {{ star }}
                  </span>
                </div>
                <span class="text-xs text-gray-500 ml-1">
                  ({{ product.product_viewers }})
                </span>
                <EyeIcon class="w-4 h-4 sm:w-4 sm:h-4" />
              </div>

              <!-- Stock -->
              <p class="text-xs text-gray-500 mb-2">
                In stock: {{ product.stock }}
              </p>

              <!-- Price -->
              <div class="flex items-center gap-2 mb-3 flex-wrap">
                <p
                  class="text-lg font-bold text-gray-400 flex items-baseline gap-1">
                  <span class="text-gray-500 text-base">៛</span>
                  <span>{{ product.price }}</span>
                </p>

                <span
                  v-if="product.originalPrice"
                  class="text-sm text-gray-500 line-through">
                  {{ formatPrice(product.originalPrice) }}
                </span>
                <span
                  v-if="product.originalPrice"
                  class="text-xs font-bold text-red-600">
                  {{ calculateDiscount(product.originalPrice, product.price) }}%
                  OFF
                </span>
              </div>
            </div>

            <!-- Order Button -->
            <button
              class="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
              <span>ORDER NOW</span>
              <ShoppingCartIcon class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import navbar from "../../components/navbar.vue";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/get_items_add_favorite.php",
      {
        credentials: "include", // Send cookies for session
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      products.value = data.data.map((item) => ({
        pro_id: item.pro_id,
        productName: item.productName,
        category: item.category,
        description: item.description,
        length: item.length,
        color: item.color,
        price: parseFloat(item.price) || 0,
        originalPrice: parseFloat(item.original_price) || null,
        stock: parseInt(item.stock) || 0,
        product_viewers: parseInt(item.product_viewers) || 0,
        freeShipping: Boolean(item.free_shipping),
        badges: item.badges || item.tags || [],
        thumbnail: item.thumbnail,
        rating: parseFloat(item.rating) || 0,
        isFavorite: item.isFavorite || true,
      }));
    } else {
      error.value = "Invalid data format from API.";
    }
  } catch (err) {
    error.value = "Error fetching products: " + err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const calculateDiscount = (original, current) => {
  return Math.round(((original - current) / original) * 100);
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push("★");
  }
  if (hasHalfStar) {
    stars.push("★");
  }
  while (stars.length < 5) {
    stars.push("☆");
  }
  return stars;
};

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;

  // Optional: POST to backend
  // await fetch('/api/favorite.php', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ pro_id: product.pro_id, favorite: product.isFavorite }),
  // });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
