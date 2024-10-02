<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white font-mono"
  >
    <Menu />

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-white/10 py-8 text-center text-gray-400">
      <p>Crafted with AI and a sprinkle of magic.</p>
    </footer>
  </div>
</template>
