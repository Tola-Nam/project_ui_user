<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
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
                >{{ cartCount }}</span
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

    <!-- Hero Carousel -->
    <section class="relative">
      <div class="relative h-96 md:h-[500px] overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div
            v-for="(slide, index) in carouselSlides"
            :key="index"
            class="w-full flex-shrink-0 relative">
            <img
              :src="slide.image"
              :alt="slide.title"
              class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-center text-white max-w-2xl px-4">
                <h2 class="text-4xl md:text-6xl font-bold mb-4">
                  {{ slide.title }}
                </h2>
                <p class="text-lg md:text-xl mb-8">{{ slide.description }}</p>
                <button
                  class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {{ slide.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all">
          <ChevronRightIcon class="w-6 h-6" />
        </button>

        <!-- Carousel Indicators -->
        <div
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            v-for="(slide, index) in carouselSlides"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-all"
            :class="
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            "></button>
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

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="item in items"
            :key="item.pro_id"
            class="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <router-link
              :to="{ path: 'card', query: { pro_id: item.pro_id } }"
              class="relative">
              <img
                :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`"
                :alt="item.productName"
                class="w-full object-fit-cover group-hover:scale-105 transition-transform duration-300" />
              <div
                class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                SALE
              </div>
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div class="flex space-x-2">
                  <button
                    @click="quickView(item)"
                    class="bg-white text-gray-800 px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                    Quick View
                  </button>
                  <button
                    @click="addToCart(item)"
                    class="bg-gray-900 text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </router-link>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ item.productName }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">{{ item.category }}</p>
              <div class="flex items-center mb-2">
                <div class="flex items-center">
                  <StarIcon
                    v-for="star in 5"
                    :key="star"
                    class="w-4 h-4"
                    :class="
                      star <= item.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    " />
                </div>
                <span class="text-sm text-gray-500 ml-1"
                  >({{ item.color }})</span
                >
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-xl font-bold text-gray-900"
                    >${{ item.price }}</span
                  >
                  <span
                    v-if="item.originalPrice"
                    class="text-sm text-gray-500 line-through"
                    >${{ item.originalPrice }}</span
                  >
                </div>
                <button
                  @click="addToCart(item)"
                  class="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <ShoppingCartIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Shop by Category
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="category in categories"
            :key="category.id"
            class="relative group cursor-pointer overflow-hidden rounded-lg">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div
              class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
              <h3 class="text-white text-2xl font-bold">{{ category.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import modal from "../views/modal.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  ShoppingCartIcon,
  StarIcon,
  MessageSquare,
} from "lucide-vue-next";

const modalRef = ref();

function showModal() {
  modalRef.value?.openModal();
}

const carouselSlides = [
  {
    image:
      "https://cdn3.f-cdn.com/contestentries/989673/19886472/58e193907df0d_thumb900.jpg",
    title: "Summer Collection",
    description: "Discover our latest summer styles with up to 50% off",
    buttonText: "Shop Now",
  },
  {
    image:
      "https://cdn5.f-cdn.com/contestentries/989673/19886472/58e1b3f96b8e3_thumb900.jpg",
    title: "New Arrivals",
    description: "Fresh styles just landed - be the first to shop",
    buttonText: "Explore",
  },
  {
    image:
      "https://cdn3.f-cdn.com/contestentries/989673/19886472/58e193907df0d_thumb900.jpg",
    title: "Best Sellers",
    description: "Shop our most popular items loved by customers",
    buttonText: "View All",
  },
];

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=256&width=400",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/placeholder.svg?height=256&width=400",
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "/placeholder.svg?height=256&width=400",
  },
];

const items = ref([]);
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
});

const currentSlide = ref(0);
const cartCount = ref(3);
const email = ref("");
let carouselInterval = null;

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

const addToCart = (product) => {
  cartCount.value++;
  console.log("Added to cart:", product.productName);
};

const quickView = (product) => {
  console.log("Quick view:", product.productName);
};

const subscribe = () => {
  if (email.value) {
    console.log("Subscribed:", email.value);
    email.value = "";
  }
};

onMounted(startCarousel);
onUnmounted(stopCarousel);
</script>
