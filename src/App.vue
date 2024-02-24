<template>
  <div :class="isDarkMode ? 'dark' : ''" ref="site" class="w-full h-full absolute">
    <main class="flex flex-col items-end dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-950 text-zinc-950 p-10 min-h-full">
      <Nav @removeLocalStorage="removeAndRerender()" />
      <div class="flex flex-1 justify-center items-center mx-auto flex-col w-full max-w-screen-lg sm:-mt-[72px]">
        <Heading />
        <Body :key="componentKey" :isDarkMode="isDarkMode" />
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
      componentKey: 0,
      html: document.querySelector('html')
    }
  },
  provide() {
    return {
      isDarkMode: computed(() => this.isDarkMode),
      toggleDarkMode: this.toggleDarkMode,
    }
  },
  created() {
    if (localStorage.isDarkModeTheme === 'true' || (!('isDarkModeTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.setTheme(true)
    } else {
      this.setTheme(false)
    }
  },
  methods: {
    setTheme(theme) {
      this.isDarkMode = theme
      if (this.isDarkMode) {
        this.html.classList.remove('bg-zinc-200')
        this.html.classList.add('bg-zinc-950')
      } else {
        this.html.classList.remove('bg-zinc-950')
        this.html.classList.add('bg-zinc-200')
      }
    },
    toggleDarkMode() {
      this.setTheme(!this.isDarkMode)
    },
    removeAndRerender() {
      const theme = localStorage.isDarkModeTheme
      localStorage.clear()
      localStorage.isDarkModeTheme = theme
      this.componentKey += 1
    },
  },
  watch: {
    isDarkMode(newVal) {
      newVal ? localStorage.isDarkModeTheme = 'true' : localStorage.isDarkModeTheme = 'false'
    }
  }
}
</script>
