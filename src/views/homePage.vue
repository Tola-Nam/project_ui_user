<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <navbar />

    <!-- Hero Carousel -->
    <section class="relative">
      <div class="relative h-96 md:h-[500px] overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(slide, index) in carouselSlides"
            :key="index"
            class="w-full flex-shrink-0 relative"
          >
            <img
              :src="slide.image"
              :alt="slide.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            >
              <div class="text-center text-white max-w-2xl px-4">
                <h2 class="text-4xl md:text-6xl font-bold mb-4">
                  {{ slide.title }}
                </h2>
                <p class="text-lg md:text-xl mb-8">{{ slide.description }}</p>
                <button
                  class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {{ slide.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>

        <!-- Carousel Indicators -->
        <div
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          <button
            v-for="(slide, index) in carouselSlides"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-all"
            :class="
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            "
          ></button>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <span class="text-3xl text-gray-900">Featured Products</span>
          <button class="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>

        <!-- Responsive grid - 2 cards on mobile, 4 on desktop -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="item in items"
            :key="item.pro_id"
            class="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
          >
            <!-- Favorite Button -->
            <div class="absolute top-3 right-3 flex flex-col space-y-2 z-50">
              <button
                @click.stop="toggleFavorite(item.pro_id)"
                class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
                aria-label="Toggle Favorite"
              >
                <HeartIcon
                  class="w-5 h-5"
                  :class="
                    item.isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-500'
                  "
                />
              </button>
            </div>

            <!-- Product Image -->
            <router-link
              :to="{
                path: 'card',
                query: { pro_id: item.pro_id, category: item.category },
              }"
              class="relative block overflow-hidden flex-grow"
            >
              <div class="w-full overflow-hidden relative bg-gray-100 flex items-center justify-center aspect-square">
                <img
                  :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`"
                  :alt="item.productName"
                  class="w-full h-full object-cover transition-transform duration-500"
                  @error="handleImageError"
                />
              </div>
            </router-link>

            <!-- Product Info -->
            <div class="p-4 flex flex-col flex-grow">
              <div class="mb-2 max-w-full font-roboto">
                <h3 class="text-sm sm:text-md text-gray-900 mb-1 line-clamp-2">
                  {{ item.productName }}
                </h3>
                <p class="text-xs text-gray-500 uppercase tracking-wide">
                  {{ item.category }}
                </p>
              </div>

              <!-- Rating and Color -->
              <div class="flex items-center space-x-2 mb-2 text-gray-500 text-xs">
                <!-- Stars -->
                <div class="flex items-center space-x-0.5">
                  <StarIcon
                    v-for="star in 5"
                    :key="star"
                    class="w-3 h-3 sm:w-4 sm:h-4"
                    :class="
                      star <= item.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    "
                  />
                </div>

                <!-- Viewers -->
                <div class="flex items-center space-x-1">
                  <span class="text-red-500 text-xs">{{ item.product_viewers || 0 }}</span>
                  <EyeIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>

              <!-- Price and Add to Cart -->
              <div class="mt-auto flex items-center justify-between">
                <div>
                  <span class="text-sm sm:text-lg font-bold text-gray-900">
                    ៛{{ item.price }}
                  </span>
                  <span
                    v-if="item.originalPrice"
                    class="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-400 line-through"
                  >
                    ៛{{ item.originalPrice }}
                  </span>
                </div>
                <button
                  @click.stop="addToCart(item)"
                  class="w-7 h-7 sm:w-9 sm:h-9 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Add to Cart"
                >
                  <ShoppingCartIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import navbar from "../components/navbar.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  EyeIcon,
} from "lucide-vue-next";

const carouselSlides = [
  {
    image: "https://cdn3.f-cdn.com/contestentries/989673/19886472/58e193907df0d_thumb900.jpg",
    title: "Summer Collection",
    description: "Discover our latest summer styles with up to 50% off",
    buttonText: "Shop Now",
  },
  {
    image: "https://cdn5.f-cdn.com/contestentries/989673/19886472/58e1b3f96b8e3_thumb900.jpg",
    title: "New Arrivals",
    description: "Fresh styles just landed - be the first to shop",
    buttonText: "Explore",
  },
  {
    image: "https://cdn3.f-cdn.com/contestentries/989673/19886472/58e193907df0d_thumb900.jpg",
    title: "Best Sellers",
    description: "Shop our most popular items loved by customers",
    buttonText: "View All",
  },
];

const items = ref([]);
const currentSlide = ref(0);
const cartCount = ref(0);
let carouselInterval = null;

// Fetch products
onMounted(async () => {
  try {
    const res = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/api_fecth.php"
    );
    const json = await res.json();
    if (json.status && Array.isArray(json.data)) {
      items.value = json.data.map((item) => ({ ...item, isFavorite: false }));
    } else {
      console.error("Expected array in data, got:", json);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
  startCarousel();
});

// Carousel controls
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length;
};

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? carouselSlides.length - 1
      : currentSlide.value - 1;
};

const startCarousel = () => {
  carouselInterval = setInterval(nextSlide, 5000);
};

const stopCarousel = () => {
  if (carouselInterval) clearInterval(carouselInterval);
};

// Product actions
const addToCart = (product) => {
  cartCount.value++;
  console.log("Added to cart:", product.productName);
};

const toggleFavorite = (itemId) => {
  const item = items.value.find((item) => item.pro_id === itemId);
  if (item) {
    item.isFavorite = !item.isFavorite;
  }
};

// Image error handling
const handleImageError = (event) => {
  event.target.src = "/placeholder-image.png";
};

onUnmounted(stopCarousel);
</script>

<style scoped>
/* Additional responsive styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1/1;
}
</style>