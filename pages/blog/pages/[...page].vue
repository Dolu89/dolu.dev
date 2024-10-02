<template>
  <section class="py-20">
    <h1 class="text-4xl md:text-6xl font-bold mb-8 text-center">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        Blog
      </span>
    </h1>

    <div class="grid grid-cols-1 gap-12">
      <article
        v-for="post in blogPosts"
        :key="post._id"
        class="border border-white/10 rounded-lg p-6 hover:border-pink-400 transition-all duration-300 bg-white/5 backdrop-blur-sm"
      >
        <h2 class="text-2xl font-semibold mb-4">
          <nuxt-link
            :href="`${post._path}`"
            class="hover:text-pink-400 transition-colors"
            >{{ post.title }}
          </nuxt-link>
        </h2>
        <p class="text-gray-300 mb-4">{{ post.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-400">{{ post.date }}</span>
          <nuxt-link
            :href="`${post._path}`"
            class="text-pink-400 hover:underline inline-flex items-center"
          >
            Read more
            <arrow-right-icon class="ml-2 h-4 w-4" />
          </nuxt-link>
        </div>
      </article>
    </div>

    <div class="mt-12 flex justify-center items-center space-x-4">
      <button
        :disabled="!hasPreviousPage"
        @click="navigateToPage(currentPage - 1)"
        class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span class="text-gray-300"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >

      <button
        :disabled="!hasNextPage"
        @click="navigateToPage(currentPage + 1)"
        class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from "lucide-vue-next";

const nuxtApp = useNuxtApp();
const currentPage =
  Number(nuxtApp.$router.currentRoute.value.params.page[0]) || 1;
console.log(nuxtApp.$router.currentRoute.value.params.page[0]);
const pageLimit = 5;

const { data: blogPostsTotalData } = await useAsyncData("totalPosts", () =>
  queryContent("blog").count()
);
const totalPosts = blogPostsTotalData.value ?? 0;
const totalPages = Math.ceil(totalPosts / pageLimit);

const { data: blogPostsData } = await useAsyncData("blogPosts", () =>
  queryContent("blog")
    .sort({ date: -1 })
    .skip((currentPage - 1) * pageLimit)
    .limit(pageLimit)
    .find()
);
const blogPosts = blogPostsData.value;

const hasNextPage = currentPage < totalPages;
const hasPreviousPage = currentPage > 1;

function navigateToPage(page: number) {
  nuxtApp.$router.push(`/blog/pages/${page}`);
}
</script>
