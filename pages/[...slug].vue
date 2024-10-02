<template>
  <ContentDoc v-slot="{ doc }">
    <article class="max-w-3xl mx-auto">
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          >
            {{ doc.title }}
          </span>
        </h1>
        <div class="flex items-center text-gray-400 mb-4">
          <calendar-icon class="h-5 w-5 mr-2" />
          <time :datetime="doc.date">{{ doc.date }}</time>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in doc.tags"
            :key="tag"
            class="bg-pink-600 text-white px-2 py-1 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <div class="prose prose-invert prose-pink max-w-none">
        <ContentRenderer :value="doc" />
      </div>

      <div class="mt-12">
        <nuxt-link
          href="/blog/pages"
          class="inline-flex items-center text-pink-400 hover:underline"
        >
          <arrow-left-icon class="h-4 w-4 mr-2" />
          Back to all posts
        </nuxt-link>
      </div>
    </article>
  </ContentDoc>
</template>

<script setup lang="ts">
import { CalendarIcon, ArrowLeftIcon } from "lucide-vue-next";
</script>
