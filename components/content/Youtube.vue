<template>
  <iframe
    width="560"
    height="315"
    :src="url"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["url"]);
</script>
