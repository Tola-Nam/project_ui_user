<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div
          class="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <UserPlusIcon class="h-8 w-8 text-white" />
        </div>
      </div>

      <!-- Registration Form -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Fields Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- First Name -->
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  v-model="form.first_name"
                  type="text"
                  autocomplete="first_name"
                  required
                  class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  :class="{
                    'border-red-300 bg-red-50': errors.first_name,
                    'border-gray-300': !errors.first_name,
                  }"
                  placeholder="Enter first name"
                  @blur="validateField('firstName')"
                  @input="clearError('firstName')" />
              </div>
              <p v-if="errors.first_name" class="mt-1 text-sm text-red-600">
                {{ errors.first_name }}
              </p>
            </div>

            <!-- Last Name -->
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  autocomplete="last_name"
                  v-model="form.last_name"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  :class="{
                    'border-red-300 bg-red-50': errors.lastName,
                    'border-gray-300': !errors.last_name,
                  }"
                  placeholder="Enter last name"
                  @blur="validateField('lastName')"
                  @input="clearError('lastName')" />
              </div>
              <p v-if="errors.last_name" class="mt-1 text-sm text-red-600">
                {{ errors.last_name }}
              </p>
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                autocomplete="email"
                v-model="form.email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                :class="{
                  'border-red-300 bg-red-50': errors.email,
                  'border-gray-300': !errors.email,
                }"
                placeholder="Enter your email"
                @blur="validateField('email')"
                @input="clearError('email')" />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Gender Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Gender *
            </label>
            <div class="grid grid-cols-3 gap-3">
              <label
                v-for="gender in genderOptions"
                :key="gender.value"
                class="relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
                :class="{
                  'border-blue-500 bg-blue-50 text-blue-700':
                    form.gender === gender.value,
                  'border-gray-300': form.gender !== gender.value,
                }">
                <input
                  v-model="form.gender"
                  type="radio"
                  :value="gender.value"
                  autocomplete="gender"
                  class="sr-only"
                  @change="clearError('gender')" />
                <div class="flex items-center space-x-2">
                  <span class="text-lg">{{ gender.icon }}</span>
                  <span class="text-sm font-medium">{{ gender.label }}</span>
                </div>
              </label>
            </div>
            <p v-if="errors.gender" class="mt-1 text-sm text-red-600">
              {{ errors.gender }}
            </p>
          </div>

          <!-- Phone Number Field -->
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                v-model="form.phone_number"
                autocomplete="current-phone_number"
                type="tel"
                required
                class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                :class="{
                  'border-red-300 bg-red-50': errors.phone_number,
                  'border-gray-300': !errors.phone_number,
                }"
                placeholder="Enter phone number"
                @blur="validateField('phone')"
                @input="clearError('phone')" />
            </div>
            <p v-if="errors.phone_number" class="mt-1 text-sm text-red-600">
              {{ errors.phone_number }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                autocomplete="new-password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                :class="{
                  'border-red-300 bg-red-50': errors.password,
                  'border-gray-300': !errors.password,
                }"
                placeholder="Create a password"
                @blur="validateField('password')"
                @input="clearError('password')" />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="togglePasswordVisibility">
                <EyeIcon
                  v-if="!showPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                <EyeOffIcon
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>

            <!-- Password Strength Indicator -->
            <div class="mt-2">
              <div class="flex space-x-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-1 flex-1 rounded-full transition-colors duration-200"
                  :class="getPasswordStrengthColor(i)"></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Password strength: {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-700">
                I agree to the
                <a
                  href="#"
                  class="text-blue-600 hover:text-blue-500 font-medium"
                  >Terms and Conditions</a
                >
                and
                <a
                  href="#"
                  class="text-blue-600 hover:text-blue-500 font-medium"
                  >Privacy Policy</a
                >
              </label>
            </div>
          </div>
          <p v-if="errors.acceptTerms" class="text-sm text-red-600">
            {{ errors.acceptTerms }}
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200">
            <div v-if="isLoading" class="flex items-center">
              <div
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
            <div v-else class="flex items-center">
              <UserPlusIcon class="h-4 w-4 mr-2" />
              Create Account
            </div>
          </button>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <CheckCircleIcon class="h-5 w-5 text-green-400" />
              <div class="ml-3">
                <p class="text-sm text-green-800">{{ successMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="generalError"
            class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <AlertCircleIcon class="h-5 w-5 text-red-400" />
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ generalError }}</p>
              </div>
            </div>
          </div>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/signInAcc"
              class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in here
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  UserPlusIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
const router = useRouter();
// Form data
const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  phone_number: "",
  password: "",
  acceptTerms: false,
});

