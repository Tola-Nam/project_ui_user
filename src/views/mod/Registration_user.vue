<template>
  <div class="min-h-screen flex flex-col justify-center py-0 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-0 text-center text-xl font-extrabold text-gray-700">
        Registration account
      </h2>
    </div>

    <div class="mt-0 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div
            v-if="error"
            class="text-red-600 text-sm p-2 bg-red-50 rounded-md">
            {{ error }}
          </div>
          <div
            v-if="success"
            class="text-green-600 text-sm p-2 bg-green-50 rounded-md">
            {{ success }}
          </div>

          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label
                for="first_name"
                class="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div class="mt-1">
                <input
                  id="first_name"
                  v-model="form.first_name"
                  placeholder="Enter your first name"
                  name="first_name"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div class="mt-1">
                <input
                  id="last_name"
                  placeholder="Enter your last name"
                  v-model="form.last_name"
                  name="last_name"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div>
            <label
              for="gender"
              class="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              v-model="form.gender"
              name="gender"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="animate-fade-in-down animate-delay-200">
            <label
              for="phone_number"
              class="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div
              class="mt-1 relative rounded-md shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none py-1">
                <span class="text-gray-500 sm:text-sm"> + </span>
              </div>
              <input
                id="phone_number"
                v-model="form.phone_number"
                name="phone_number"
                type="tel"
                required
                class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 pr-12 py-2 border-gray-300 rounded-md transition duration-300 hover:border-blue-300 sm:text-sm"
                placeholder="1234567890" />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                placeholder="••••••••"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="8"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword">
                <EyeOffIcon
                  v-if="!showPassword"
                  class="h-5 w-5 text-gray-400" />
                <EyeIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div
              class="flex flex-col md:flex-row items-center mt-2 gap-2 md:gap-4 text-sm">
              <p class="text-gray-600">
                Must be at least
                <span class="font-semibold text-gray-800">8 characters</span>
              </p>
              <router-link
                to="/AuthView"
                class="text-blue-600 hover:text-blue-500 font-medium transition duration-300 underline underline-offset-4">
                SignIn account
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed">
              {{ loading ? "Registering..." : "Register" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const showPassword = ref(false);

const form = ref({
  first_name: "", // Not firstName
  last_name: "", // Not lastName
  gender: "",
  phone_number: "", // Not phoneNumber
  password: "",
});

const loading = ref(false);
const error = ref(null);
const success = ref(null);

const handleSubmit = async () => {
  error.value = null;
  success.value = null;

  // Basic validation
  if (
    !form.value.first_name ||
    !form.value.last_name ||
    !form.value.gender ||
    !form.value.phone_number ||
    !form.value.password
  ) {
    error.value = "Please fill in all fields";
    return;
    console.error("Please fill in all fields");
  }

  if (form.value.password.length < 8) {
    error.value = "Password must be at least 8 characters";
    return;
  }

  loading.value = true;

  try {
    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/User_register_account.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    success.value = data.message || "Registration successful!";

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/AuthView");
    }, 2000);
  } catch (err) {
    error.value = err.message || "An error occurred during registration";
  } finally {
    loading.value = false;
  }
};
</script>

<style>
/* Animation keyframes */
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

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-delay-200 {
  animation-delay: 0.2s;
}

/* Transition effects */
.transition-all {
  transition-property: all;
}

.transition {
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
}
</style>
