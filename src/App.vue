<template>
  <div :class="isDarkMode ? 'dark' : ''" ref="site" class="w-full h-full absolute">
    <main class="flex flex-col items-end dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-950 text-zinc-950 p-10 min-h-full">
      <Nav />
      <div class="flex items-center mx-auto flex-col w-full max-w-screen-lg">
        <Heading />
        <Body />
      </div>
    </main>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import Body from '@/components/Body.vue'
import Nav from '@/components/Nav.vue'
import { computed } from 'vue'
export default {
  components: {
    Heading,
    Body,
    Nav
  },
  data() {
    return {
      isDarkMode: false,
    }
  },
  provide() {
    return {
      isDarkMode: computed(() => this.isDarkMode),
      toggleDarkMode: this.toggleDarkMode
    }
  },
  mounted() {
    if (localStorage.isDarkModeTheme === 'true' || (!('isDarkModeTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true
    } else {
      this.isDarkMode = false
    }
  },
  methods: {
    setTheme(theme) {
      this.isDarkMode = theme
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
  },
  watch: {
    isDarkMode(newVal) {
      newVal ? localStorage.isDarkModeTheme = 'true' : localStorage.isDarkModeTheme = 'false'
    }
  }
}
</script>
