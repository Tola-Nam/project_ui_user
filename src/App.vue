<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Footer from "./components/footer.vue";

const route = useRoute();

// Make it reactive to path changes
const showFooter = computed(() => {
  return !["/AuthView", "/Registration"].includes(route.path);
});
</script>

<template>
  <router-view />
  <Footer v-if="showFooter" />
</template>

