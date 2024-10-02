<template>
  <section id="hero" class="py-20 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        Dolu
      </span>
    </h1>
    <p class="text-xl text-gray-300 mb-8">
      Fullstack Wizard | Code Alchemist | Pixel Perfectionist
    </p>
    <div class="flex justify-center space-x-4">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
      >
        <component :is="social.icon" class="h-6 w-6" />
        <span class="sr-only">{{ social.name }}</span>
      </a>
    </div>
  </section>

  <home-section title="About" id="about" color="yellow">
    <p class="text-gray-300 mb-4 leading-relaxed">
      I'm a fullstack web developer in freelance, with a preference for backend
      development. I primarily work on open source applications for
      Bitcoin/Lightning network, and Nostr.
    </p>
  </home-section>

  <home-section title="Coolest Projects" id="projects" color="blue">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="project in projects"
        :key="project.name"
        @click="openProjectModal(project)"
        class="border border-white/10 rounded-lg p-6 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 bg-white/5 backdrop-blur-sm cursor-pointer"
      >
        <h3 class="text-xl font-semibold mb-2">{{ project.name }}</h3>
        <p class="text-gray-400 mb-4">{{ project.shortDescription }}</p>
        <span class="text-pink-400 hover:underline inline-flex items-center">
          Learn more
          <arrow-right-icon class="ml-2 h-4 w-4" />
        </span>
      </div>
    </div>
  </home-section>

  <home-section title="Latest Blog Posts" id="blog" color="yellow">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="post in blogPosts"
        :key="post._id"
        class="border border-white/10 rounded-lg p-6 hover:border-pink-400 transition-all duration-300 bg-white/5 backdrop-blur-sm"
      >
        <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
        <p class="text-gray-400 mb-4">{{ post.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">{{ post.date }}</span>
          <a
            :href="post._path"
            class="text-pink-400 hover:underline inline-flex items-center"
          >
            Read more
            <arrow-right-icon class="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </home-section>

  <home-section title="Get in touch" id="contact" color="blue">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="contact in contacts"
        :key="contact.method"
        class="flex items-center space-x-4 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors"
      >
        <component :is="contact.icon" class="h-6 w-6 text-pink-400" />
        <div>
          <h3 class="font-semibold">{{ contact.method }}</h3>
          <p class="text-gray-300 text-wrap">{{ contact.value }}</p>
        </div>
      </div>
    </div>
  </home-section>

  <home-section title="Donate" id="donate" color="yellow">
    <div class="flex justify-center">
      <lightning-widget
        name="Dolu"
        accent="#000000"
        to="dolu@npub.cash"
        image="https://pbs.twimg.com/profile_images/1577320325158682626/igGerO9A_400x400.jpg"
        amounts="1000,10000,100000"
      />
    </div>
  </home-section>

  <!-- Project Modal -->
  <transition name="fade">
    <div
      v-if="selectedProject"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeProjectModal"
    >
      <div
        class="bg-gray-900 rounded-lg w-full max-w-lg mx-auto p-6 relative animate-modal-open overflow-y-auto max-h-[90vh]"
        @click.stop
      >
        <button
          @click="closeProjectModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <x-icon class="h-6 w-6" />
        </button>
        <h2
          class="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500"
        >
          {{ selectedProject.name }}
        </h2>
        <p class="text-gray-300 mb-6">{{ selectedProject.description }}</p>
        <div class="flex flex-wrap gap-4 mb-6">
          <a
            v-if="selectedProject.liveUrl"
            :href="selectedProject.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <external-link-icon class="mr-2 h-4 w-4" />
            Live Demo
          </a>
          <a
            :href="selectedProject.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <github-icon class="mr-2 h-4 w-4" />
            GitHub
          </a>
        </div>
        <h3 class="text-xl font-semibold mb-2">Technologies Used:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li v-for="tech in selectedProject.technologies" :key="tech">
            {{ tech }}
          </li>
        </ul>
        <p v-if="selectedProject.funFact" class="text-gray-400 italic">
          {{ selectedProject.funFact }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import {
  GithubIcon,
  OrigamiIcon,
  TwitterIcon,
  ArrowRightIcon,
  XIcon,
  ExternalLinkIcon,
} from "lucide-vue-next";

const socials = [
  { name: "GitHub", icon: GithubIcon, url: "https://github.com/dolu89" },
  { name: "Twitter", icon: TwitterIcon, url: "https://twitter.com/dolu_web" },
  {
    name: "Nostr",
    icon: OrigamiIcon,
    url: "https://njump.me/npub1txukm7xckhnxkwu450sm59vh2znwm45mewaps4awkef2tvsgh4vsf7phrl",
  },
];

const projects = [
  {
    name: "Ghost relay",
    shortDescription: "A Nostr relay where events are truly ephemeral.",
    description:
      "It deletes events right after they have been 'queried' by a user. Useful for very specific applications where no traces are desired.",
    liveUrl: "https://ghost.dolu.dev",
    githubUrl: "https://github.com/dolu89/ghost-relay",
    technologies: ["Bun", "TypeScript", "SQLite"],
    funFact: "It took me ~6 hours to create the first version",
  },
  {
    name: "Bips.xyz",
    shortDescription: "The easiest way to view and share BIPs",
    description:
      "Bips.xyz is a mirror of the official BIPs repository. It provides a clean, user-friendly interface for browsing Bitcoin Improvement Proposals, making it easy to find and share the latest updates with the community.",
    liveUrl: "https://bips.xyz",
    githubUrl: "https://github.com/dolu89/bitcoin-bips",
    technologies: ["Node.js", "AdonisJS", "Cache"],
    funFact:
      "I'm still not happy with the latest codebase, but it's a work in progress... probably forever.",
  },
  {
    name: "Nips.nostr.com",
    shortDescription: "The easiest way to view and share NIPs",
    description:
      "Exactly the same thing as Bips.xyz, but for Nostr Improvement Proposals.",
    liveUrl: "https://nips.nostr.com",
    githubUrl: "https://github.com/dolu89/bitcoin-bips",
    technologies: ["Node.js", "AdonisJS", "Cache"],
    funFact: "Nope, I'm not happy either with the latest codebase",
  },
  {
    name: "Zerologin",
    shortDescription: "A passwordless authentication server (using LNURL-auth)",
    description:
      "Zerologin is a passwordless authentication server. By using it, you can easily manage your authentication in only few steps.",
    githubUrl: "https://github.com/zerologin/zerologin",
    technologies: ["Node.js", "AdonisJS", "PostgreSQL", "SSE"],
  },
];

const { data: blogPostsData } = await useAsyncData("home", () =>
  queryContent("blog").sort({ date: -1 }).limit(4).find()
);
const blogPosts = blogPostsData.value;

const contacts = [
  { method: "Twitter", value: "@dolu_web", icon: TwitterIcon },
  {
    method: "Nostr",
    value: "dolu@dolu.dev",
    icon: OrigamiIcon,
  },
];

const selectedProject = ref(null);

const openProjectModal = (project) => {
  selectedProject.value = project;
  document.body.style.overflow = "hidden";
};

const closeProjectModal = () => {
  selectedProject.value = null;
  document.body.style.overflow = "";
};
</script>

<style>
@import url("https://api.fonts.coollabs.io/css2?family=Space+Mono:wght@400;700&display=swap");

body {
  font-family: "Space Mono", monospace;
}

/* Add modal opening animation */
@keyframes modalOpen {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal-open {
  animation: modalOpen 0.3s ease-out forwards;
}

/* Modal transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
