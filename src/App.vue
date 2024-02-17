<template>
  <div :class="dark ? 'dark' : ''" ref="site">
    <main class="dark:bg-slate-950 dark:text-slate-400 bg-slate-400 text-slate-950">
      <button @click="setTheme()">click here</button>
      <h1>Et excepteur laboris veniam velit consequat incididunt pariatur esse commodo proident.</h1>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dark: false
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
    setTheme() {
      this.dark = !this.dark
      localStorage.theme = this.dark ? 'dark' : 'light'
    }
  },
}
</script>
