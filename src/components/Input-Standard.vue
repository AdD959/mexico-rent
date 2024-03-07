<template>
    <div class="relative">
        <label class="text-zinc-800 dark:text-zinc-400" :for="processLabel">{{ data.label }}</label>
        <label class="text-zinc-800 dark:text-zinc-400 absolute right-0 text-xs" :for="`${data.label}-checkbox`">{{
            checkboxLabel }}</label>
        <div class="relative flex items-center">
            <input
                :class="this.borderColor, readonly ? 'text-zinc-600 bg-zinc-400 dark:text-zinc-500 dark:bg-zinc-900 cursor-default' : 'dark:text-zinc-100 bg-zinc-300 dark:bg-zinc-800'"
                :readonly="readonly || false" class="border-l-8 text-lg p-2 pl-6 outline-none appearance-none w-full"
                type="number" v-model="inputVal">
            <input v-show="checkbox" type="checkbox" class="ml-5 mr-3" :name="`${data.label}-checkbox`"
                @input="toggleCheckbox">
            <span v-show="data.pricing" class="absolute top-1/2 left-3 transform -translate-y-1/2 text-lg pl-1">$</span>
        </div>
    </div>
</template>

<script>
import { readonly } from 'vue';

export default {
    props: {
        data: Object,
        readonly: Boolean,
        value: Number,
        color: String,
        checkbox: Boolean,
        checkboxLabel: String,
        isMXN: Boolean
    },
    data() {
        return {
            inputVal: this.value || 0,
            inputStoredVal: 0,
            borderColor: this.color || this.data.color || 'border-transparent'
        }
    },
    inject: ['inputChanged', 'savingsChanged'],
    mounted() {
        this.inputVal = JSON.parse(localStorage.getItem(this.data.label)) || 0
    },
    updated() {
        this.borderColor = this.color || this.data.color || 'border-transparent'
        if (this.readonly) { this.inputVal = this.value || 0 }
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
            if (this.isMXN) {
                let oldStoredVal = JSON.parse(localStorage.getItem(this.data.label))
                newVal === '' ? 0 : localStorage.setItem(this.data.label, newVal)
                this.inputChanged(this.inputVal, this.data.index)
            }
        },
        isMXN(newVal, oldVal) {
            this.inputVal = Math.round(this.data.value)
        }
    },
    methods: {
        toggleCheckbox(event) {
            this.savingsChanged(this.inputVal, event.target.checked, this.data.index)
        }
    }
};
</script>
