<template>
  <div>
    <!-- Button to open modal -->
    <button
      @click="isOpen = true"
      class="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
      Add to bag
    </button>

    <!-- Modal Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-opacity-50 flex items-end justify-end z-50">
      <!-- Modal Content -->
      <div
        ref="printRef"
        class="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <!-- Close Button -->
        <button
          @click="isOpen = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        <!-- Print Button -->
        <button
          @click="printModal"
          class="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          🖨
        </button>

        <!-- Header -->
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">
            Customer Receipt
          </h1>
          <p class="text-gray-500">Your reservation is now confirmed!</p>
        </div>

        <!-- Guest Info -->
        <div class="space-y-2 mb-6">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Guest</span>
            <span class="font-medium">{{ booking.guest }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Nights</span>
            <span class="font-medium">{{ booking.nights }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Address</span>
            <span class="font-medium text-right">{{ booking.address }}</span>
          </div>
        </div>

        <!-- Dates -->
        <div class="flex justify-between text-center text-sm mb-6">
          <div>
            <p class="text-gray-400 uppercase">Arrive</p>
            <p class="font-bold">{{ formatDate(booking.arriveDate) }}</p>
          </div>
          <div>
            <p class="text-gray-400 uppercase">Depart</p>
            <p class="font-bold">{{ formatDate(booking.departDate) }}</p>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div class="space-y-2 mb-4 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">Price per night</span>
            <span class="font-semibold">${{ booking.pricePerNight }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Cleaning fees</span>
            <span class="font-semibold">${{ booking.cleaningFees }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span class="text-green-600">${{ booking.total }}</span>
        </div>

        <!-- Confirmation -->
        <div
          class="bg-green-50 border border-green-200 rounded p-3 text-sm mb-6">
          <p class="text-green-800 font-medium">✔ Booking Confirmed</p>
          <p class="text-green-700 mt-1">
            You will receive a confirmation email shortly with your booking
            details.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            📄 Order Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const printRef = ref(null);

const booking = ref({
  guest: "Jamie Doe",
  nights: 6,
  address: "45 Park Avenue, Apt. 303",
  arriveDate: new Date("2016-11-16"),
  departDate: new Date("2016-11-22"),
  pricePerNight: "144.99",
  cleaningFees: "19.99",
  total: "889.93",
  bookingId: "BK-2016-001234",
});

const formatDate = (date) => {
  return date
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "")
    .toUpperCase();
};
</script>

<style scoped>
/* You can add more custom styles here if needed */
</style>
