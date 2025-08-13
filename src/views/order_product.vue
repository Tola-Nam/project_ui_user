<template>
  <navbar />
  <!-- <div class="bg-gray-50 min-h-screen p-4"> -->
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <!-- <div class="mb-8"></div> -->

    <!-- Table Container -->
    <div
      class="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      <!-- Table Header -->
      <div class="px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <div class="flex items-center space-x-3">
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Filter
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Export
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full table-fixed">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fulfillment
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="order in orders"
              :key="order.id"
              class="hover:bg-gray-50 transition-colors duration-200">
              <!-- Checkbox -->
              <td class="px-4 py-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </td>

              <!-- Order ID -->
              <td class="px-4 py-2 whitespace-nowrap">
                <div
                  class="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {{ order.id }}
                </div>
              </td>

              <!-- Created Date -->
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.created }}</div>
              </td>

              <!-- Customer -->
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="order.customer.avatar"
                    :alt="order.customer.name"
                    class="w-8 h-8 rounded-full object-cover mr-3" />
                  <div class="text-sm font-medium text-gray-900">
                    {{ order.customer.name }}
                  </div>
                </div>
              </td>

              <!-- Fulfillment -->
              <td class="px-4 py-2 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-2 text-xs font-semibold rounded-full"
                  :class="getFulfillmentBadgeClass(order.fulfillment)">
                  {{ order.fulfillment }}
                </span>
              </td>

              <!-- Total -->
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ order.total }}
                </div>
              </td>

              <!-- Profit -->
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ order.profit }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-2 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-2 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(order.status)">
                  {{ order.status }}
                </span>
              </td>

              <!-- Updated -->
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ order.updated }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer -->
      <div class="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to
            <span class="font-medium">8</span> of
            <span class="font-medium">47</span> results
          </div>
          <div class="flex items-center space-x-2">
            <button
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button
              class="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700">
              1
            </button>
            <button
              class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button
              class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              3
            </button>
            <button
              class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";
import navbar from "../components/navbar.vue";

// Sample order data matching the image
const orders = ref([
  {
    id: "121001",
    created: "Aug 1, 2019",
    customer: {
      name: "Harriet Santiago",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Processing",
    total: "$604.50",
    profit: "$162.50",
    status: "Processing",
    updated: "Today",
  },
  {
    id: "121000",
    created: "Jul 31, 2019",
    customer: {
      name: "Sara Graham",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Pending Receipt",
    total: "$1,175.50",
    profit: "$324.25",
    status: "Paid",
    updated: "Today",
  },
  {
    id: "121008",
    created: "Jul 16, 2019",
    customer: {
      name: "Elmer McGee",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Completed",
    total: "$175.50",
    profit: "$78",
    status: "Processing",
    updated: "Yesterday",
  },
  {
    id: "120998",
    created: "Jul 17, 2019",
    customer: {
      name: "Victor Arnold",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Completed",
    total: "$403.50",
    profit: "$83",
    status: "Processing",
    updated: "Jul 26, 2019",
  },
  {
    id: "121049",
    created: "Jul 19, 2019",
    customer: {
      name: "Harrison Scott",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Completed",
    total: "$179",
    profit: "$27.15",
    status: "Paid",
    updated: "Jul 26, 2019",
  },
  {
    id: "121094",
    created: "Jul 27, 2019",
    customer: {
      name: "Patricia Vaughn",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Pending Receipt",
    total: "$624.50",
    profit: "$113.50",
    status: "Paid",
    updated: "Jul 26, 2019",
  },
  {
    id: "121001",
    created: "Jul 19, 2019",
    customer: {
      name: "Earl Hopkins",
      avatar: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
    fulfillment: "Processing",
    total: "$175.50",
    profit: "$18.50",
    status: "Paid",
    updated: "Jul 26, 2019",
  },
]);

// Helper functions for badge styling
const getFulfillmentBadgeClass = (fulfillment) => {
  switch (fulfillment) {
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Pending Receipt":
      return "bg-purple-100 text-purple-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Paid":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-orange-100 text-orange-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
