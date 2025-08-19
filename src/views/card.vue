<template>
  <navbar />
  <div class="min-h-screen bg-white">
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
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
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
                :alt="currentProduct.productName || 'Product Image'"
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
              {{ currentProduct.productName?.toUpperCase() || "PRODUCT NAME" }}
            </h1>
            <p class="text-2xl font-semibold text-gray-900 mt-2">
              ៛{{ formatPrice(currentProduct.price || 0) }}
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
            <div class="flex space-x-2 flex-wrap gap-2">
              <button
                v-for="color in availableColors"
                :key="color.name"
                @click="selectedColor = color"
                class="w-8 h-8 rounded-full border-2 shadow-sm transition-all hover:scale-110"
                :style="{ backgroundColor: color.value }"
                :class="
                  selectedColor.name === color.name
                    ? 'border-black ring-2 ring-gray-300'
                    : 'border-gray-300 hover:border-gray-400'
                "
                :title="color.name"></button>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Selected Color: {{ selectedColor.name }}
            </p>
          </div>

          <!-- Quantity Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div class="flex items-center space-x-3">
              <button
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
                class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="text-lg font-medium min-w-[3rem] text-center">{{
                quantity
              }}</span>
              <button
                @click="increaseQuantity"
                class="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <button
            @click="handleAddToCart(currentProduct.pro_id)"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="loading" class="animate-pulse"> Adding... </span>

            <span v-else class="flex items-center gap-2">
              <ShoppingCartIcon class="w-5 h-5 sm:w-6 sm:h-6" /> Order Now
            </span>
          </button>

          <!-- Product Details Accordion -->
          <div class="space-y-2">
            <div
              v-for="detail in productDetails"
              :key="detail.title"
              class="border-b border-gray-200">
              <button
                @click="toggleDetail(detail.title)"
                class="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors rounded-lg px-2">
                <span class="font-medium">{{ detail.title }}</span>
                <ChevronDownIcon
                  class="w-5 h-5 transition-transform duration-200"
                  :class="
                    openDetails.includes(detail.title) ? 'rotate-180' : ''
                  " />
              </button>
              <div
                v-if="openDetails.includes(detail.title)"
                class="pb-4 px-2 text-sm text-gray-600 animate-fade-in">
                <p v-if="detail.title === 'Product Code'">
                  <span class="font-medium">Item code:</span>
                  {{ currentProduct.pro_id || "N/A" }} -
                  {{ currentProduct.productName || "N/A" }}
                </p>
                <p v-if="detail.title === 'Size & Fit'">
                  <span class="font-medium">Size:</span>
                  {{
                    currentProduct.length ||
                    "Standard sizing - see size guide for details"
                  }}
                </p>
                <div v-if="detail.title === 'Size Guide'">
                  <SizeGuide v-if="showSizeGuide" />
                  <button
                    @click="showSizeGuide = !showSizeGuide"
                    class="text-blue-600 hover:underline text-sm">
                    {{ showSizeGuide ? "Hide" : "View" }} Size Guide
                  </button>
                </div>
                <p v-if="detail.title === 'Category'">
                  <span class="font-medium">Category:</span>
                  {{ currentProduct.category || "General" }}
                </p>
                <p
                  v-if="detail.title === 'Description'"
                  class="text-gray-700 leading-relaxed">
                  {{
                    currentProduct.description ||
                    "High-quality product with excellent craftsmanship and attention to detail."
                  }}
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
                    star <= Math.floor(currentProduct.rating || 4.5)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  " />
              </div>
              <span class="text-sm text-gray-600"
                >{{ currentProduct.rating || 4.5 }}/5</span
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
        <h2 class="text-2xl mb-6 text-gray-800 font-semibold">
          You Might Also Like
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="product in similarProducts"
            :key="product.pro_id"
            class="group cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-gray-50 rounded-lg shadow hover:shadow-lg"
            @click="goToProduct(product.pro_id)">
            <div class="relative">
              <!-- Product Image -->
              <div
                class="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
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
            <div class="px-3 py-2">
              <h3 class="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                {{ product.productName?.toUpperCase() || "PRODUCT NAME" }}
              </h3>
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-gray-500 capitalize">
                  {{ product.category?.toLowerCase() || "general" }}
                </p>
                <span class="text-xs text-red-400 flex items-center">
                  {{ product.product_viewers || 0 }}
                  <EyeIcon class="w-3 h-3 ml-1 text-gray-500" />
                </span>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-bold text-gray-900">
                  ៛{{ formatPrice(product.price || 0) }}
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
    <Teleport to="body">
      <div
        v-if="showAuthModal"
        class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Login Required</h3>
            <button
              @click="showAuthModal = false"
              class="text-gray-500 hover:text-gray-700 text-2xl leading-none">
              &times;
            </button>
          </div>
          <p class="mb-6 text-sm text-gray-600 text-center">
            You need to login or register to add items to your cart.
          </p>
          <div class="flex space-x-3">
            <button
              @click="goToLogin"
              class="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Login
            </button>
            <button
              @click="goToRegister"
              class="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Register
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Order Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showCartModal"
        class="fixed inset-0 bg-opacity-50 flex items-center justify-end shadow-lg z-50 p-4">
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Added to Cart</h2>
            <button
              @click="showCartModal = false"
              class="text-gray-500 hover:text-gray-700 text-2xl leading-none">
              ✕
            </button>
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div
                class="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  :src="selectedImage"
                  :alt="currentProduct.productName"
                  class="w-full h-full object-cover" />
              </div>
              <div class="flex-grow">
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
                <span class="font-medium text-green-600">Free</span>
              </div>
            </div>

            <div class="border-t pt-4 flex justify-between">
              <span class="text-gray-600">Total</span>
              <span class="font-bold text-lg"
                >៛{{ formatPrice(currentProduct.price * quantity) }}</span
              >
            </div>
          </div>

          <div class="mt-6 flex flex-col space-y-3">
            <!-- <button
              @click="goToCart"
              class="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
              View Cart
            </button>
            <button
              @click="continueShopping"
              class="w-full py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Continue Shopping
            </button> -->
            <button
              @click="sendMessage"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Send to Telegram
            </button>
            <p
              v-if="status"
              class="mt-4 text-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 shadow-sm"
              :class="
                status.includes(
                  'now ypu order successfully please thank you and good luck!!'
                )
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              ">
              {{ status }}
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronDownIcon,
  StarIcon,
  HeartIcon,
  EyeIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-vue-next";
