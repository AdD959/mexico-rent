<template>
    <div class="border flex justify-between flex-col gap-5">
        <button class="flex bg-slate-500 self-end rounded-full w-14 h-8 relative" @click="themeButton.dark = !themeButton.dark; isDarkMode(themeButton.dark)">
            <div :class="themeButton.dark ? 'translate-x-7 mr-1' : 'translate-x-0 left-0 ml-1'" class="absolute w-6 h-6 bg-slate-200 rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 dark:bg-slate-950"></div>
        </button>
        <h1 class="self-center text-3xl">Mexico Budgeting</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            themeButton: {
                dark: false,
            },
        }
    },
    inject: ['isDarkMode'],
};
</script>

