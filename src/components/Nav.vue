<template>
    <div class="flex justify-between gap-5 z-20 items-center">
        <div class="flex flex-col relative">
            <label for="functions" class="text-xs absolute -top-4">Functions:</label>
            <select v-model="activeFunction" name="functions"
                class="border-l-8 h-[44px] text-lg p-2 border-r-8 border-transparent outline-none w-full dark:text-zinc-100 bg-zinc-300 dark:bg-zinc-800">
                <option value="" selected>none</option>
                <option value="monthSavings">Save X amount per month</option>
            </select>
        </div>
        <div class="relative">
            <div class="relative overflow-x-hidden transition-all duration-200"
                :class="activeFunction === 'monthSavings' ? 'w-40' : 'w-0'">
                <div class="relative">
                    <input v-model="savingsCalc" type="number"
                        class="border-l-8 text-lg p-2 pl-6 border-r-8 border-transparent outline-none dark:text-zinc-100 bg-zinc-300 dark:bg-zinc-800">
                    <span class="absolute top-1/2 left-3 transform -translate-y-1/2 text-lg pl-1">$</span>
                </div>
            </div>
            <aside :class="activeFunction === 'monthSavings' ? 'w-auto' : 'w-0 hidden'" class="bg-red-500 text-white p-1 px-2 text-xs -bottom-8 absolute left-0 transition-transform duration-200 cursor-default">${{ rentCalcValue }} max</aside>
        </div>
        <div class="flex items-center">
            <button class="flex bg-zinc-500 self-end rounded-full w-14 h-8 relative" @click="toggleCurrency">
                <div :class="isMXN ? 'translate-x-7 mr-1 bg-red-200 dark:bg-red-200' : 'translate-x-0 left-0 ml-1 bg-blue-200 dark:bg-blue-200'"
                    class="absolute w-6 h-6 rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 dark:bg-zinc-950">
                </div>
            </button>
        </div>
        <div class="flex items-center">
            <button class="flex bg-zinc-500 self-end rounded-full w-14 h-8 relative" @click="toggleDarkMode">
                <div :class="isDarkMode ? 'translate-x-7 mr-1' : 'translate-x-0 left-0 ml-1'"
                    class="absolute w-6 h-6 bg-zinc-200 rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 dark:bg-zinc-950">
                </div>
            </button>
        </div>
        <button @click="removeLocalStorage()">
            <svg class="fill-zinc-500 w-8 h-8" viewBox="0 0 408.483 408.483">
                <g>
                    <g>
                        <path
                            d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
			H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
			c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
			c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
			c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
			c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z" />
                        <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
			c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z" />
                    </g>
                </g>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        rentCalcValue: ''
    },
    inject: ['isDarkMode', 'toggleDarkMode'],
    data() {
        return {
            activeFunction: '',
            savingsCalc: '',
            isMXN: true
        }
    },
    watch: {
        savingsCalc(newVal, oldVal) {
            this.$emit('functionCalculateNecessaryRent', newVal)
        },
    },
    methods: {
        removeLocalStorage() {
            if (window.confirm("Are you sure you want to remove your stored values?")) {
                this.$emit('removeLocalStorage')
            }
        },
        toggleCurrency() {
            this.isMXN = !this.isMXN
            this.$emit('toggleCurrency', this.isMXN)
        }
    }
}
</script>
