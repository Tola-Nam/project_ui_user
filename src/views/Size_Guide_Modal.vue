<template>
  <div>
    <!-- Trigger Button -->
    <!-- <button 
      @click="openModal"
      class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
    >
      Find Your Size
    </button> -->

    <!-- Modal Backdrop -->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 bg-opacity-50 flex items-center justify-end z-50 p-4"
      @click="closeModal"
    >
      <!-- Modal Content -->
      <div 
        class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-medium text-gray-900">Enter your height and weight</h3>
          <button 
            @click="closeModal"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4">
          <!-- Input Fields -->
          <div class="flex space-x-3 mb-4 justify-end align-items-end">
            <!-- Height Input -->
            <div class="w-1/2">
              <div class="relative">
                <input
                  v-model.number="height"
                  type="number"
                  min="100"
                  max="210"
                  placeholder="Height"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  cm
                </div>
              </div>
              <p v-if="heightError" class="mt-1 text-xs text-red-500">{{ heightError }}</p>
            </div>

            <!-- Weight Input -->
            <div class="w-1/2">
              <div class="relative">
                <input
                  v-model.number="weight"
                  type="number"
                  min="30"
                  max="90"
                  placeholder="Weight"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  kg
                </div>
              </div>
              <p v-if="weightError" class="mt-1 text-xs text-red-500">{{ weightError }}</p>
            </div>
          </div>

          <!-- Apply Button -->
          <button
            @click="findSize"
            class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            :disabled="!isFormValid"
          >
            Apply
          </button>

          <!-- Size Chart -->
          <div class="mt-6">
            <h4 class="font-medium text-gray-900 mb-3">Height</h4>
            <div class="border border-gray-300 rounded-md overflow-hidden">
              <table class="w-full text-center">
                <tbody>
                  <!-- Height Row Headers -->
                  <tr class="bg-gray-50">
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500"></td>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500">40-45</td>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500">46-50</td>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500">51-55</td>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500">56-60</td>
                    <td class="border-b border-gray-300 p-2 text-xs text-gray-500">61-65</td>
                  </tr>

                  <!-- 171-175 Row -->
                  <tr>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500 bg-gray-50">171-175</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('171-175', '40-45') }">M</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('171-175', '46-50') }">M</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('171-175', '51-55') }">XL</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('171-175', '56-60') }">XL</td>
                    <td class="border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('171-175', '61-65') }">XL</td>
                  </tr>

                  <!-- 166-170 Row -->
                  <tr>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500 bg-gray-50">166-170</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('166-170', '40-45') }">S</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('166-170', '46-50') }">M</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('166-170', '51-55') }">L</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('166-170', '56-60') }">XL</td>
                    <td class="border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('166-170', '61-65') }">XL</td>
                  </tr>

                  <!-- 161-165 Row -->
                  <tr>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500 bg-gray-50">161-165</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('161-165', '40-45') }">XS</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('161-165', '46-50') }">S</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('161-165', '51-55') }">M</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('161-165', '56-60') }">L</td>
                    <td class="border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('161-165', '61-65') }">L</td>
                  </tr>

                  <!-- 156-160 Row -->
                  <tr>
                    <td class="border-r border-b border-gray-300 p-2 text-xs text-gray-500 bg-gray-50">156-160</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('156-160', '40-45') }">XS</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('156-160', '46-50') }">S</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('156-160', '51-55') }">M</td>
                    <td class="border-r border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('156-160', '56-60') }">L</td>
                    <td class="border-b border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('156-160', '61-65') }">L</td>
                  </tr>

                  <!-- 150-155 Row -->
                  <tr>
                    <td class="border-r border-gray-300 p-2 text-xs text-gray-500 bg-gray-50">150-155</td>
                    <td class="border-r border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('150-155', '40-45') }">XS</td>
                    <td class="border-r border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('150-155', '46-50') }">S</td>
                    <td class="border-r border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('150-155', '51-55') }">M</td>
                    <td class="border-r border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('150-155', '56-60') }">L</td>
                    <td class="border-gray-300 p-2" :class="{ 'bg-blue-100': isSelectedSize('150-155', '61-65') }">L</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Recommended Size -->
          <div v-if="recommendedSize" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p class="text-blue-800 font-medium">
              Recommended Size: <span class="text-lg">{{ recommendedSize }}</span>
            </p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-4 py-3 flex justify-end">
          <button 
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { XIcon } from 'lucide-vue-next'

