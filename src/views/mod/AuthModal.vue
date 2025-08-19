<script setup>
import { ref } from "vue";

// Example product data
const product = ref({
  productName: "Example Product",
  category: "general",
  price: 1000,
  rating: 4.5,
  product_viewers: 10,
});

const status = ref("");

const sendMessage = async () => {
  try {
    if (!product.value) return;

    const messageText = `
🛍️ New Product Alert:
📦 Name: ${product.value.productName || "N/A"}
📂 Category: ${product.value.category || "general"}
💰 Price: ៛${product.value.price || 0}
⭐ Rating: ${product.value.rating || "4.5"}
👁️ Viewers: ${product.value.product_viewers || 0}
`;

    const response = await fetch(
      "http://localhost/ApplicationBackend/api/middleware/send_telegram.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: messageText }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.ok) {
      status.value = "Message sent successfully ✅";
      setTimeout(() => (status.value = ""), 3000);
    } else {
      status.value = "Failed to send ❌";
    }
  } catch (error) {
    status.value = "Error: " + error.message;
    console.error("Telegram send error:", error);
  }
};
</script>

<template>
  <div>
    <button @click="sendMessage" class="btn">
      Send to Telegram
    </button>
    <p>{{ status }}</p>
  </div>
</template>
