<template>
  <footer class="bg-gray-900 text-white pt-12 pb-6">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About Us -->
        <div class="space-y-4">
          <div class="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3079/3079158.png"
              alt="Fishing Logo"
              class="h-10 mr-2" />
            <h3 class="text-xl font-bold">Angler's Haven</h3>
          </div>
          <p class="text-gray-400">
            Your premier destination for high-quality fishing gear and outdoor
            equipment since 2010.
          </p>
          <div class="flex items-center space-x-4">
            <!-- Facebook -->
            <a
              href="https://web.facebook.com/?ref=homescreenpwa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="transition transform hover:scale-110 active:scale-95">
              <Facebook class="w-6 h-6 text-blue-600 hover:text-blue-800" />
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="transition transform hover:scale-110 active:scale-95">
              <Instagram class="w-6 h-6 text-pink-500 hover:text-pink-700" />
            </a>

            <!-- X / Twitter -->
            <a
              href="#"
              aria-label="Twitter / X"
              class="transition transform hover:scale-110 active:scale-95">
              <X class="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </a>

            <!-- Create Post -->
            <router-link
              to="/Registration"
              aria-label="Create Post"
              class="transition transform hover:scale-110 active:scale-95 text-indigo-600 hover:text-indigo-800">
              <LucidePlusCircle :size="28" />
            </router-link>

            <!-- ABA Payment -->
            <a
              href="https://pay.ababank.com/hoRgRUc2gWweWdUPA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pay with ABA Bank"
              class="transition transform hover:scale-110 active:scale-95 text-indigo-600 hover:text-indigo-800">
              <span class="text-2xl">💳</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="text-gray-400 hover:text-white transition"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/"
                class="text-gray-400 hover:text-white transition"
                >Shop</router-link
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >New Arrivals</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Best Sellers</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Sale Items</a
              >
            </li>
          </ul>
        </div>

        <!-- Fishing Categories -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Fishing Categories</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Freshwater Fishing</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Saltwater Fishing</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Fly Fishing</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Ice Fishing</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition"
                >Fishing Accessories</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact & Newsletter -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contact Us</h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-gray-400"
                >123 River Rd, Fishing Town, FT 12345</span
              >
            </div>
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="text-gray-400">(+855) 887991349</span>
            </div>
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-gray-400">namtola4444@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// You can add any necessary JavaScript functionality here
</script>

<style scoped>
/* Add any custom styles if needed */
footer a {
  transition: color 0.2s ease;
}

.icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 10px;
  gap: 4px;
}

.icon-link.highlight {
  color: #fe2c55; /* TikTok red */
}

.icon-link svg {
  transition: transform 0.2s;
}

.icon-link:hover svg {
  transform: scale(1.1);
}

.icon-link.highlight svg {
  stroke-width: 2.5px;
}
</style>
