<template>
  <navbar />
  <div class="min-h-screen p-4 py-5 bg-gray-100">
    <div class="max-w-7xl mx-auto">
      <!-- Compact Grid Layout -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
        <div
          v-for="item in items"
          :key="item.category"
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <!-- Clickable Content Area -->
          <router-link
            :to="{
              path: 'card',
              query: { pro_id: item.pro_id, category: item.category },
            }"
            class="block">
            <!-- Compact Image -->
            <div class="relative">
              <div
                class="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <picture>
                  <img
                    :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`"
                    :alt="item.productName"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                </picture>
              </div>

              <!-- Favorite Button Overlay -->
              <button
                @click.prevent="toggleFavorite(item.pro_id)"
                class="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors">
                <HeartIcon
                  class="w-4 h-4 transition-colors"
                  :class="
                    item.isFavorite
                      ? 'text-red-500 fill-current'
                      : 'text-gray-400'
                  " />
              </button>
            </div>

            <!-- Compact Info -->
            <div class="p-2 space-y-1">
              <!-- Product Name -->
              <h3
                class="text-xs font-medium text-gray-900 truncate"
                :title="item.productName">
                {{ item.productName }}
              </h3>

              <!-- Price -->
              <div class="text-sm font-bold text-green-600">
                ៛{{ item.price }}
              </div>

              <!-- Compact Stats Row -->
              <div
                class="flex items-center justify-between text-xs text-gray-500">
                <div class="flex items-center space-x-1">
                  <Weight class="w-5 h-5 text-gray-600" />
                  <span>{{ item.length || "0" }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <PackageIcon class="w-3 h-3 text-blue-500" />
                  <span>{{ item.stock || "0" }}</span>
                </div>
              </div>

              <!-- Category Badge -->
              <div class="pt-1">
                <span
                  class="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full truncate max-w-full">
                  {{ item.category }}
                </span>
              </div>
            </div>
          </router-link>

          <!-- Action Buttons -->
          <div class="px-2 pb-2">
            <div class="flex space-x-1">
              <button
                @click="openModal(item.pro_id)"
                class="flex-1 flex items-center justify-center px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors">
                <EditIcon class="w-3 h-3 mr-1" />
                Edit
              </button>
              <button
                @click="deleteItem(item.pro_id)"
                class="flex-1 flex items-center justify-center px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors">
                <TrashIcon class="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0" class="text-center py-12">
        <PackageIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p class="text-gray-500">Start by adding your first product.</p>
      </div>
    </div>
    <!--  </div>-->

    <!-- Update Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showModal = false">
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Update Product</h2>
          <button
            @click="showModal = false"
            class="text-gray-400 hover:text-gray-600 transition-colors">
            <XIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Content -->
        <form @submit.prevent="updateItem()" class="p-6 space-y-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Basic Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Product Name *</label
                >
                <input
                  v-model="form.productName"
                  type="text"
                  required
                  placeholder="Enter product name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Brand</label
                >
                <input
                  v-model="form.brand"
                  type="text"
                  placeholder="Enter brand name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Category *</label
                >
                <select
                  v-model="form.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors">
                  <option disabled value="">Select category</option>
                  <option value="FishingClothing">Fishing Clothing</option>
                  <option value="FishingChairs">Fishing Chairs</option>
                  <option value="FishingWadersBoots">
                    Fishing Waders & Boots
                  </option>
                  <option value="FishingLine">Fly Fishing Line</option>
                  <option value="FishingReel">Fishing Reel</option>
                  <option value="FishingLures">Fishing Lures</option>
                  <option value="FishingBundles">Fishing Bundles</option>
                  <option value="FishingTools">Fishing Tools</option>
                  <option value="FishingPolesWhips">Poles & Whips</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Price *</label
                >
                <input
                  v-model="form.price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Product description..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"></textarea>
            </div>
          </div>

          <!-- Inventory & Specs -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">
              Inventory & Specifications
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Stock *</label
                >
                <input
                  v-model="form.stock"
                  type="number"
                  min="0"
                  required
                  placeholder="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Length</label
                >
                <input
                  v-model="form.length"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="0.0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Color</label
                >
                <input
                  v-model="form.color"
                  type="text"
                  placeholder="e.g., Black, Blue"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Product Image</label
              >
              <input
                type="file"
                @change="handleFileUpload"
                accept="image/*"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import navbar from "../../components/navbar.vue";
import {
  HeartIcon,
  EditIcon,
  TrashIcon,
  PackageIcon,
  XIcon,
  Weight,
} from "lucide-vue-next";

const items = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/api_fecth.php"
    );
    const json = await res.json();

    if (json.status && Array.isArray(json.data)) {
      items.value = json.data.map((item) => ({
        ...item,
        isFavorite: false,
      }));
    } else {
      console.error("Expected array in data, got:", json);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
});

const toggleFavorite = (id) => {
  const item = items.value.find((i) => i.pro_id === id);
  if (item) item.isFavorite = !item.isFavorite;
};

// Modal functionality
const showModal = ref(false);
const form = ref({
  pro_id: "",
  productName: "",
  brand: "",
  category: "",
  price: "",
  description: "",
  stock: "",
  length: "",
  color: "",
  file: null,
});

const handleFileUpload = (event) => {
  form.value.file = event.target.files[0];
};

function openModal(proId) {
  // Find the item and populate form
  const item = items.value.find((i) => i.pro_id === proId);
  if (item) {
    form.value = {
      pro_id: proId,
      productName: item.productName || "",
      brand: item.brand || "",
      category: item.category || "",
      price: item.price || "",
      description: item.description || "",
      stock: item.stock || "",
      length: item.length || "",
      color: item.color || "",
      file: null,
    };
  }
  showModal.value = true;
}

async function updateItem() {
  try {
    const response = await fetch(
      `http://localhost/ApplicationBackend/api/middleware/updateApi.php?${form.value.pro_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );

    const result = await response.json();

    if (result) {
      await Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "The product has been successfully updated!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Refresh the items list
      const res = await fetch(
        "http://localhost/ApplicationBackend/api/middleware/api_fecth.php"
      );
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        items.value = json.data.map((item) => ({
          ...item,
          isFavorite:
            items.value.find((i) => i.pro_id === item.pro_id)?.isFavorite ||
            false,
        }));
      }
    } else {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product",
      });
    }

    showModal.value = false;
  } catch (error) {
    console.error("Update failed:", error);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

async function deleteItem(proId) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      // Add your delete API call here
      // const response = await fetch(`http://localhost/ApplicationBackend/api/middleware/deleteApi.php?${proId}`, {
      //   method: 'DELETE'
      // })

      // For now, just remove from local array
      items.value = items.value.filter((item) => item.pro_id !== proId);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete product",
      });
    }
  }
}
</script>

<style scoped>
/* Ensure consistent card heights */
.grid > div {
  height: fit-content;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1280px) and (max-width: 1536px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
