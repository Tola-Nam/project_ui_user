<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <button @click="openModal" class="text-gray-700 hover:text-gray-900">
      <MessageSquare class="w-6 h-6 text-gray-700" />
    </button>

    <!-- Modal Overlay -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal">
      <!-- Modal Content -->
      <div
        class="bg-gray-800 rounded-2xl w-full max-w-2xl mx-auto transform transition-all duration-300 ease-out"
        :class="isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        @click.stop>
        <!-- Modal Header -->
        <div class="px-8 pt-12 pb-8 text-center">
          <h2 class="text-white text-2xl md:text-3xl font-medium">
            Hey, Nam. Ready to dive in?
          </h2>
          <div
            id="response"
            class="mt-3 text-white max-h-64 overflow-y-auto px-4 text-left whitespace-pre-wrap"></div>
        </div>

        <!-- Chat Input Section -->
        <div class="px-8 pb-12">
          <div class="relative">
            <div
              class="bg-gray-700 rounded-2xl border border-gray-600 focus-within:border-gray-500 transition-colors">
              <div class="flex items-center px-4 py-4">
                <!-- Plus -->
                <button
                  @click="toggleTools"
                  class="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors mr-3"
                  :class="{ 'bg-gray-600 text-white': showTools }">
                  <PlusIcon class="w-5 h-5" />
                </button>

                <!-- Tools Button -->
                <button
                  @click="toggleTools"
                  class="flex items-center text-gray-300 hover:text-white transition-colors mr-4"
                  :class="{ 'text-white': showTools }">
                  <WrenchIcon class="w-4 h-4 mr-2" />
                  <span class="text-sm font-medium">Tools</span>
                </button>

                <!-- Input -->
                <input
                  v-model="message"
                  type="text"
                  id="userInput"
                  placeholder="Ask anything"
                  class="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
                  @keydown.enter="handleSend"
                  @input="handleInput" />

                <!-- Mic -->
                <button
                  @click="toggleVoice"
                  class="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors mx-3"
                  :class="{ 'bg-red-600 text-white': isRecording }">
                  <MicIcon class="w-4 h-4" />
                </button>

                <!-- Send -->
                <button
                  @click="handleSend"
                  :disabled="!message.trim()"
                  class="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{
                    'bg-blue-600 text-white hover:bg-blue-700': message.trim(),
                  }">
                  <ArrowUpIcon class="w-4 h-4" />
                </button>
              </div>

              <!-- Tools Dropdown -->
              <div v-if="showTools" class="border-t border-gray-600 px-4 py-3">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    v-for="tool in tools"
                    :key="tool.name"
                    @click="selectTool(tool)"
                    class="flex items-center p-3 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors text-left">
                    <component :is="tool.icon" class="w-4 h-4 mr-2" />
                    <span class="text-sm">{{ tool.name }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Character Count -->
            <div class="flex justify-between items-center mt-3 px-2">
              <div class="text-xs text-gray-500">{{ message.length }}/2000</div>
              <div class="text-xs text-gray-500">Press Enter to send</div>
            </div>
          </div>
        </div>

        <!-- Close -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <XIcon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50"
      :class="
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      ">
      <div class="flex items-center">
        <CheckCircleIcon class="w-5 h-5 mr-2" />
        <span>Message sent successfully!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  MessageSquare,
  PlusIcon,
  WrenchIcon,
  MicIcon,
  ArrowUpIcon,
  XIcon,
  CheckCircleIcon,
  ImageIcon,
  FileTextIcon,
  CodeIcon,
  CalculatorIcon,
  SearchIcon,
  PaletteIcon,
  DatabaseIcon,
  GlobeIcon,
} from "lucide-vue-next";
import { marked } from "marked"; // Add this if you're using marked for markdown support

// State
const isModalOpen = ref(false);
const message = ref("");
const showTools = ref(false);
const isRecording = ref(false);
const showToast = ref(false);

// Tools
const tools = ref([
  { name: "Image", icon: ImageIcon },
  { name: "Code", icon: CodeIcon },
  { name: "Calculator", icon: CalculatorIcon },
  { name: "Search", icon: SearchIcon },
  { name: "Design", icon: PaletteIcon },
  { name: "Database", icon: DatabaseIcon },
  { name: "Web", icon: GlobeIcon },
  { name: "Document", icon: FileTextIcon },
]);

// Modal functions
const openModal = () => {
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  showTools.value = false;
  message.value = "";
  document.body.style.overflow = "auto";
};

const toggleTools = () => {
  showTools.value = !showTools.value;
};

const toggleVoice = () => {
  isRecording.value = !isRecording.value;
  if (isRecording.value) {
    setTimeout(() => {
      isRecording.value = false;
    }, 3000);
  }
};

const selectTool = (tool) => {
  console.log("Selected tool:", tool.name);
  showTools.value = false;
};

const handleInput = () => {};

function sendMessage() {
  if (!message.value.trim()) return;

  console.log("Sending message:", message.value);

  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);

  message.value = "";
  showTools.value = false;
}

async function sendMessage1() {
  const input = document.getElementById("userInput").value;
  const responseDiv = document.getElementById("response");

  if (!input) {
    responseDiv.innerHTML = " Please enter a question.";
    return;
  }

  responseDiv.innerHTML = "⏳ Loading...";

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "ChartBot",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const markdownText =
      data.choices?.[0]?.message?.content || " No response received.";
    responseDiv.innerHTML = marked.parse(markdownText);
  } catch (error) {
    responseDiv.innerHTML = " Error: " + error.message;
  }
}

function handleSend() {
  sendMessage();
  sendMessage1();
}

const handleKeydown = (event) => {
  if (event.key === "Escape" && isModalOpen.value) {
    closeModal();
  }
  if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    openModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
#response::-webkit-scrollbar {
  width: 6px;
}
#response::-webkit-scrollbar-thumb {
  background-color: #4b5563; /* Tailwind gray-600 */
  border-radius: 4px;
}
#response::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280; /* Tailwind gray-500 */
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #374151;
}
::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animations */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

button:hover {
  transform: translateY(-1px);
}
button:active {
  transform: translateY(0);
}
input:focus {
  outline: none;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.toast-enter-active {
  animation: slideInRight 0.3s ease-out;
}
</style>
