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
          @click="retryFetch"
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
            <img
              :src="selectedImage"
              :alt="currentProduct.proName"
              class="w-full h-full object-cover"
              @error="handleImageError" />
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
              <img
                :src="image"
                :alt="`Product view ${index + 1}`"
                class="w-full h-full object-cover"
                @error="handleImageError" />
            </button>
          </div>
        </div>

        <!-- Right Column - Product Details -->
        <div class="space-y-6">
          <!-- Product Info -->
          <div>
            <h1 class="text-2xl font-medium text-gray-900">
              {{ currentProduct.productName }}
            </h1>
            <p class="text-2xl font-semibold text-gray-900">
              ៛{{ currentProduct.price }}
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

              <p class="text-sm text-gray-500 mt-2">
                Selected Size: {{ selectedSize }}
              </p>
            </div>
          </div>

          <!-- Color Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div class="flex space-x-2">
              <button
                v-for="color in availableColors"
                :key="color.name"
                @click="selectedColor = color"
                class="w-8 h-8 rounded border-2 transition-colors"
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
            @click="isOpen = true"
            class="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
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
                <p v-if="detail.title === 'product code'">
                  <span class="font-medium"
                    >Item code: <TagIcon class="w-5 h-5 text-gray-500"
                  /></span>
                  {{ currentProduct.pro_id || pro_id }} +
                  {{ currentProduct.productName }}
                </p>
                <p v-if="detail.title === 'Size & fit'">
                  <span class="font-medium"
                    >Size: <RulerIcon class="w-5 h-5 text-gray-500"
                  /></span>
                  {{ currentProduct.length }}
                </p>
                <p v-if="detail.title === 'Size Guide'">
                  <SizeGuide />
                </p>
                <p v-if="detail.title === 'Category'">
                  <span class="font-medium"
                    >Category: <TagIcon class="w-5 h-5 text-gray-500"></TagIcon
                  ></span>
                  {{ currentProduct.category }} + {{ currentProduct.length }}
                </p>
                <p v-if="detail.title === 'Description'">
                  {{ currentProduct.description }}
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
                >({{ currentProduct.reviewCount }} reviews)</span
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
        <h2 class="text-xl font-medium mb-6">Similar items</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="item in similarItems"
            :key="item.id"
            class="group cursor-pointer"
            @click="goToProduct(item.id)">
            <div
              class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <button
                @click.stop="toggleFavorite(item.id)"
                class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <HeartIcon
                  class="w-4 h-4"
                  :class="
                    item.isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  " />
              </button>
            </div>
            <h3 class="text-sm font-medium">{{ item.brand }}</h3>
            <p class="text-sm text-gray-600">{{ item.name }}</p>
            <p class="text-sm font-semibold">£{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Confirmation Modal -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-opacity-50 flex items-center justify-end z-50">
      <div
        ref="printRef"
        class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Order Summary</h2>
          <button
            @click="isOpen = false"
            class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Product:</span>
            <span class="font-medium text-green-500 bg-green-50 rounded-lg"
              >&emsp;{{ currentProduct.productName }} +
              {{ currentProduct.pro_id }}&emsp;</span
            >
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600">Size:</span>
            <span class="font-medium">{{ selectedSize }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Price:</span>
            <span class="font-medium text-green-500 bg-green-50 rounded"
              >៛{{ currentProduct.price }}</span
            >
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600">Color:</span>
            <span class="font-medium">{{ selectedColor.name }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600">Quantity:</span>
            <span class="font-medium">{{ quantity }}</span>
          </div>

          <div class="border-t pt-4 flex justify-between">
            <span class="text-gray-600">Total:</span>
            <span class="font-bold"
              >៛{{ currentProduct.price * quantity }}</span
            >
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="isOpen = false"
            class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
            Close
          </button>
          <button
            @click="confirmOrder"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronDownIcon,
  StarIcon,
  HeartIcon,
  TagIcon,
  RulerIcon,
} from "lucide-vue-next";
import Swal from "sweetalert2";
import navbar from "../components/navbar.vue";
import SizeGuide from "./Size_Guide_Modal.vue";

// Route and router
const route = useRoute();
const router = useRouter();
const pro_id = route.query.pro_id;

// Component state
const loading = ref(false);
const error = ref("");
const isOpen = ref(false);
const printRef = ref(null);

// Product data
const items = ref([]);
const selectedImage = ref("");
const selectedSize = ref("M");
const selectedColor = ref({ name: "", value: "" });
const quantity = ref(1);
const openDetails = ref(["Description"]);

// Default product structure
const defaultProduct = {
  pro_id: "",
  productName: "Product Name",
  description: "Product Description",
  price: 0,
  rating: 0,
  reviewCount: 0,
  thumbnail: "",
  category: "",
  length: "",
};

// Computed properties
const currentProduct = computed(() => {
  return items.value.length > 0
    ? {
        ...defaultProduct,
        ...items.value[0],
        rating: items.value[0].rating || 4.1,
        reviewCount: items.value[0].reviewCount || 128,
      }
    : defaultProduct;
});

const productImages = computed(() => {
  const baseUrl = "http://localhost/ApplicationBackend/api/";
  if (currentProduct.value.thumbnail) {
    const mainImage = `${baseUrl}${currentProduct.value.thumbnail}`;
    return [mainImage, mainImage, mainImage, mainImage];
  }
  return [];
});

// Available options
const availableSizes = ref(["XS", "S", "M", "L", "XL", "XXL"]);
const availableColors = ref([
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
  { name: "Navy", value: "#1F2937" },
  { name: "Gray", value: "#6B7280" },
  { name: "Pink", value: "#EC4899" },
  { name: "Yellow", value: "#F59E0B" },
]);

// Product details accordion
const productDetails = [
  { title: "product code", content: "" },
  { title: "Size & fit", content: "" },
  { title: "Category", content: "" },
  { title: "Size Guide", content: "" },
  { title: "Description", content: "" },
];

// Similar items data
const similarItems = ref([
  {
    id: 1,
    brand: "Anna Field",
    name: "Basic T-shirt",
    price: "9.99",
    image: "https://via.placeholder.com/200x200/f3f4f6/9ca3af?text=T-shirt",
    isFavorite: false,
  },
  {
    id: 2,
    brand: "Anna Field",
    name: "V-neck T-shirt",
    price: "12.99",
    image: "https://via.placeholder.com/200x200/f3f4f6/9ca3af?text=V-neck",
    isFavorite: false,
  },
  {
    id: 3,
    brand: "Anna Field",
    name: "Long sleeve top",
    price: "15.99",
    image: "https://via.placeholder.com/200x200/f3f4f6/9ca3af?text=Long+sleeve",
    isFavorite: false,
  },
  {
    id: 4,
    brand: "Anna Field",
    name: "Striped T-shirt",
    price: "14.99",
    image: "https://via.placeholder.com/200x200/f3f4f6/9ca3af?text=Striped",
    isFavorite: false,
  },
]);

// Lifecycle hooks
onMounted(async () => {
  await fetchProduct();
  // Set default selections after product is loaded
  if (productImages.value.length > 0) {
    selectedImage.value = productImages.value[0];
  }
  selectedColor.value = availableColors.value[0];
});

// Methods
const fetchProduct = async () => {
  if (!pro_id) {
    error.value = "Product ID is required";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const res = await fetch(
      `http://localhost/ApplicationBackend/api/middleware/api_fetch_product_id.php?pro_id=${pro_id}`
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json = await res.json();

    if (json.status && Array.isArray(json.data) && json.data.length > 0) {
      items.value = json.data;
    } else {
      error.value = "Product not found";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = "Failed to load product data";
  } finally {
    loading.value = false;
  }
};

const retryFetch = () => {
  fetchProduct();
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
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const toggleFavorite = (itemId) => {
  const item = similarItems.value.find((item) => item.id === itemId);
  if (item) {
    item.isFavorite = !item.isFavorite;
  }
};

const goToProduct = (itemId) => {
  router.push({ path: route.path, query: { pro_id: itemId } });
};

const handleImageError = (event) => {
  event.target.src =
    "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=No+Image";
};

const confirmOrder = () => {
  Swal.fire({
    icon: "success",
    title: "Order Confirmed!",
    text: `Your order for ${quantity.value} x ${currentProduct.value.productName} has been placed.`,
    confirmButtonText: "OK",
  });
  isOpen.value = false;
  quantity.value = 1;
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
</style>
