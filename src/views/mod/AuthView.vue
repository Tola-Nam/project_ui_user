<template>
  <div
    class="min-h-screen flex items-center justify-center py-1 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-4xl w-full overflow-hidden flex flex-col md:flex-row rounded-lg shadow-xl">
      <!-- Form Section -->
      <div class="w-full md:w-1/2 p-6 sm:p-8 bg-white">
        <div class="text-center mb-6 sm:mb-8">
          <h2
            class="text-2xl font-extrabold text-gray-900 animate-fade-in-down">
            Welcome Back
          </h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6">
          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {{ errorMessage }}
          </div>

          <!-- Phone Number Field -->
          <div class="animate-fade-in-down animate-delay-200">
            <label
              for="phone_number"
              class="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div
              class="mt-1 relative rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500">+</span>
              </div>
              <input
                id="phone_number"
                v-model="form.Phone_number"
                autocomplete="current-password"
                type="tel"
                required
                class="block w-full pl-8 pr-12 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234567890" />
            </div>
          </div>

          <!-- Password Field -->
          <div class="animate-fade-in-down animate-delay-300">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div
              class="mt-1 relative rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                class="block w-full pl-3 pr-12 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••" />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600">
                <EyeOffIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeIcon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div
            class="flex items-center justify-between animate-fade-in-down animate-delay-400">
            <div class="flex items-center">
              <input
                id="remember_me"
                v-model="form.remember_me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="remember_me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <router-link
              to="/"
              class="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </router-link>
          </div>

          <!-- Submit Button -->
          <div class="animate-fade-in-down animate-delay-500">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 sm:py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-75">
              <span v-if="isLoading">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center animate-fade-in-down animate-delay-600">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link
              to="/Registration"
              class="text-blue-600 hover:text-blue-500 font-medium transition duration-300 underline underline-offset-4">
              SignUp account
            </router-link>
          </p>
        </div>
      </div>

      <!-- loading when register account -->
      <!-- Loading Overlay -->
      <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div class="loader relative">
          <span>Loading...</span>
        </div>
      </div>

      <!-- Thumbnail Section -->
      <div
        class="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div
            class="absolute top-20 left-20 w-32 h-32 rounded-full bg-white animate-float-1"></div>
          <div
            class="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white animate-float-2"></div>
          <div
            class="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white animate-float-3"></div>
        </div>

        <div class="text-center relative z-10">
          <div class="relative">
            <img
              class="mx-auto h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white shadow-lg"
              src=""
              alt="App Logo" />
          </div>
          <h3 class="mt-6 text-xl font-bold text-white animate-fade-in">
            Welcome back!
          </h3>
          <p class="mt-2 text-blue-100 animate-fade-in animate-delay-100">
            Join thousands of satisfied users
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";

const router = useRouter();

const form = ref({
  phone_number: "", // Changed from Phone_number to phone_number
  password: "",
  remember_me: false,
});

const showPassword = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/User_sign_account.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          phone_number: form.value.Phone_number,
          password: form.value.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    // Session logic
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("userPhone", form.value.Phone_number);

    router.push("/");
  } catch (error) {
    errorMessage.value = error.message || "Login failed";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float1 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(15px) translateX(-15px);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(-10px);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-delay-100 {
  animation-delay: 0.1s;
}
.animate-delay-200 {
  animation-delay: 0.2s;
}
.animate-delay-300 {
  animation-delay: 0.3s;
}
.animate-delay-400 {
  animation-delay: 0.4s;
}
.animate-delay-500 {
  animation-delay: 0.5s;
}
.animate-delay-600 {
  animation-delay: 0.6s;
}

.animate-float-1 {
  animation: float1 8s ease-in-out infinite;
}
.animate-float-2 {
  animation: float2 10s ease-in-out infinite;
}
.animate-float-3 {
  animation: float3 12s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .flex-col {
    flex-direction: column;
  }
}
/* From Uiverse.io by mobinkakei */
.loader {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 50%;
  border-top: 5px solid #e74c3c;
  position: relative;
  animation: load 2s linear infinite;
}

.loader::before,
.loader::after {
  content: "";
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  border-radius: 50%;
}

.loader::before {
  border-top: 5px solid #e67e22;
  transform: rotate(120deg);
}

.loader::after {
  border-top: 5px solid #3498db;
  transform: rotate(240deg);
}

.loader span {
  position: absolute;
  font-size: small;
  width: 100px;
  height: 100px;
  color: #fff;
  text-align: center;
  line-height: 100px;
  animation: a2 2s linear infinite;
}

@keyframes load {
  to {
    transform: rotate(360deg);
  }
}

@keyframes a2 {
  to {
    transform: rotate(-360deg);
  }
}
</style>
