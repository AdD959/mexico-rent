<template>
    <div>
        <label class="text-zinc-800 dark:text-zinc-400" :for="processLabel">{{ data.label }}</label>
        <div class="relative">
            <input :class="data.color ? data.color : 'border-transparent'"
                class="border-l-8 text-lg dark:text-zinc-50 bg-zinc-300 dark:bg-zinc-800 p-2 pl-6 outline-none appearance-none w-full"
                type="number" v-model="inputVal">
            <span v-show="data.pricing" class="absolute top-1/2 left-3 transform -translate-y-1/2 text-lg pl-1">$</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            inputVal: null,
            inputStoredVal: null
        }
    },
    inject: ['inputChanged'],
    mounted() {
        this.inputVal = JSON.parse(localStorage.getItem(this.data.label)) || null
    },
    computed: {
        processLabel() {
            let noSpaces = this.data.label.replace(/\s+/g, '')
            let lowerCase = noSpaces.toLowerCase()
            return lowerCase
        },
    },
    watch: {
        inputVal(newVal, oldVal) {
            let oldStoredVal = JSON.parse(localStorage.getItem(this.data.label))
            newVal === '' ? null : localStorage.setItem(this.data.label, newVal)
            this.inputChanged(this.inputVal, this.data.index)
        }
    }
};
</script>
