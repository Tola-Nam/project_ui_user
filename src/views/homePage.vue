<template>
  <!-- Header -->
  <navbar />
  <div class="min-h-screen bg-gray-600">
    <!-- Hero Carousel -->
    <section class="relative" ref="heroSection">
      <div class="relative h-64 sm:h-80 md:h-[500px] overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div
            v-for="(slide, index) in carouselSlides"
            :key="index"
            class="w-full flex-shrink-0 relative">
            <picture>
              <source :srcset="slide.image" type="image/webp" />
              <source :srcset="slide.image" type="image/jpeg" />
              <img
                :src="slide.image"
                :alt="slide.title"
                class="w-full h-full object-cover bg-gray-700" />
            </picture>
            <div
              class="absolute inset-0 bg-opacity-40 flex items-center justify-center">
              <div
                class="text-center text-white max-w-2xl px-4 opacity-0 transform translate-y-10"
                :class="{ 'animate-fade-in-up': heroVisible }"
                :style="{ animationDelay: '500ms' }">
                <h2 class="text-4xl md:text-6xl font-bold mb-4">
                  {{ slide.title }}
                </h2>
                <p class="text-lg md:text-xl mb-8">{{ slide.description }}</p>
                <button
                  class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                  {{ slide.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all hover:scale-110">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all hover:scale-110">
          <ChevronRightIcon class="w-6 h-6" />
        </button>

        <!-- Carousel Indicators -->
        <div
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            v-for="(slide, index) in carouselSlides"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-all hover:scale-125"
            :class="
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            "></button>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-8 sm:py-12 md:py-16 bg-white" ref="productsSection">
      <div class="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto"
          ref="productsTitle">
          <span
            class="text-xl sm:text-3xl md:text-4xl opacity-0 transform -translate-x-12 w-full sm:w-auto mb-2 sm:mb-0 ml-6"
            :class="{
              'animate-slide-in-left': productsTitleVisible,
              'rgb-text-animate': productsTitleVisible,
            }"
            style="--animation-delay: 300ms">
            Featured Products
          </span>
          <router-link to="/categories"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base opacity-0 transform translate-x-12 whitespace-nowrap"
            :class="{ 'animate-slide-in-right': productsTitleVisible }"
            style="animation-delay: 200ms">
            View All
          </router-link>
        </div>

        <!-- Responsive grid - 2 cards on mobile, 4 on desktop -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          ref="productsGrid">
          <div
            v-for="(item, index) in items"
            :key="item.pro_id"
            class="relative bg-white rounded shadow hover:shadow-md transition-all duration-300 flex flex-col h-full opacity-0 transform scale-95"
            :class="{ 'animate-scale-in': productsGridVisible }"
            :style="{ animationDelay: `${index * 100}ms` }">
            <!-- Favorite Button -->
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
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  @error="handleImageError" />

                <!-- Hover overlay -->
                <div
                  class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </router-link>

            <!-- Product Info -->
            <div class="p-4 flex flex-col flex-grow bg-gray-50">
              <div class="mb-2 max-w-full font-roboto">
                <h3
                  class="text-sm sm:text-md text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {{ item.productName.toUpperCase() }}
                </h3>
                <p class="text-xs text-gray-500 uppercase tracking-wide">
                  {{ item.category.toLowerCase() }}
                </p>
              </div>

              <!-- Rating and Color -->
              <div
                class="flex items-center space-x-2 mb-2 text-gray-500 text-xs">
                <!-- Stars -->
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

                <!-- Viewers -->
                <div class="flex items-center space-x-1">
                  <span class="text-red-500 text-xs">{{
                    item.product_viewers || 0
                  }}</span>
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
                    class="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-400 line-through">
                    ៛{{ item.originalPrice }}
                  </span>
                </div>
                <button
                  @click.stop="addToCart(item)"
                  class="w-7 h-7 sm:w-9 sm:h-9 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110"
                  aria-label="Add to Cart">
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

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import navbar from "../components/navbar.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  StarIcon,
  EyeIcon,
} from "lucide-vue-next";
import FavoriteButton from "../views/mod/FavoriteButton.vue";

