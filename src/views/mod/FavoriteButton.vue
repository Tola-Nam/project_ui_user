<template>
  <button
    @click.stop="toggleFavorite"
    class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 group"
    aria-label="Toggle Favorite"
    :disabled="isProcessing">
    <HeartIcon
      class="w-4 h-4 transition-colors"
      :class="{
        'fill-red-500 text-red-500': item.isFavorite,
        'text-gray-500 group-hover:text-red-400': !item.isFavorite,
      }" />
    <span v-if="isProcessing" class="sr-only">Processing...</span>
  </button>
</template>

<script>
import { useRouter } from "vue-router";
import { HeartIcon } from "lucide-vue-next";

export default {
  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) => "pro_id" in item && "isFavorite" in item,
    },
  },
  data() {
    return {
      isProcessing: false,
      router: null,
    };
  },
  components: {
    HeartIcon,
  },
  created() {
    // Use router instance from Composition API here
    this.router = useRouter();
  },
  methods: {
    async checkUser() {
      try {
        console.log("Checking user auth...");
        const res = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/check_auth.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        console.log("Auth check response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Auth check response data:", data);

        if (data && data.user_id) {
          return data.user_id;
        } else {
          this.router.push("/Registration");
          return null;
        }
      } catch (error) {
        console.error("Error checking user:", error);
        this.router.push("/Registration");
        return null;
      }
    },

    async addFavorite(userId) {
      try {
        console.log(
          `Adding favorite for product ${this.item.pro_id} by user ${userId}`
        );

        const response = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/add_to_cart.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              pro_id: this.item.pro_id,
            }),
          }
        );

        console.log("Add favorite response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("🟡 Raw add_favorite response:", text);

        // Try parse JSON response
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error(" JSON parse error:", e);
          return false;
        }

        return data.success;
      } catch (error) {
        console.error("Error adding favorite:", error);
        return false;
      }
    },

    async removeFavorite() {
      try {
        console.log(`Removing favorite for product ${this.item.pro_id}`);
        const response = await fetch(
          "http://localhost/ApplicationBackend/api/middleware/remove_favorite.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              pro_id: this.item.pro_id,
            }),
          }
        );

        console.log("Remove favorite response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Remove favorite response data:", data);

        return data.success;
      } catch (error) {
        console.error("Error removing favorite:", error);
        return false;
      }
    },

    async toggleFavorite() {
      if (this.isProcessing) return;

      console.log("Toggling favorite for item:", this.item);
      this.isProcessing = true;

      try {
        if (this.item.isFavorite) {
          console.log("Removing from favorites...");
          const success = await this.removeFavorite();
          if (success) {
            console.log("Successfully removed favorite");
            this.$emit("favorite-toggled", {
              id: this.item.pro_id,
              isFavorite: false,
            });
          } else {
            console.warn("Failed to remove favorite");
          }
        } else {
          console.log("Adding to favorites...");
          const userId = await this.checkUser();
          if (userId) {
            const success = await this.addFavorite(userId);
            if (success) {
              console.log("Successfully added favorite");
              this.$emit("favorite-toggled", {
                id: this.item.pro_id,
                isFavorite: true,
              });
            } else {
              console.warn("Failed to add favorite");
            }
          }
        }
      } catch (error) {
        console.error("Error in toggleFavorite:", error);
        if (error.response && error.response.status === 401) {
          this.router.push("/Registration");
        }
      } finally {
        this.isProcessing = false;
      }
    },
  },
};
</script>
