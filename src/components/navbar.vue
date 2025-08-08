<template>
  <header class="bg-gray-50 sticky top-0 z-50">
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
            <span class="text-sm font-bold italic text-center rainbow-animate"
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
            to="/categories"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >Products</router-link
          >

          <div class="relative group inline-block">
            <router-link
              to="/"
              class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >Categories</router-link
            >
            <div
              class="absolute left-0 mt-2 w-80 bg-white text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
              <router-link
                v-for="category in categories"
                :key="category.id"
                :to="`/category_detail/?category=${category.name}`"
                @click="isMobileMenuOpen = false"
                class="block px-3 py-2 text-sm text-gray-700 text-center hover:bg-gray-300 transition-colors duration-200">
                {{ category.name }}
              </router-link>
            </div>
          </div>

          <router-link
            to="/"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >About</router-link
          >
          <router-link
            to="/"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >Contact</router-link
          >
        </nav>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <!-- <button
            class="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <SearchIcon class="w-5 h-5" />
          </button> -->
          <modal_form />

          <!-- Profile Dropdown -->
          <div class="relative" ref="profileDropdown">
            <button
              @click="toggleProfileMenu"
              class="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200">
              <!-- Avatar with Online Status -->
              <div class="relative">
                <img
                  :src="user.avatar || defaultAvatar"
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
                  {{ user.First_name || "Guest" }} {{ user.last_name || "" }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ user.phone_number || "Not logged in" }}
                </div>
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
                class="fixed right-4 top-16 w-64 h-75 ps-5 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <!-- User Info Header -->
                <div class="px-4 py-3 relative overflow-hidden">
                  <div
                    class="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[flow_3s_linear_infinite]"></div>

                  <div class="flex items-center space-x-3">
                    <img
                      :src="user.avatar || defaultAvatar"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div class="font-sm m-0 text-gray-900">
                        {{ user.First_name || "Guest" }}
                        {{ user.last_name || "" }}
                      </div>
                      <div class="text-xs text-blue-600 font-medium">
                        {{ user.phone_number || "Guest user" }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2 ps-2">
                  <router-link
                    to="/"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <UserIcon class="w-4 h-4 mr-3 text-gray-400" />
                    My Profile
                  </router-link>
                  <router-link
                    to="/order_product"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <ShoppingBagIcon class="w-4 h-4 mr-3 text-gray-400" />
                    My Orders
                  </router-link>
                  <router-link
                    to="/add_favorite"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <HeartIcon class="w-4 h-4 mr-3 text-gray-400" />
                    Wishlist
                  </router-link>
                  <router-link
                    to="/"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <SettingsIcon class="w-4 h-4 mr-3 text-gray-400" />
                    Settings
                  </router-link>
                </div>

                <!-- Logout Section -->
                <div class="border-gray-100 pt-2 ps-2">
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
          class="md:hidden fixed top-16 right-2 h-[60vh] w-65 bg-gray-900 rounded shadow-lg z-40 p-2 mt-3 overflow-y-auto me-2">
          <div class="flex flex-col py-5 px-4 space-y-2">
            <router-link
              to="/"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-1 text-gray-700 hover:bg-gray-400 rounded transition-colors duration-200">
              <Home class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-xs font-medium text-gray-200">Home</span>
            </router-link>

            <router-link
              to="/categories"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-1 text-gray-700 hover:bg-gray-400 rounded transition-colors duration-200">
              <ShoppingBag class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-xs font-medium text-gray-200">Products</span>
            </router-link>

            <!-- Category Dropdown -->
            <div class="relative">
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center justify-between px-4 py-1 text-gray-700 hover:bg-gray-400 rounded transition-colors duration-200 w-full">
                <div class="flex items-center">
                  <ShoppingBag class="w-5 h-5 mr-3 text-gray-500" />
                  <span class="text-xs font-medium text-gray-200"
                    >Category</span
                  >
                </div>
                <ChevronDownIcon
                  class="w-4 h-4 text-gray-400 transition-transform duration-300"
                  :class="{ 'rotate-180': isDropdownOpen }" />
              </button>

              <!-- Dropdown Content -->
              <transition
                name="dropdown"
                enter-active-class="transition-all ease-out duration-300"
                leave-active-class="transition-all ease-in duration-200"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100"
                leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0">
                <div v-if="isDropdownOpen" class="mt-0 ml-8 overflow-hidden">
                  <div class="rounded-md py-1 space-y-1 max-h-70">
                    <router-link
                      v-for="category in categories"
                      :key="category.id"
                      :to="`/category_detail/?category=${category.name}`"
                      @click="isMobileMenuOpen = false"
                      class="block px-3 py-1 text-xs text-gray-200 hover:bg-gray-700 transition-colors duration-200">
                      {{ category.name }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>

            <router-link
              to="/about"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-1 text-gray-700 hover:bg-gray-400 rounded transition-colors duration-200">
              <Info class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-xs font-medium text-gray-200">About</span>
            </router-link>

            <router-link
              to="/contact"
              @click="isMobileMenuOpen = false"
              class="flex items-center px-4 py-1 text-gray-700 hover:bg-gray-400 rounded transition-colors duration-200">
              <Mail class="w-5 h-5 mr-3 text-gray-500" />
              <span class="text-xs font-medium text-gray-200">Contact</span>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import modal_form from "./modal_form.vue";
import {
  SearchIcon,
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Constants
const defaultAvatar =
  "https://www.pawlovetreats.com/cdn/shop/articles/pembroke-welsh-corgi-puppy_1000x.jpg?v=1628638716";

// Refs
const isDropdownOpen = ref(false);
const isProfileMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const profileDropdown = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const lastActiveTime = ref(new Date());
const isOnline = ref(navigator.onLine);

// Data
const categories = ref([
  { id: 1, name: "FishingClothing" },
  { id: 2, name: "FishingChairs" },
  { id: 3, name: "FishingWadersBoots" },
  { id: 4, name: "FishingLine" },
  { id: 5, name: "FishingReel" },
  { id: 6, name: "FishingLures" },
  { id: 7, name: "FishingBundles" },
  { id: 8, name: "FishingTools" },
  { id: 9, name: "FishingPolesWhips" },
]);

const user = ref({
  First_name: "",
  Last_name: "",
  Phone_number: "",
  avatar: "",
});

// Computed
const userStatus = computed(() => {
  return (
    isOnline.value &&
    new Date(lastActiveTime.value) > new Date(Date.now() - 60000)
  );
});

// Methods
const updateNetworkStatus = () => {
  isOnline.value = navigator.onLine;
  if (isOnline.value) {
    lastActiveTime.value = new Date();
  }
};

const checkActivity = () => {
  if (!isOnline.value) return;
  const oneMinuteAgo = new Date(Date.now() - 60000);
  if (new Date(lastActiveTime.value) < oneMinuteAgo) {
    isOnline.value = false;
  }
};

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

const fetchUserData = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/get_profile_user.php",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.logged_in) {
      const userData = responseData.user;
      user.value = {
        First_name: userData.First_name || "",
        last_name: userData.Last_name || "",
        phone_number: userData.Phone_number || "",
        avatar: userData.avatar || defaultAvatar,
      };
    } else {
      // User is not logged in, set to guest
      user.value = {
        First_name: "null",
        last_name: "",
        email: "",
        phone_number: "",
        avatar: defaultAvatar,
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    errorMessage.value = error.message;
    // Set to guest if there's an error
    user.value = {
      First_name: "Guest",
      last_name: "",
      email: "",
      phone_number: "",
      avatar: defaultAvatar,
    };
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/logout_account.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Logout failed");
    }

    // Reset user data to guest
    user.value = {
      First_name: "Guest",
      last_name: "",
      email: "",
      phone_number: "",
      avatar: defaultAvatar,
    };

    router.push("/AuthView");
  } catch (error) {
    console.error("Logout failed:", error);
    errorMessage.value = error.message || "Logout failed. Please try again.";
  } finally {
    isLoading.value = false;
    isProfileMenuOpen.value = false;
    isMobileMenuOpen.value = false;
  }
};

const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

// Lifecycle Hooks
onMounted(async () => {
  try {
    await fetchUserData();

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    document.addEventListener("click", handleClickOutside);

    // Setup activity checker
    const activityCheckInterval = setInterval(() => {
      checkActivity();
      if (isOnline.value) {
        lastActiveTime.value = new Date();
      }
    }, 30000);

    // Cleanup function
    onUnmounted(() => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
      document.removeEventListener("click", handleClickOutside);
      clearInterval(activityCheckInterval);
    });
  } catch (error) {
    console.error("Component initialization error:", error);
  }
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

/* Custom dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 20rem;
  opacity: 1;
}

/* Custom scrollbar for dropdown */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 2px;
}
</style>