import Swal from "sweetalert2";
import navbar from "../components/navbar.vue";
import SizeGuide from "./Size_Guide_Modal.vue";

export default {
  name: "ProductPage",
  components: {
    navbar,
    ChevronDownIcon,
    StarIcon,
    HeartIcon,
    EyeIcon,
    MinusIcon,
    PlusIcon,
    SizeGuide,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pro_id = route.query.pro_id;
    const category = route.query.category;

    // Component state
    const loading = ref(false);
    const error = ref("");
    const showCartModal = ref(false);
    const showAuthModal = ref(false);
    const showSizeGuide = ref(false);
    const isLoggedIn = ref(false);
    const status = ref("");
    const user = ref(null);

    // Product data
    const currentProduct = ref({
      pro_id: "DEMO001",
      productName: "Premium Cotton T-Shirt",
      price: 25000,
      description:
        "High-quality cotton t-shirt with comfortable fit and durable construction. Perfect for everyday wear with a modern cut that flatters all body types.",
      category: "Clothing",
      rating: 4.5,
      reviewCount: 128,
      thumbnail:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      stock: 15,
      length: "Regular fit - see size guide",
    });

    const similarProducts = ref([
      {
        pro_id: "DEMO002",
        productName: "Classic Polo Shirt",
        price: 35000,
        category: "Clothing",
        rating: 4.3,
        product_viewers: 89,
        thumbnail:
          "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
        isFavorite: false,
      },
      {
        pro_id: "DEMO003",
        productName: "Casual Hoodie",
        price: 45000,
        category: "Clothing",
        rating: 4.7,
        product_viewers: 156,
        thumbnail:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        isFavorite: false,
      },
      {
        pro_id: "DEMO004",
        productName: "Denim Jacket",
        price: 65000,
        category: "Clothing",
        rating: 4.4,
        product_viewers: 203,
        thumbnail:
          "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop",
        isFavorite: true,
      },
      {
        pro_id: "DEMO005",
        productName: "Sport Shorts",
        price: 28000,
        category: "Clothing",
        rating: 4.2,
        product_viewers: 67,
        thumbnail:
          "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
        isFavorite: false,
      },
    ]);

    const selectedImage = ref("");
    const selectedSize = ref("M");
    const selectedColor = ref({ name: "Black", value: "#000000" });
    const quantity = ref(1);
    const openDetails = ref(["Description"]);
    const responseMessage = ref("");

    // Example order data
    const order = ref({
      phone_number: "",
      name: "nam tola",
      product: "",
      color: "",
      size: "",
      quantity:"" ,
      price: "",
      subtotal: "",
      shipping: "",
      total: "",
    });

    // Available options
    const availableSizes = ref(["XS", "S", "M", "L", "XL", "XXL"]);
    const availableColors = ref([
      { name: "Pure White", value: "#FFFFFF" },
      { name: "Deep Black", value: "#000000" },
      { name: "Warm Gray", value: "#6B7280" },
      { name: "Asale Red", value: "#E11D48" },
      { name: "Ocean Blue", value: "#0284C7" },
      { name: "Mustard Yellow", value: "#F59E0B" },
      { name: "Forest Green", value: "#15803D" },
    ]);

    const productDetails = [
      { title: "Product Code" },
      { title: "Size & Fit" },
      { title: "Size Guide" },
      { title: "Category" },
      { title: "Description" },
    ];

    // Computed properties
    const productImages = computed(() => {
      if (currentProduct.value.thumbnail) {
        const mainImage = getImageUrl(currentProduct.value.thumbnail);
        return [mainImage, mainImage, mainImage, mainImage];
      }
      return [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      ];
    });

    // Methods
    const formatPrice = (price) => {
      return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
    };

    const getImageUrl = (thumbnail) => {
      if (thumbnail?.startsWith("http")) {
        return thumbnail;
      }
      return `http://localhost/ApplicationBackend/api/${thumbnail}`;
    };

    const fetchProduct = async () => {
      if (!pro_id) {
        // Demo mode - use default product
        selectedImage.value = productImages.value[0];
        return;
      }

      try {
        loading.value = true;
        error.value = "";

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
        console.error("Fetch product error:", err);
      } finally {
        loading.value = false;
      }
    };

    const fetchSimilarProducts = async () => {
      if (!category) return;

      try {
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
        const authenticated = data.logged_in === true;
        isLoggedIn.value = authenticated;
        return authenticated;
      } catch (error) {
        console.error("Auth check failed:", error);
        isLoggedIn.value = false;
        return false;
      }
    };

    const handleAddToCart = async (pro_id) => {
      const isAuthenticated = await checkAuthStatus();

      if (!isAuthenticated) {
        showAuthModal.value = true;
        return;
      }

      await addToCart();
    };

    const addToCart = async () => {
      try {
        loading.value = true;

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
              pro_id: currentProduct.value.pro_id,
            }),
          }
        );

        const result = await response.json();
        console.log(result);
        if (result) {
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
      } finally {
        loading.value = false;
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
      const maxStock = currentProduct.value.stock || 10;
      if (quantity.value < maxStock) {
        quantity.value++;
      } else {
        Swal.fire({
          icon: "warning",
          title: "Stock Limit Reached",
          text: `Maximum available quantity is ${maxStock}`,
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
      router.push({
        path: "/AuthView",
        query: { page: "card" },
      });
      showAuthModal.value = false;
    };

    // const goToLogin = () => {
    //   router.push("/AuthView");
    //   showAuthModal.value = false;
    // };

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
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop";
    };

    onMounted(async () => {
      try {
        const res = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/get_profile_user.php",
          {
            method: "GET",
            credentials: "include", // important! keeps session
          }
        );
        const data = await res.json();
        //~ debug user
        // console.log(data);
        if (data) {
          user.value = data.user;
        } else {
          console.warn("Not logged in");
        }
      } catch (err) {
        console.error("Fetch user failed", err);
      }
    });

    const sendMessage = async () => {
      if (!currentProduct.value) return;

      const messageData = {
        order: "New Order Added to Cart",
        user:
          `${user.value?.First_name || ""} ${
            user.value?.Last_name || ""
          }`.trim() || "Guest",
        phone: user.value?.Phone_number || "N/A",
        product: currentProduct.value.productName,
        color: selectedColor.value?.name || "N/A",
        size: selectedSize.value || "N/A",
        quantity: quantity.value || 1,
        code: currentProduct.value.pro_id || null,
        price: `៛${formatPrice(currentProduct.value.price)}`,
        subtotal: `៛${formatPrice(
          currentProduct.value.price * quantity.value
        )}`,
        shipping: "Free",
        total: `៛${formatPrice(currentProduct.value.price * quantity.value)}`,
      };
      //! debug data
      // console.log(messageData);

      try {
        const response = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/config.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageData),
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.ok) {
          Swal.fire({
            title: "Order Successfully!!",
            icon: "success",
            draggable: true,
          });
          status.value =
            "now ypu order successfully please thank you and good luck!!";
          setTimeout(() => (status.value = ""), 3000);
        } else {
          status.value = `Failed to send ❌: ${data.description || data.error}`;
        }
      } catch (error) {
        status.value = "Error: " + error.message;
        console.error("Telegram send error:", error);
      }
    };

    // Lifecycle
    onMounted(() => {
      fetchProduct();
      fetchSimilarProducts();
      checkAuthStatus();
    });

    return {
      // State
      loading,
      error,
      showCartModal,
      showAuthModal,
      showSizeGuide,
      status,

      // Product data
      currentProduct,
      similarProducts,
      selectedImage,
      selectedSize,
      selectedColor,
      quantity,
      openDetails,

      // Options
      availableSizes,
      availableColors,
      productDetails,
      productImages,

      // Methods
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
      sendMessage,
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

/* Loading spinner animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:text-red-400 {
  color: #f87171;
}

/* Transition improvements */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Custom scrollbar for modals */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Focus states for accessibility */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Improved button states */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Color picker improvements */
.w-8.h-8.rounded-full {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.w-8.h-8.rounded-full:hover {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2),
    0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Rating stars */
.fill-current {
  fill: currentColor;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .grid-cols-6 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .aspect-square {
    aspect-ratio: 1/1;
  }

  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

/* Modal backdrop blur effect */
.fixed.inset-0.bg-black.bg-opacity-50 {
  backdrop-filter: blur(2px);
}

/* Product card hover effects */
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

/* Smooth color transitions for color picker */
.rounded-full.border-2.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Image loading placeholder */
img[src=""],
img:not([src]) {
  background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
