<template>
  <div class="min-h-screen bg-white">
    <navbar />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p class="text-gray-600">{{ error }}</p>
        <button
          @click="fetchProduct"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Retry
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Product Images -->
        <div class="space-y-4">
          <!-- Main Product Image -->
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <picture>
              <img
                :src="selectedImage"
                :alt="currentProduct.productName"
                class="w-full h-full object-cover"
                @error="handleImageError" />
            </picture>
          </div>

          <!-- Thumbnail Images -->
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="(image, index) in productImages"
              :key="index"
              @click="selectedImage = image"
              class="aspect-square bg-gray-100 rounded border-2 overflow-hidden transition-colors"
              :class="
                selectedImage === image
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300'
              ">
              <picture>
                <img
                  :src="image"
                  :alt="`Product view ${index + 1}`"
                  class="w-full h-full object-cover"
                  @error="handleImageError" />
              </picture>
            </button>
          </div>
        </div>

        <!-- Right Column - Product Details -->
        <div class="space-y-6">
          <!-- Product Info -->
          <div>
            <h1 class="text-2xl font-medium text-gray-900">
              {{ currentProduct.productName.toUpperCase() }}
            </h1>

            <p class="text-2xl font-semibold text-gray-900">
              ៛{{ formatPrice(currentProduct.price) }}
            </p>
          </div>

          <!-- Size Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Size</h3>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="size in availableSizes"
                :key="size"
                @click="selectedSize = size"
                class="py-2 px-3 text-sm border rounded transition-colors"
                :class="
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                ">
                {{ size }}
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Selected Size: {{ selectedSize }}
            </p>
          </div>

          <!-- Color Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div class="flex space-x-2">
              <button
                v-for="color in availableColors"
                :key="color.name"
                @click="selectedColor = color"
                class="w-8 h-8 rounded border-2 shadow-none transition-colors"
                :style="{ backgroundColor: color.value }"
                :class="
                  selectedColor.name === color.name
                    ? 'border-black'
                    : 'border-gray-300 hover:border-gray-400'
                "
                :title="color.name"></button>
            </div>
          </div>

          <!-- Quantity Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div class="flex items-center space-x-3">
              <button
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
                class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                -
              </button>
              <span class="text-lg font-medium">{{ quantity }}</span>
              <button
                @click="increaseQuantity"
                class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                +
              </button>
            </div>
          </div>

          <button
            @click="handleAddToCart"
            class="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors">
            Add to bag
          </button>

          <!-- Product Details Accordion -->
          <div class="space-y-2">
            <div
              v-for="detail in productDetails"
              :key="detail.title"
              class="border-b border-gray-200">
              <button
                @click="toggleDetail(detail.title)"
                class="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors">
                <span class="font-medium">{{ detail.title }}</span>
                <ChevronDownIcon
                  class="w-5 h-5 transition-transform"
                  :class="
                    openDetails.includes(detail.title) ? 'rotate-180' : ''
                  " />
              </button>
              <div
                v-if="openDetails.includes(detail.title)"
                class="pb-4 text-sm text-gray-600 animate-fade-in">
                <p v-if="detail.title === 'Product Code'">
                  <span class="font-medium">Item code:</span>
                  {{ currentProduct.pro_id }} + {{ currentProduct.productName }}
                </p>
                <p v-if="detail.title === 'Size & Fit'">
                  <span class="font-medium">Size:</span>
                  {{ currentProduct.length || "Not specified" }}
                </p>
                <p v-if="detail.title === 'Size Guide'">
                  <SizeGuide />
                </p>
                <p v-if="detail.title === 'Category'">
                  <span class="font-medium">Category:</span>
                  {{ currentProduct.category || "Not specified" }}
                </p>
                <p v-if="detail.title === 'Description'" class="text-gray-700">
                  {{ currentProduct.description.toLowerCase() || "No description available" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="border-t pt-6">
            <div class="flex items-center space-x-2 mb-4">
              <div class="flex items-center">
                <StarIcon
                  v-for="star in 5"
                  :key="star"
                  class="w-4 h-4"
                  :class="
                    star <= Math.floor(currentProduct.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  " />
              </div>
              <span class="text-sm text-gray-600"
                >{{ currentProduct.rating }}/5</span
              >
              <span class="text-sm text-gray-500"
                >({{ currentProduct.reviewCount || 0 }} reviews)</span
              >
            </div>
            <button class="text-sm text-blue-600 hover:underline">
              Read all reviews
            </button>
          </div>
        </div>
      </div>

      <!-- Similar Items Section -->
      <div class="mt-16">
        <h2 class="text-2xl mb-6 text-gray-800">You Might Also Like</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 border-0">
          <div
            v-for="product in similarProducts"
            :key="product.pro_id"
            class="group cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-gray-50 shadow"
            @click="goToProduct(product.pro_id)">
            <div class="relative">
              <!-- Product Image -->
              <div
                class="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3">
                <picture>
                  <img
                    :src="getImageUrl(product.thumbnail)"
                    :alt="product.productName"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    @error="handleImageError" />
                </picture>
              </div>

              <!-- Favorite Button -->
              <button
                @click.stop="toggleFavorite(product.pro_id)"
                class="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                <HeartIcon
                  class="w-4 h-4 transition-colors"
                  :class="
                    product.isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-500 group-hover:text-red-400'
                  " />
              </button>
            </div>

            <!-- Product Info -->
            <div class="px-1 py-2">
              <h3 class="text-sm font-semibold text-gray-900 line-clamp-1">
                {{ product.productName.toUpperCase() }}
              </h3>
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-gray-500">{{ product.category.toLowerCase() }}</p>
                <span class="text-xs text-red-400 flex items-center">
                  {{ product.product_viewers || 0 }}
                  <EyeIcon class="w-4 h-4 ml-1 text-gray-500" />
                </span>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-bold text-gray-900">
                  ៛{{ formatPrice(product.price) }}
                </p>
                <div class="flex items-center">
                  <StarIcon class="w-3 h-3 text-yellow-400 fill-current" />
                  <span class="text-xs text-gray-500 ml-1">{{
                    product.rating || "4.5"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Authentication Required Modal -->
    <div
      v-if="showAuthModal"
      class="fixed inset-0 bg-opacity-100 shadow-lg flex items-center justify-center z-50">
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg text-center text-gray-800">
            Login Required to check out items
          </h3>
          <button
            @click="showAuthModal = false"
            class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p class="mb-6 text-sm text-gray-600 text-center">
          You need to login or register to add items to your cart.
        </p>
        <div class="flex space-x-3">
          <button
            @click="goToLogin"
            class="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>
          <button
            @click="goToRegister"
            class="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-100">
            Register
          </button>
        </div>
      </div>
    </div>

    <!-- Order Confirmation Modal -->
    <div
      v-if="showCartModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Added to Cart</h2>
          <button
            @click="showCartModal = false"
            class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="w-20 h-20 bg-gray-100 rounded overflow-hidden">
              <img
                :src="selectedImage"
                :alt="currentProduct.productName"
                class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="font-medium">{{ currentProduct.productName }}</h3>
              <p class="text-sm text-gray-600">
                {{ selectedSize }} | {{ selectedColor.name }}
              </p>
              <p class="text-sm font-medium">
                ៛{{ formatPrice(currentProduct.price * quantity) }}
              </p>
            </div>
          </div>

          <div class="border-t pt-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium"
                >៛{{ formatPrice(currentProduct.price * quantity) }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">Free</span>
            </div>
          </div>

          <div class="border-t pt-4 flex justify-between">
            <span class="text-gray-600">Total</span>
            <span class="font-bold"
              >៛{{ formatPrice(currentProduct.price * quantity) }}</span
            >
          </div>
        </div>

        <div class="mt-6 flex flex-col space-y-3">
          <button
            @click="goToCart"
            class="w-full py-2 bg-black text-white rounded hover:bg-gray-800">
            View Cart
          </button>
          <button
            @click="continueShopping"
            class="w-full py-2 border border-gray-300 rounded hover:bg-gray-100">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronDownIcon, StarIcon, HeartIcon, EyeIcon } from "lucide-vue-next";
import Swal from "sweetalert2";
import navbar from "../components/navbar.vue";
import SizeGuide from "./Size_Guide_Modal.vue";

export default {
  components: {
    navbar,
    ChevronDownIcon,
    StarIcon,
    HeartIcon,
    EyeIcon,
    SizeGuide,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pro_id = route.query.pro_id;
    const category = route.query.category;

    // Component state
    const loading = ref(true);
    const error = ref("");
    const showCartModal = ref(false);
    const showAuthModal = ref(false);
    const isLoggedIn = ref(false);

    // Product data
    const currentProduct = ref({});
    const similarProducts = ref([]);
    const selectedImage = ref("");
    const selectedSize = ref("M");
    const selectedColor = ref({ name: "Black", value: "#000000" });
    const quantity = ref(1);
    const openDetails = ref(["Description"]);

    // Available options
    const availableSizes = ref(["XS", "S", "M", "L", "XL", "XXL"]);
    const availableColors = ref([
      // 1. Essential Neutrals (3 colors)
      { name: "Pure White", value: "#FFFFFF" }, // For backgrounds
      { name: "Deep Black", value: "#000000" }, // For text and accents
      { name: "Warm Gray", value: "#6B7280" }, // Secondary text

      // 2. Core Brand Color (1 color)
      { name: "Asale Red", value: "#E11D48" }, // Primary brand color (for CTAs/sales)

      // 3. Complementary Accents (3 colors)
      { name: "Ocean Blue", value: "#0284C7" }, // Cool contrast to red
      { name: "Mustard Yellow", value: "#F59E0B" }, // Vibrant accent
      { name: "Forest Green", value: "#15803D" },
    ]);

    const productDetails = [
      { title: "Product Code" },
      { title: "Size & Fit" },
      { title: "Size Guide" },
      { title: "Category" },
      { title: "Description" },
    ];

    const productImages = computed(() => {
      if (currentProduct.value.thumbnail) {
        const mainImage = getImageUrl(currentProduct.value.thumbnail);
        return [mainImage, mainImage, mainImage, mainImage];
      }
      return [
        "https://via.placeholder.com/600x600/f3f4f6/9ca3af?text=No+Image",
      ];
    });

    const formatPrice = (price) => {
      return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
    };

    const getImageUrl = (thumbnail) => {
      return `http://localhost/ApplicationBackend/api/${thumbnail}`;
    };

    const fetchProduct = async () => {
      try {
        loading.value = true;
        const response = await fetch(
          `http://localhost/ApplicationBackend/api/middleware/api_fetch_product_id.php?pro_id=${pro_id}`
        );

        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();

        if (data.status && data.data && data.data.length > 0) {
          currentProduct.value = data.data[0];
          selectedImage.value = productImages.value[0];
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        if (!category) return;

        const response = await fetch(
          `http://localhost/ApplicationBackend/api/middleware/api_fecth_category.php?category=${category}`
        );
        const data = await response.json();

        if (data.status && data.data) {
          similarProducts.value = data.data
            .filter((product) => product.pro_id !== pro_id)
            .map((product) => ({
              ...product,
              isFavorite: false,
            }));
        }
      } catch (err) {
        console.error("Failed to fetch similar products:", err);
      }
    };

    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/check_auth.php",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        isLoggedIn.value = data.authenticated;
        return data.authenticated;
      } catch (error) {
        console.error("Auth check failed:", error);
        isLoggedIn.value = false;
        return false;
      }
    };

    const handleAddToCart = async () => {
      const isAuthenticated = await checkAuthStatus();

      if (!isAuthenticated) {
        showAuthModal.value = true;
        return;
      }

      await addToCart();
    };

    const addToCart = async () => {
      try {
        const response = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/add_to_cart.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              product_id: currentProduct.value.pro_id,
              quantity: quantity.value,
              size: selectedSize.value,
              color: selectedColor.value.name,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          showCartModal.value = true;
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to add to cart",
            text: result.message || "Please try again",
          });
        }
      } catch (error) {
        console.error("Cart error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add item to cart",
        });
      }
    };

    const toggleDetail = (title) => {
      const index = openDetails.value.indexOf(title);
      if (index > -1) {
        openDetails.value.splice(index, 1);
      } else {
        openDetails.value.push(title);
      }
    };

    const increaseQuantity = () => {
      if (quantity.value < (currentProduct.value.stock || 10)) {
        quantity.value++;
      } else {
        Swal.fire({
          icon: "error",
          title: "Out of Stock",
          text: "This item is currently out of stock.",
          confirmButtonText: "OK",
        });
      }
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const toggleFavorite = (productId) => {
      const product = similarProducts.value.find((p) => p.pro_id === productId);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    };

    const goToProduct = (productId) => {
      router.push({
        path: "/product",
        query: {
          pro_id: productId,
          category: category,
        },
      });
    };

    const goToLogin = () => {
      router.push("/AuthView");
      showAuthModal.value = false;
    };

    const goToRegister = () => {
      router.push("/Registration");
      showAuthModal.value = false;
    };

    const goToCart = () => {
      router.push("/check_out");
      showCartModal.value = false;
    };

    const continueShopping = () => {
      showCartModal.value = false;
    };

    const handleImageError = (event) => {
      event.target.src =
        "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=No+Image";
    };

    onMounted(() => {
      fetchProduct();
      fetchSimilarProducts();
      checkAuthStatus();
    });

    return {
      loading,
      error,
      showCartModal,
      showAuthModal,
      currentProduct,
      similarProducts,
      selectedImage,
      selectedSize,
      selectedColor,
      quantity,
      openDetails,
      availableSizes,
      availableColors,
      productDetails,
      productImages,
      formatPrice,
      getImageUrl,
      fetchProduct,
      toggleDetail,
      increaseQuantity,
      decreaseQuantity,
      toggleFavorite,
      goToProduct,
      handleImageError,
      handleAddToCart,
      goToCart,
      continueShopping,
      goToLogin,
      goToRegister,
    };
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rotate-180 {
  transform: rotate(180deg);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1/1;
}
</style>
