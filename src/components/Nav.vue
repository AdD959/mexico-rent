<template>
    <div class="flex justify-between flex-col gap-5">
        <button class="flex bg-slate-500 self-end rounded-full w-14 h-8 relative" @click="toggleDarkMode">
            <div :class="isDarkMode ? 'translate-x-7 mr-1' : 'translate-x-0 left-0 ml-1'" class="absolute w-6 h-6 bg-slate-200 rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 dark:bg-slate-950"></div>
        </button>
    </div>
</template>

<script>
export default {
    inject: ['isDarkMode','toggleDarkMode'],
}
</script>
