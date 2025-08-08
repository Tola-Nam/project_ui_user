<template>
  <navbar />
  <div class="min-h-screen p-4 bg-gray-100">
    <div class="max-w-7xl mx-auto overflow-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center space-x-2 mb-2">
          <button
            @click="$router.go(-1)"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon class="w-5 h-5 text-gray-600" />
          </button>
          <h1 class="text-2xl font-bold text-gray-900 capitalize">
            {{
              route.query.category?.replace(/([A-Z])/g, " $1").trim() ||
              "Products"
            }}
          </h1>
        </div>
        <p class="text-gray-600">{{ items.length }} products found</p>
      </div>

      <!-- Compact Grid Layout -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
        <div
          v-for="item in items"
          :key="item.pro_id"
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group">
          <!-- Clickable Content Area -->
          <div class="block">
            <!-- Compact Image -->
            <div class="relative">
              <div
                class="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`"
                  :alt="item.productName"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  @error="handleImageError" />
              </div>

              <!-- Favorite Button Overlay -->
              <button
                @click.prevent="toggleFavorite(item.pro_id)"
                class="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100">
                <HeartIcon
                  class="w-4 h-4 transition-colors"
                  :class="
                    item.isFavorite
                      ? 'text-red-500 fill-current'
                      : 'text-gray-400 hover:text-red-400'
                  " />
              </button>

              <!-- Stock Badge -->
              <div class="absolute top-2 left-2">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="
                    item.stock > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ">
                  {{
                    item.stock > 0 ? `${item.stock} in stock` : "Out of stock"
                  }}
                </span>
              </div>
            </div>

            <!-- Compact Info -->
            <div class="p-3 space-y-2">
              <!-- Product Name -->
              <h3
                class="text-sm font-medium text-gray-900 line-clamp-2 leading-tight"
                :title="item.productName">
                {{ item.productName }}
              </h3>

              <!-- Price -->
              <div class="text-lg font-bold text-green-600">
                ៛{{ item.price }}
              </div>

              <!-- Product Details Row -->
              <div
                class="flex items-center justify-between text-xs text-gray-500">
                <div class="flex items-center space-x-2">
                  <!-- Rating/Length -->
                  <div class="flex items-center space-x-1">
                    <StarIcon class="w-3 h-3 text-yellow-400 fill-current" />
                    <span class="font-mono">{{ item.length || "0" }}</span>
                  </div>
                  <!-- Color -->
                  <div class="flex items-center space-x-1" v-if="item.color">
                    <div
                      class="w-3 h-3 rounded-full border border-gray-300"
                      :style="{
                        backgroundColor: getColorCode(item.color),
                      }"></div>
                    <span class="truncate max-w-[40px]">{{ item.color }}</span>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <p
                class="text-xs text-gray-500 line-clamp-2 leading-relaxed"
                v-if="item.description">
                {{ item.description }}
              </p>
            </div>
          </div>

          <!-- Quick Actions (Hidden by default, shown on hover) -->
          <div
            class="px-3 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div class="flex space-x-2">
              <button
                @click="quickView(item)"
                class="flex-1 flex items-center justify-center px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors">
                <EyeIcon class="w-3 h-3 mr-1" />
                View
              </button>
              <button
                @click="addToCart(item)"
                class="flex-1 flex items-center justify-center px-2 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors"
                :disabled="item.stock <= 0"
                :class="{ 'opacity-50 cursor-not-allowed': item.stock <= 0 }">
                <ShoppingCartIcon class="w-3 h-3 mr-1" />
                Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0 && !loading" class="text-center py-16">
        <PackageIcon class="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p class="text-gray-500 mb-4">
          No products available in this category.
        </p>
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
          <div class="aspect-square bg-gray-200 animate-pulse"></div>
          <div class="p-3 space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
            <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick View Modal -->
    <div
      v-if="showQuickView"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showQuickView = false">
      <div
        class="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Quick View</h3>
          <button
            @click="showQuickView = false"
            class="text-gray-400 hover:text-gray-600 transition-colors">
            <XIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Content -->
        <div v-if="selectedItem" class="p-4 space-y-4">
          <!-- Product Image -->
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              :src="`http://localhost/ApplicationBackend/api/${selectedItem.thumbnail}`"
              :alt="selectedItem.productName"
              class="w-full h-full object-cover" />
          </div>

          <!-- Product Info -->
          <div class="space-y-3">
            <h4 class="text-xl font-bold text-gray-900">
              {{ selectedItem.productName }}
            </h4>
            <p class="text-2xl font-bold text-green-600">
              ${{ selectedItem.price }}
            </p>

            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Stock:</span>
                <span
                  class="ml-2 font-medium"
                  :class="
                    selectedItem.stock > 0 ? 'text-green-600' : 'text-red-600'
                  ">
                  {{
                    selectedItem.stock > 0
                      ? `${selectedItem.stock} available`
                      : "Out of stock"
                  }}
                </span>
              </div>
              <div v-if="selectedItem.color">
                <span class="text-gray-500">Color:</span>
                <span class="ml-2 font-medium">{{ selectedItem.color }}</span>
              </div>
              <div v-if="selectedItem.length">
                <span class="text-gray-500">Length:</span>
                <span class="ml-2 font-medium">{{ selectedItem.length }}</span>
              </div>
            </div>

            <div v-if="selectedItem.description">
              <h5 class="font-medium text-gray-900 mb-2">Description</h5>
              <p class="text-gray-600 text-sm leading-relaxed">
                {{ selectedItem.description }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex space-x-3 pt-4">
              <button
                @click="addToCart(selectedItem)"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                :disabled="selectedItem.stock <= 0">
                Add to Cart
              </button>
              <button
                @click="toggleFavorite(selectedItem.pro_id)"
                class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <HeartIcon
                  class="w-5 h-5"
                  :class="
                    selectedItem.isFavorite
                      ? 'text-red-500 fill-current'
                      : 'text-gray-400'
                  " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import navbar from "../../components/navbar.vue";
import {
  ArrowLeftIcon,
  HeartIcon,
  EyeIcon,
  ShoppingCartIcon,
  StarIcon,
  PackageIcon,
  XIcon,
} from "lucide-vue-next";

const route = useRoute();
const items = ref([]);
const loading = ref(true);
const showQuickView = ref(false);
const selectedItem = ref(null);

onMounted(async () => {
  const category = route.query.category;

  if (!category) {
    console.error("Missing category in URL");
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(
      `http://localhost/ApplicationBackend/api/middleware/api_fecth_category.php?category=${category}`
    );
    const json = await res.json();

    if (json.status && Array.isArray(json.data)) {
      items.value = json.data.map((item) => ({
        ...item,
        isFavorite: false,
      }));
    } else {
      console.error("Expected array in data, got:", json);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
});

const toggleFavorite = (id) => {
  const item = items.value.find((i) => i.pro_id === id);
  if (item) {
    item.isFavorite = !item.isFavorite;
    // You can add API call here to persist favorite status
  }
};

const quickView = (item) => {
  selectedItem.value = item;
  showQuickView.value = true;
};

const addToCart = (item) => {
  if (item.stock <= 0) return;

  // Add your cart logic here
  console.log("Added to cart:", item);

  // Show success message (you can use a toast library)
  alert(`${item.productName} added to cart!`);
};

const handleImageError = (event) => {
  // Fallback image or placeholder
  event.target.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA3NEg5M1Y4MEg4N1Y3NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+";
};

const getColorCode = (colorName) => {
  const colorMap = {
    black: "#000000",
    white: "#ffffff",
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#10b981",
    yellow: "#f59e0b",
    purple: "#8b5cf6",
    pink: "#ec4899",
    gray: "#6b7280",
    brown: "#92400e",
  };

  return colorMap[colorName?.toLowerCase()] || "#6b7280";
};
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive grid adjustments */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1280px) and (max-width: 1536px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

/* Loading animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
