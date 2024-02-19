<template>
  <div :class="isDarkMode ? 'dark' : ''" ref="site" class="w-full h-full">
    <main class="dark:bg-slate-950 dark:text-slate-400 bg-slate-400 text-slate-950 w-full h-full p-10">
      <Nav />
      <Heading />
      <Body />
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
