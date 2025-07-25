<template>
  <div class="min-h-screen bg-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header with fishing theme -->
        <div class="bg-blue-600 p-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3079/3079158.png"
            alt="Fishing Logo"
            class="h-16 mx-auto mb-2" />
          <h1 class="text-2xl font-bold text-white">
            Create Your Fishing Account
          </h1>
          <p class="text-blue-100">Join our angler community today!</p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 mb-1">
                First Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.firstName"
                type="text"
                id="firstName"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John" />
            </div>
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.lastName"
                type="text"
                id="lastName"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe" />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com" />
          </div>

          <!-- Phone Number -->
          <div>
            <label
              for="phoneNumber"
              class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span class="text-red-500">*</span>
            </label>

            <div
              class="flex rounded-md shadow-sm overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
              <!-- Country Code -->
              <span
                class="inline-flex items-center px-3 bg-gray-100 text-gray-700 text-sm">
                +855
              </span>

              <!-- Phone Number Input -->
              <input
                v-model="form.phoneNumber"
                type="tel"
                id="phoneNumber"
                required
                class="flex-1 px-3 py-2 focus:outline-none"
                placeholder="123-456-789" />
            </div>
          </div>

          <!-- Gender -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  v-model="form.gender"
                  type="radio"
                  class="text-blue-600 focus:ring-blue-500"
                  value="male" />
                <span class="ml-2">Male</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  v-model="form.gender"
                  type="radio"
                  class="text-blue-600 focus:ring-blue-500"
                  value="female" />
                <span class="ml-2">Female</span>
              </label>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                oncut="return false"
                oncopy="return false"
                onpaste="return false"
                onselect="return false"
                onselectstart="return false"
                oncontextmenu="return false"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                minlength="8"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="At least 8 characters" />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <component
                  :is="showPassword ? EyeIcon : EyeSlashIcon"
                  class="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <p class="text-xs text-gray-500 mt-1">
              Must contain at least 8 characters
            </p>
          </div>

          <!-- Confirm Password -->
          <div class="relative">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.confirmPassword"
              onpaste="return false"
              oncut="return false"
              oncopy="return false"
              :type="showPassword ? 'text' : 'password'"
              id="confirmPassword"
              required
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter your password" />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-0 pr-3 top-1/2 -translate-y-1/2 h-10 flex items-center">
              <component
                :is="showPassword ? EyeIcon : EyeSlashIcon"
                class="w-6 h-6 text-gray-500" />
            </button>

            <p
              v-if="
                form.password &&
                form.confirmPassword &&
                form.password !== form.confirmPassword
              "
              class="text-xs text-red-500 mt-1">
              Passwords don't match
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              v-model="form.agreeTerms"
              type="checkbox"
              id="agreeTerms"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-blue-600 hover:underline"
                >Terms of Service</a
              >
              and
              <a href="#" class="text-blue-600 hover:underline"
                >Privacy Policy</a
              >
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting || form.password !== form.confirmPassword"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="!isSubmitting">Create Account</span>
            <span v-else class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Creating...
            </span>
          </button>

          <!-- Login Link -->
          <div class="text-center text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/signInAcc"
              class="text-blue-600 hover:underline font-medium">
              Sign in
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
const showPassword = ref(false);
const isSubmitting = ref(false);

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+1",
  phoneNumber: "",
  gender: "male",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
});

const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) return;

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would call your registration API here
    // await registerUser(form.value);

    // Redirect after successful registration
    router.push("/");

    // Show success message
    alert("Registration successful! Welcome to our fishing community.");
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>
