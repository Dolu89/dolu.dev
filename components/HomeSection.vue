<template>
  <section :id="id" class="py-20">
    <h2 class="text-3xl font-bold mb-8 border-b border-white/10 pb-2">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r"
        :class="
          color === 'yellow'
            ? 'from-yellow-400 to-pink-500'
            : 'from-blue-400 to-indigo-500'
        "
      >
        {{ title }}
      </span>
    </h2>
    <slot />
  </section>
</template>

<script lang="ts" setup>
defineProps<{ title: string; id: string; color: "yellow" | "blue" }>();
</script>
