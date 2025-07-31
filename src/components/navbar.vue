<template>
  <header class="bg-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex items-center">
          <div class="flex items-center space-x-2">
            <div class="relative w-8 h-8 rounded-full overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <img
                src="https://thumbs.dreamstime.com/b/lets-shopping-logo-design-template-shop-icon-135610500.jpg"
                alt="Shop Logo"
                class="absolute inset-0 w-full h-full object-cover opacity-80" />
            </div>
            <span
              class="text-lg font-bold italic text-sm text-center rainbow-animate"
              >Let's Shop</span
            >
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >Home</router-link
          >
          <router-link
            to="/products"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >Products</router-link
          >
          <router-link
            to="/about"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >About</router-link
          >
          <router-link
            to="/contact"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >Contact</router-link
          >
        </nav>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <button
            class="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <SearchIcon class="w-5 h-5" />
          </button>

          <!-- Shopping Cart -->
          <button
            class="text-gray-700 hover:text-gray-900 relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ShoppingCartIcon class="w-5 h-5" />
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {{ cartCount }}
            </span>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative" ref="profileDropdown">
            <button
              @click="toggleProfileMenu"
              class="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200">
              <!-- Avatar with Online Status -->
              <div class="relative">
                <img
                  :src="user.avatar || '/placeholder.svg?height=32&width=32'"
                  :alt="user.name"
                  class="w-8 h-8 rounded-full object-cover border-2 border-gray-200" />
                <div
                  class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                  :class="{
                    'bg-green-400': userStatus,
                    'bg-gray-400': !userStatus,
                  }"></div>
              </div>

              <!-- Username and Role -->
              <div class="hidden sm:block text-left">
                <div class="text-sm font-medium text-gray-900">
                  {{ user.name }}
                </div>
                <div class="text-xs text-gray-500">{{ user.role }}</div>
              </div>

              <!-- Dropdown Arrow -->
              <ChevronDownIcon
                class="w-4 h-4 text-gray-500 transition-transform duration-200"
                :class="{ 'rotate-180': isProfileMenuOpen }" />
            </button>

            <!-- Profile Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div
                v-if="isProfileMenuOpen"
                class="fixed right-4 top-16 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <!-- User Info Header -->
                <div class="px-4 py-3 border-b border-gray-100">
                  <div class="flex items-center space-x-3">
                    <img
                      :src="
                        user.avatar ||
                        'https://www.pawlovetreats.com/cdn/shop/articles/pembroke-welsh-corgi-puppy_1000x.jpg?v=1628638716'
                      "
                      :alt="user.name"
                      class="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div class="font-medium text-gray-900">
                        {{ user.name }}
                      </div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                      <div class="text-xs text-blue-600 font-medium">
                        {{ user.role }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2">
                  <router-link
                    to="/profile"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <UserIcon class="w-4 h-4 mr-3 text-gray-400" />
                    My Profile
                  </router-link>
                  <router-link
                    to="/orders"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <ShoppingBagIcon class="w-4 h-4 mr-3 text-gray-400" />
                    My Orders
                  </router-link>
                  <router-link
                    to="/wishlist"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <HeartIcon class="w-4 h-4 mr-3 text-gray-400" />
                    Wishlist
                  </router-link>
                  <router-link
                    to="/settings"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <SettingsIcon class="w-4 h-4 mr-3 text-gray-400" />
                    Settings
                  </router-link>
                </div>

                <!-- Logout Section -->
                <div class="border-t border-gray-100 pt-2">
                  <button
                    @click="handleLogout"
                    class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                    <LogOutIcon class="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <MenuIcon v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <XIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed top-16 right-2 h-[33vh] w-72 bg-gray-900 rounded shadow-lg z-40 overflow-y-auto p-2">
          <div class="flex flex-col py-5 px-4 space-y-2">
            <router-link
              to="/"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 item-end">
              <Home class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-lg font-medium text-gray-300">Home</span>
            </router-link>
            <router-link
              to="/products"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <ShoppingBag class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-lg font-medium text-gray-300">Products</span>
            </router-link>
            <router-link
              to="/about"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <Info class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-lg font-medium text-gray-300">About</span>
            </router-link>
            <router-link
              to="/contact"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <Mail class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-lg font-medium text-gray-300">Contact</span>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  SearchIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  Home,
  ShoppingBag,
  Info,
  Mail,
} from "lucide-vue-next";

const router = useRouter();

// User data
const user = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Premium Member",
  avatar:
    "https://www.pawlovetreats.com/cdn/shop/articles/pembroke-welsh-corgi-puppy_1000x.jpg?v=1628638716",
  lastActive: new Date(),
  isOnline: true,
});

// Online status management
const lastActiveTime = ref(user.value.lastActive);
const isOnline = ref(navigator.onLine);
const userStatus = computed(() => {
  return (
    isOnline.value &&
    new Date(lastActiveTime.value) > new Date(Date.now() - 60000)
  );
});

// Update network status
const updateNetworkStatus = () => {
  isOnline.value = navigator.onLine;
  if (isOnline.value) {
    lastActiveTime.value = new Date();
  }
};

// Check activity periodically
let activityCheckInterval;
const checkActivity = () => {
  if (!isOnline.value) return;
  const oneMinuteAgo = new Date(Date.now() - 60000);
  if (new Date(lastActiveTime.value) < oneMinuteAgo) {
    isOnline.value = false;
  }
};

// UI state
const isProfileMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const profileDropdown = ref(null);
const cartCount = ref(2);

// Methods
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
  isMobileMenuOpen.value = false;
  if (isProfileMenuOpen.value) {
    lastActiveTime.value = new Date();
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isProfileMenuOpen.value = false;
  if (isMobileMenuOpen.value) {
    lastActiveTime.value = new Date();
  }
};

const handleLogout = () => {
  isProfileMenuOpen.value = false;
  isMobileMenuOpen.value = false;
  router.push("/login");
};

const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);
  document.addEventListener("click", handleClickOutside);

  activityCheckInterval = setInterval(() => {
    checkActivity();
    // Simulate periodic activity updates
    if (isOnline.value) {
      lastActiveTime.value = new Date();
    }
  }, 30000);
});

onUnmounted(() => {
  window.removeEventListener("online", updateNetworkStatus);
  window.removeEventListener("offline", updateNetworkStatus);
  document.removeEventListener("click", handleClickOutside);
  clearInterval(activityCheckInterval);
});
</script>

<style scoped>
.rainbow-animate {
  background: linear-gradient(
    to right,
    #ff0000,
    #ff8000,
    #ffff00,
    #00ff00,
    #0000ff,
    #8000ff,
    #ff00ff,
    #ff0000
  );
  background-size: 800% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbow 8s linear infinite;
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.z-40 {
  z-index: 40;
}

.z-50 {
  z-index: 50;
}

/* Mobile menu animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
