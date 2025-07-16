<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Product Images -->
        <div class="space-y-4">
          <!-- Main Product Image -->
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img 
              :src="selectedImage" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Thumbnail Images -->
          <div class="grid grid-cols-4 gap-2">
            <button 
              v-for="(image, index) in product.images" 
              :key="index"
              @click="selectedImage = image"
              class="aspect-square bg-gray-100 rounded border-2 overflow-hidden"
              :class="selectedImage === image ? 'border-black' : 'border-transparent hover:border-gray-300'"
            >
              <img :src="image" :alt="`Product view ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right Column - Product Details -->
        <div class="space-y-6">
          <!-- Product Info -->
          <div>
            <h1 class="text-2xl font-medium text-gray-900">{{ product.brand }}</h1>
            <h2 class="text-xl text-gray-700 mb-2">{{ product.name }}</h2>
            <p class="text-2xl font-semibold text-gray-900">£{{ product.price }}</p>
          </div>

          <!-- Size Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Size</h3>
            <div class="grid grid-cols-6 gap-2">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                @click="selectedSize = size"
                class="py-2 px-3 text-sm border rounded"
                :class="selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Color Selection -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div class="flex space-x-2">
              <button 
                v-for="color in product.colors" 
                :key="color.name"
                @click="selectedColor = color"
                class="w-8 h-8 rounded border-2"
                :style="{ backgroundColor: color.value }"
                :class="selectedColor.name === color.name ? 'border-black' : 'border-gray-300'"
                :title="color.name"
              ></button>
            </div>
          </div>

          <!-- Add to Bag Button -->
          <button 
            @click="addToBag"
            class="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Add to bag
          </button>

          <!-- Product Details Accordion -->
          <div class="space-y-2">
            <div 
              v-for="detail in productDetails" 
              :key="detail.title"
              class="border-b border-gray-200"
            >
              <button 
                @click="toggleDetail(detail.title)"
                class="w-full py-4 flex justify-between items-center text-left"
              >
                <span class="font-medium">{{ detail.title }}</span>
                <ChevronDownIcon 
                  class="w-5 h-5 transition-transform"
                  :class="openDetails.includes(detail.title) ? 'rotate-180' : ''"
                />
              </button>
              <div 
                v-if="openDetails.includes(detail.title)"
                class="pb-4 text-sm text-gray-600"
              >
                {{ detail.content }}
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
                  :class="star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                />
              </div>
              <span class="text-sm text-gray-600">{{ product.rating }}/5</span>
              <span class="text-sm text-gray-500">({{ product.reviewCount }} reviews)</span>
            </div>
            <button class="text-sm text-blue-600 hover:underline">Read all reviews</button>
          </div>
        </div>
      </div>

      <!-- Complete the Look Section -->
      <div class="mt-16">
        <h2 class="text-xl font-medium mb-6">Complete the look</h2>
        <p class="text-gray-600 mb-6">Outfit inspiration</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="outfit in outfitInspiration" 
            :key="outfit.id"
            class="relative group cursor-pointer"
          >
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img :src="outfit.image" :alt="outfit.description" class="w-full h-full object-cover" />
            </div>
            <button class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <HeartIcon class="w-4 h-4" />
            </button>
            <p class="mt-2 text-sm text-gray-600">{{ outfit.description }}</p>
          </div>
        </div>
      </div>

      <!-- Similar Items Section -->
      <div class="mt-16">
        <h2 class="text-xl font-medium mb-6">Similar items</h2>
        <p class="text-gray-600 mb-6">How about these?</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="item in similarItems" 
            :key="item.id"
            class="group cursor-pointer"
          >
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              <button class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <HeartIcon class="w-4 h-4" />
              </button>
            </div>
            <h3 class="text-sm font-medium">{{ item.brand }}</h3>
            <p class="text-sm text-gray-600">{{ item.name }}</p>
            <p class="text-sm font-semibold">£{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ChevronDownIcon, StarIcon, HeartIcon } from 'lucide-vue-next'

// Product data
const product = reactive({
  brand: 'Anna Field',
  name: 'Basic T-shirt',
  price: '9.99',
  rating: 4.1,
  reviewCount: 128,
  images: [
    '/placeholder.svg?height=400&width=400',
    '/placeholder.svg?height=400&width=400',
    '/placeholder.svg?height=400&width=400',
    '/placeholder.svg?height=400&width=400'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#1F2937' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Yellow', value: '#F59E0B' }
  ]
})

// Component state
const selectedImage = ref(product.images[0])
const selectedSize = ref('M')
const selectedColor = ref(product.colors[0])
const openDetails = ref(['Description'])

// Product details accordion
const productDetails = [
  {
    title: 'Description',
    content: 'A comfortable basic t-shirt made from 100% cotton. Perfect for everyday wear and layering.'
  },
  {
    title: 'Size & fit',
    content: 'Regular fit. Model is 175cm tall and wears size M. Check our size guide for more details.'
  },
  {
    title: 'Composition',
    content: '100% Cotton. Machine washable at 30°C.'
  },
  {
    title: 'More info',
    content: 'Item code: AN621D00Q-A11. Available in multiple colors and sizes.'
  }
]

// Outfit inspiration data
const outfitInspiration = [
  {
    id: 1,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Casual everyday look'
  },
  {
    id: 2,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Smart casual outfit'
  },
  {
    id: 3,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Weekend style'
  }
]

// Similar items data
const similarItems = [
  {
    id: 1,
    brand: 'Anna Field',
    name: 'Basic T-shirt',
    price: '9.99',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 2,
    brand: 'Anna Field',
    name: 'V-neck T-shirt',
    price: '12.99',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 3,
    brand: 'Anna Field',
    name: 'Long sleeve top',
    price: '15.99',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 4,
    brand: 'Anna Field',
    name: 'Striped T-shirt',
    price: '14.99',
    image: '/placeholder.svg?height=200&width=200'
  }
]

// Methods
const toggleDetail = (title) => {
  const index = openDetails.value.indexOf(title)
  if (index > -1) {
    openDetails.value.splice(index, 1)
  } else {
    openDetails.value.push(title)
  }
}

const addToBag = () => {
  console.log('Added to bag:', {
    product: product.name,
    size: selectedSize.value,
    color: selectedColor.value.name,
    price: product.price
  })
}
</script>