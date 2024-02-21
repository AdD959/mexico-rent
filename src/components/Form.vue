<template>
    <form class="w-full sm:min-w-[300px] inline-grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-4" action="">
        <InputStandard :data="income1" />
        <InputStandard :data="income2" />
        <InputStandard :data="rent" />
        <InputStandard :data="bills" />
        <InputStandard :data="tax" />
        <InputStandard :data="food" />
        <InputStandard :data="activities" />
        <InputStandard :data="savings" />
        <InputStandard :data="siVale" />
        <InputCurrency />
    </form>
</template>

<script>
import InputStandard from '@/components/Input-Standard.vue'
import InputCurrency from '@/components/Input-Currency.vue'
export default {
    components: {
        InputStandard,
        InputCurrency
    },    
    data() {
        return {
            income1: {
                label: 'Income 1', 
                pricing: true,
            },
            income2: {
                label: 'Income 2', 
                pricing: true,
            },
            rent: {
                label: 'Rent', 
                color: 'dark:border-zinc-400 border-zinc-700',
                pricing: true,
            },
            bills: {
                label: 'Bills', 
                color: 'dark:border-zinc-500 border-zinc-600',
                pricing: true,
            },
            tax: {
                label: 'Tax', 
                color: 'dark:border-zinc-600 border-zinc-500',
                pricing: true,
            },
            food: {
                label: 'Food', 
                color: 'border-yellow-500',
                pricing: true,
            },
            activities: {
                label: 'Activities', 
                color: 'border-green-500',
                pricing: true,
            },
            savings: {
                label: 'Savings', 
                color: 'border-red-500',
                pricing: true,
            },
            siVale: {
                label: 'Si Vale', 
                color: 'border-white',
                pricing: true,
            },
        };
    },
    methods: {
        // Your methods go here
    },
    computed: {
        // Your computed properties go here
    },
    mounted() {
        // Your initialization code goes here
    },
};
</script>