export default {
  components: {
    navbar,
    ChevronLeftIcon,
    ChevronRightIcon,
    ShoppingCartIcon,
    StarIcon,
    EyeIcon,
    FavoriteButton,
  },
  setup() {
    const router = useRouter();

    // Animation visibility states
    const heroVisible = ref(false);
    const productsTitleVisible = ref(false);
    const productsGridVisible = ref(false);

    // Refs for elements
    const heroSection = ref(null);
    const productsTitle = ref(null);
    const productsGrid = ref(null);

    const carouselSlides = ref([
      {
        image:
          "https://assets.wired2fish.com/uploads/2023/06/slider-grub-red-ear.webp",
        title: "Summer Collection",
        description: "Discover our latest summer styles with up to 50% off",
        buttonText: "Shop Now",
      },
      {
        image:
          "https://dt565gqrz3z7y.cloudfront.net/ce/image/DhSOI7gnvYuPjYnDRDi2Mg.jpg?f=thumb-750x421&format=webp",
        title: "New Arrivals",
        description: "Fresh styles just landed - be the first to shop",
        buttonText: "Explore",
      },
      {
        image:
          "https://www.flyfishfood.com/cdn/shop/articles/Sculpin-Sliders_1_1.jpg?v=1670463913",
        title: "Best Sellers",
        description: "Shop our most popular items loved by customers",
        buttonText: "View All",
      },
    ]);

    const items = ref([]);
    const currentSlide = ref(0);
    const cartCount = ref(0);
    let carouselInterval = null;
    let observer = null;

    // Intersection Observer for scroll animations
    const createObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.target === heroSection.value) heroVisible.value = true;
              if (entry.target === productsTitle.value)
                productsTitleVisible.value = true;
              if (entry.target === productsGrid.value)
                productsGridVisible.value = true;
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );
    };

    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/api_fecth.php"
        );
        const json = await res.json();
        // for debug items
        // console.log("Fetched products:", json);
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
      }
    };

    // Carousel controls
    const nextSlide = () => {
      currentSlide.value =
        (currentSlide.value + 1) % carouselSlides.value.length;
    };

    const previousSlide = () => {
      currentSlide.value =
        currentSlide.value === 0
          ? carouselSlides.value.length - 1
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

    const handleFavoriteToggle = ({ id, isFavorite }) => {
      items.value = items.value.map((item) =>
        item.pro_id === id ? { ...item, isFavorite } : item
      );
    };

    // Image error handling
    const handleImageError = (event) => {
      event.target.src = "/placeholder-image.png";
    };

    onMounted(() => {
      fetchProducts();
      startCarousel();

      // Start hero animation immediately
      setTimeout(() => {
        heroVisible.value = true;
      }, 300);

      // Create intersection observer
      createObserver();

      // Observe elements
      const elements = [
        heroSection.value,
        productsTitle.value,
        productsGrid.value,
      ];

      elements.forEach((element) => {
        if (element) observer.observe(element);
      });
    });

    onUnmounted(() => {
      stopCarousel();
      if (observer) {
        observer.disconnect();
      }
    });

    return {
      carouselSlides,
      items,
      currentSlide,
      cartCount,
      nextSlide,
      previousSlide,
      addToCart,
      handleFavoriteToggle,
      handleImageError,
      router,
      // Animation states
      heroVisible,
      productsTitleVisible,
      productsGridVisible,
      // Refs
      heroSection,
      productsTitle,
      productsGrid,
    };
  },
};
</script>

<style scoped>
/* Enhanced slide-in animation with bounce */
@keyframes slideInLeftBounce {
  0% {
    opacity: 0;
    transform: translateX(-48px);
  }
  70% {
    opacity: 1;
    transform: translateX(8px);
  }
  100% {
    transform: translateX(0);
  }
}

/* Smooth RGB color cycling */
@keyframes rgbCycle {
  0% {
    color: rgb(255, 99, 71);
  } /* Tomato */
  20% {
    color: rgb(75, 192, 192);
  } /* MediumAquaMarine */
  40% {
    color: rgb(153, 102, 255);
  } /* MediumPurple */
  60% {
    color: rgb(255, 159, 64);
  } /* Orange */
  80% {
    color: rgb(54, 162, 235);
  } /* DodgerBlue */
  100% {
    color: rgb(255, 99, 71);
  } /* Back to Tomato */
}

.animate-slide-in-left {
  animation: slideInLeftBounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: var(--animation-delay, 0ms);
}

.rgb-text-animate {
  animation: rgbCycle 8s ease-in-out infinite;
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    90deg,
    #ff6384,
    #36a2eb,
    #ffce56,
    #4bc0c0,
    #9966ff,
    #ff9f40
  );
  background-size: 400% 400%;
  animation: rgbGradient 12s ease infinite;
}

@keyframes rgbGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Optional: Add a subtle text shadow for better readability */
.rgb-text-animate {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Smooth transition for all animations */
span {
  transition: all 0.3s ease-out;
  will-change: transform, color;
}
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease-out forwards;
}

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

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-blue-600 {
  color: #2563eb;
}

.group:hover .group-hover\:bg-opacity-10 {
  background-opacity: 0.1;
}
</style>
