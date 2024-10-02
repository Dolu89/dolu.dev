<template>
  <iframe
    :src="url"
    width="576"
    height="420"
    scrolling="no"
    frameBorder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowFullScreen
  ></iframe>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["url"]);
</script>