// Modal state
const isModalOpen = ref(true)
const height = ref(null)
const weight = ref(null)
const recommendedSize = ref('')
const selectedHeightRange = ref('')
const selectedWeightRange = ref('')

// Validation
const heightError = computed(() => {
  if (height.value === null) return ''
  if (height.value < 100) return 'Minimum height is 100cm'
  if (height.value > 210) return 'Maximum height is 210cm'
  return ''
})

const weightError = computed(() => {
  if (weight.value === null) return ''
  if (weight.value < 30) return 'Minimum weight is 30kg'
  if (weight.value > 90) return 'Maximum weight is 90kg'
  return ''
})

const isFormValid = computed(() => {
  return height.value && weight.value && !heightError.value && !weightError.value
})

// Size chart data
const sizeChart = {
  '171-175': {
    '40-45': 'M',
    '46-50': 'M',
    '51-55': 'XL',
    '56-60': 'XL',
    '61-65': 'XL'
  },
  '166-170': {
    '40-45': 'S',
    '46-50': 'M',
    '51-55': 'L',
    '56-60': 'XL',
    '61-65': 'XL'
  },
  '161-165': {
    '40-45': 'XS',
    '46-50': 'S',
    '51-55': 'M',
    '56-60': 'L',
    '61-65': 'L'
  },
  '156-160': {
    '40-45': 'XS',
    '46-50': 'S',
    '51-55': 'M',
    '56-60': 'L',
    '61-65': 'L'
  },
  '150-155': {
    '40-45': 'XS',
    '46-50': 'S',
    '51-55': 'M',
    '56-60': 'L',
    '61-65': 'L'
  }
}

// Height ranges
const heightRanges = [
  { min: 150, max: 155, range: '150-155' },
  { min: 156, max: 160, range: '156-160' },
  { min: 161, max: 165, range: '161-165' },
  { min: 166, max: 170, range: '166-170' },
  { min: 171, max: 175, range: '171-175' },
  { min: 176, max: 210, range: '171-175' } // For heights above chart, use largest size
]

// Weight ranges
const weightRanges = [
  { min: 30, max: 45, range: '40-45' },
  { min: 46, max: 50, range: '46-50' },
  { min: 51, max: 55, range: '51-55' },
  { min: 56, max: 60, range: '56-60' },
  { min: 61, max: 90, range: '61-65' } // For weights above chart, use largest size
]

// Methods
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  height.value = null
  weight.value = null
  recommendedSize.value = ''
  selectedHeightRange.value = ''
  selectedWeightRange.value = ''
}

const findSize = () => {
  if (!isFormValid.value) return
  
  // Find height range
  const heightRange = heightRanges.find(range => 
    height.value >= range.min && height.value <= range.max
  )
  
  // Find weight range
  const weightRange = weightRanges.find(range => 
    weight.value >= range.min && weight.value <= range.max
  )
  
  if (heightRange && weightRange) {
    selectedHeightRange.value = heightRange.range
    selectedWeightRange.value = weightRange.range
    recommendedSize.value = sizeChart[heightRange.range][weightRange.range]
  }
}

const isSelectedSize = (heightRange, weightRange) => {
  return selectedHeightRange.value === heightRange && selectedWeightRange.value === weightRange
}

// Reset recommended size when inputs change
watch([height, weight], () => {
  recommendedSize.value = ''
  selectedHeightRange.value = ''
  selectedWeightRange.value = ''
})
</script>

<style scoped>
/* Smooth transitions */
.bg-blue-100 {
  transition: background-color 0.3s ease;
}

/* Remove number input arrows */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>