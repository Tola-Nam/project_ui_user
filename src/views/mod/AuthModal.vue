<template>
  <!-- Enhanced Cart Modal -->
  <Transition name="fade">
    <div
      v-if="showCartModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showCartModal = false"
    >
      <Transition name="pop">
        <div class="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
          <!-- Modal Header -->
          <div class="bg-gray-50 px-6 py-4 flex justify-between items-center border-b">
            <h2 class="text-xl font-bold text-gray-800">Added to Cart</h2>
            <button
              @click="showCartModal = false"
              class="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <div class="flex items-start space-x-4 mb-6">
              <div class="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  :src="selectedImage"
                  :alt="currentProduct.productName"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ currentProduct.productName }}</h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ selectedSize }} | {{ selectedColor.name }}
                </p>
                <p class="text-sm font-medium text-gray-900 mt-2">
                  ៛{{ formatPrice(currentProduct.price * quantity) }}
                </p>
                <div class="flex items-center mt-3">
                  <button 
                    @click="decreaseQuantity"
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
                    :disabled="quantity <= 1"
                  >
                    -
                  </button>
                  <span class="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                    {{ quantity }}
                  </span>
                  <button 
                    @click="increaseQuantity"
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
                    :disabled="quantity >= (currentProduct.stock || 10)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-4 border-t pt-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">៛{{ formatPrice(currentProduct.price * quantity) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium text-green-600">Free</span>
              </div>
            </div>

            <div class="border-t pt-4 flex justify-between">
              <span class="text-lg font-semibold">Total</span>
              <span class="text-lg font-bold text-gray-900">
                ៛{{ formatPrice(currentProduct.price * quantity) }}
              </span>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-6 py-4 flex flex-col space-y-3 border-t">
            <button
              @click="goToCart"
              class="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              View Cart ({{ cartItemCount }})
            </button>
            <button
              @click="continueShopping"
              class="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>

  <!-- Auth Modal -->
  <AuthModal 
    v-if="showAuthModal" 
    @close="showAuthModal = false"
    @login-success="handleLoginSuccess"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthModal from './AuthModal.vue';

const router = useRouter();

// Product data
const currentProduct = ref({
  productName: '',
  price: 0,
  stock: 10,
  // other product properties
});
const selectedImage = ref('');
const selectedSize = ref('');
const selectedColor = ref({ name: '' });
const quantity = ref(1);
const cartItemCount = ref(0);

// Modal states
const showCartModal = ref(false);
const showAuthModal = ref(false);
const isLoggedIn = ref(false);

// Format price with commas
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Fetch product details
const fetchProduct = async (pro_id) => {
  try {
    const response = await fetch(
      `http://localhost/ApplicationBackend/api/middleware/api_fetch_product_id.php?pro_id=${pro_id}`
    );

    if (!response.ok) throw new Error("Failed to fetch product");

    const data = await response.json();

    if (data.status && data.data && data.data.length > 0) {
      currentProduct.value = data.data[0];
      selectedImage.value = data.data[0].images?.[0] || '';
      // Set default size and color if available
      if (data.data[0].sizes?.length) {
        selectedSize.value = data.data[0].sizes[0];
      }
      if (data.data[0].colors?.length) {
        selectedColor.value = data.data[0].colors[0];
      }
    } else {
      throw new Error("Product not found");
    }
  } catch (err) {
    console.error("Product fetch error:", err);
    // Show error to user
  }
};

// Check authentication status
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

// Add to cart function
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
          product_id: currentProduct.value.id,
          quantity: quantity.value,
          size: selectedSize.value,
          color: selectedColor.value.id,
          price: currentProduct.value.price
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      showCartModal.value = true;
      cartItemCount.value = data.cart_count || 0;
    } else {
      throw new Error(data.message || "Failed to add to cart");
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    // Show error to user
  }
};

// Handle add to cart flow
const handleAddToCart = async () => {
  const isAuthenticated = await checkAuthStatus();

  if (!isAuthenticated) {
    showAuthModal.value = true;
    return;
  }

  await addToCart();
};

// After successful login
const handleLoginSuccess = async () => {
  showAuthModal.value = false;
  await addToCart();
};

// Navigation functions
const goToCart = () => {
  showCartModal.value = false;
  router.push('/cart');
};

const continueShopping = () => {
  showCartModal.value = false;
  // Optionally reset quantity
  quantity.value = 1;
};

// Quantity handlers
const increaseQuantity = () => {
  if (quantity.value < (currentProduct.value.stock || 10)) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Initialize with a product (you might get pro_id from route params or props)
onMounted(async () => {
  const pro_id = 1; // Replace with actual product ID
  await fetchProduct(pro_id);
  await checkAuthStatus();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease-out;
}

.pop-enter-from,
.pop-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>