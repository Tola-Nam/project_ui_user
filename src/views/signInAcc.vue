<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                autocomplete="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                :class="{ 'border-red-500': errors.email }" />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Phone Number Field -->
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                autocomplete="phone_number"
                v-model="form.phone_number"
                type="tel"
                required
                class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your phone number"
                :class="{ 'border-red-500': errors.phone_number }" />
            </div>
            <p v-if="errors.phone_number" class="mt-1 text-sm text-red-600">
              {{ errors.phone_number }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                autocomplete="current-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                :class="{ 'border-red-500': errors.password }" />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <EyeOff
                  v-if="showPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                <Eye v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
            <span v-if="!isLoading" class="flex items-center">
              <LogIn class="h-5 w-5 mr-2" />
              Sign in
            </span>
            <span v-else class="flex items-center">
              <div
                class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link
              to="/registerAcc"
              class="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Mail, Phone, Lock, Eye, EyeOff, LogIn } from "lucide-vue-next";
import { useRouter } from "vue-router";

const route = useRouter();
// Form data
const form = reactive({
  email: "",
  phone_number: "",
  password: "",
  rememberMe: false,
});

// Form state
const showPassword = ref(false);
const isLoading = ref(false);
const errors = reactive({
  email: "",
  phone_number: "",
  password: "",
});

// Methods
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateForm = () => {
  errors.email = "";
  errors.phone_number = "";
  errors.password = "";

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/retrieveDataAdmin.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          phone_number: form.phone_number,
          rememberMe: form.rememberMe,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Login success:", data);
      alert("Sign in successful!");
      localStorage.setItem("loggedIn", "true");

      // Reset form
      Object.assign(form, {
        email: "",
        phone_number: "",
        password: "",
        rememberMe: false,
      });
      route.push({ name: "homePage" });
    } else {
      console.error("Login failed:", data);
      alert(data.error || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Sign in error:", error);
    alert("Sign in failed. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
</script>
