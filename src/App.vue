<template>
  <div :class="dark ? 'dark' : ''" ref="site" class="w-full h-full">
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
export default {
  components: {
    Heading,
    Body,
    Nav
  },
  data() {
    return {
      dark: false
    }
  },
  provide() {
    return {
      isDarkMode: (isDarkMode) => { this.setTheme(isDarkMode) }
    }
  },
  mounted() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.dark = true
    } else {
      this.dark = false
    }
  },
  methods: {
    setTheme(theme) {
      if (theme) { this.dark = theme } else { this.dark = !this.dark }
      localStorage.theme = this.dark ? 'dark' : 'light'
    }
  },
}
</script>
