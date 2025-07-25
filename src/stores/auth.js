// stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref(null);
  const isAuthenticated = ref(false);

  // Check authentication status
  const checkAuth = async () => {
    try {
      const response = await fetch(
        "http://localhost/ApplicationBackend/api/middleware/check.php",
        {
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (data.authenticated) {
        user.value = data.user;
        isAuthenticated.value = true;
      } else {
        user.value = null;
        isAuthenticated.value = false;
      }

      return data.authenticated;
    } catch (error) {
      console.error("Auth check failed:", error);
      user.value = null;
      isAuthenticated.value = false;
      return false;
    }
  };

  return { user, isAuthenticated, checkAuth };
});
