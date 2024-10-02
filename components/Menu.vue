<template>
  <header
    class="border-b border-white/10 sticky top-0 backdrop-blur-md bg-black/30 z-10"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <nuxt-link href="/" class="text-2xl font-bold flex items-center">
        <terminal-icon class="mr-2" />
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500"
        >
          Dolu.dev
        </span>
      </nuxt-link>
      <nav class="hidden md:block">
        <ul class="flex space-x-4">
          <li v-for="item in navItems" :key="item.title">
            <nuxt-link
              :to="item.url"
              class="hover:text-pink-400 transition-colors"
            >
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <button
        @click="toggleMenu"
        class="md:hidden text-white focus:outline-none"
      >
        <menu-icon v-if="!isMenuOpen" class="h-6 w-6" />
        <x-icon v-else class="h-6 w-6" />
      </button>
    </div>
  </header>

  <!-- Mobile menu -->
  <div
    v-if="isMenuOpen"
    class="md:hidden fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
  >
    <nav>
      <ul class="flex flex-col items-center space-y-6">
        <li v-for="item in navItems" :key="item.title">
          <nuxt-link
            @click="closeMenu"
            :to="item.url"
            class="text-2xl hover:text-pink-400 transition-colors"
          >
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <button
      @click="closeMenu"
      class="absolute top-4 right-4 text-white focus:outline-none"
    >
      <x-icon class="h-6 w-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { TerminalIcon, MenuIcon, XIcon } from "lucide-vue-next";

const navItems = [
  { title: "About", url: "/" },
  { title: "Blog", url: "/blog/pages" },
  { title: "Contact", url: "/#contact" },
];
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>