// Form state
const errors = ref({});
const isLoading = ref(false);
const showPassword = ref(false);
const successMessage = ref("");
const generalError = ref("");

// Gender options
const genderOptions = [
  { value: "male", label: "Male", icon: "👨" },
  { value: "female", label: "Female", icon: "👩" },
  { value: "other", label: "Other", icon: "👤" },
];

// Computed properties
const isFormValid = computed(() => {
  return (
    form.value.first_name &&
    form.value.last_name &&
    form.value.email &&
    form.value.gender &&
    form.value.phone_number &&
    form.value.password &&
    form.value.acceptTerms &&
    Object.keys(errors.value).length === 0
  );
});

const passwordStrength = computed(() => {
  const password = form.value.password;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength === 0) return "Very Weak";
  if (strength === 1) return "Weak";
  if (strength === 2) return "Fair";
  if (strength === 3) return "Good";
  return "Strong";
});

// Validation functions
const validateField = (fieldName) => {
  switch (fieldName) {
    case "first_name":
      if (!form.value.first_name.trim()) {
        errors.value.first_name = "First name is required";
      } else if (form.value.first_name.trim().length < 2) {
        errors.value.firstName = "First name must be at least 2 characters";
      } else {
        delete errors.value.first_name;
      }
      break;

    case "last_name":
      if (!form.value.last_name.trim()) {
        errors.value.last_name = "Last name is required";
      } else if (form.value.last_name.trim().length < 2) {
        errors.value.last_name = "Last name must be at least 2 characters";
      } else {
        delete errors.value.last_name;
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.value.email) {
        errors.value.email = "Email is required";
      } else if (!emailRegex.test(form.value.email)) {
        errors.value.email = "Please enter a valid email address";
      } else {
        delete errors.value.email;
      }
      break;

    // case "phone_number":
    //   const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    //   if (!form.value.phone) {
    //     errors.value.phone = "Phone number is required";
    //   } else if (
    //       !phoneRegex.test(form.value.phone.replace(/[\s\-$$$$]/g, ""))
    //   ) {
    //     errors.value.phone = "Please enter a valid phone number";
    //   } else {
    //     delete errors.value.phone;
    //   }
    //   break;

    case "password":
      if (!form.value.password) {
        errors.value.password = "Password is required";
      } else if (form.value.password.length < 8) {
        errors.value.password = "Password must be at least 8 characters";
      } else {
        delete errors.value.password;
      }
      break;
  }
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  generalError.value = "";
};

// Form handlers
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const getPasswordStrengthColor = (index) => {
  const strength = passwordStrength.value;
  if (index <= strength) {
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    if (strength === 4) return "bg-green-500";
  }
  return "bg-gray-200";
};

const handleSubmit = async () => {
  // Validate all fields
  Object.keys(form.value).forEach((field) => {
    if (field !== "acceptTerms") {
      validateField(field);
    }
  });

  // Check terms acceptance
  if (!form.value.acceptTerms) {
    errors.value.acceptTerms = "You must accept the terms and conditions";
  }

  if (!isFormValid.value) {
    return;
  }

  isLoading.value = true;
  generalError.value = "";
  successMessage.value = "";

  try {
    isLoading.value = true;

    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/insert_api_admin_call.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );
    const result = await response.json();

    if (response.ok || result.success) {
      console.log(result);
      // On success
      successMessage.value = "Account created successfully! Welcome aboard!";
      router.push({ name: "dashboard" });
    } else {
      generalError.value = result.message || "Failed to create account.";
    }
  } catch (error) {
    generalError.value =
      "An error occurred while creating your account. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom focus styles */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom radio button styles */
input[type="radio"]:checked + div {
  background-color: rgb(239 246 255);
  border-color: rgb(59 130 246);
  color: rgb(29 78 216);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
