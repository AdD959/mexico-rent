<template>
    <div class="flex flex-col sm:flex-row flex-wrap gap-10 w-full">
        <Chart :data="data" :isDarkMode="isDarkMode"/>
        <div>
            <Form :data="data" />
        </div>
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import Chart from '@/components/Chart.vue';

export default {
    props: {
        isDarkMode: Boolean
    },
    components: {
        Form,
        Chart
    },
    data() {
        return {
            data: {
                income1: {
                    index: 0,
                    label: 'Income 1', 
                    pricing: true,
                },
                income2: {
                    index: 1,
                    label: 'Income 2', 
                    pricing: true,
                },
                rent: {
                    index: 2,
                    label: 'Rent', 
                    color: 'dark:border-zinc-400 border-zinc-700',
                    pricing: true,
                },
                bills: {
                    index: 3,
                    label: 'Bills', 
                    color: 'dark:border-zinc-500 border-zinc-600',
                    pricing: true,
                },
                tax: {
                    index: 4,
                    label: 'Tax', 
                    color: 'dark:border-zinc-600 border-zinc-500',
                    pricing: true,
                },
                food: {
                    index: 5,
                    label: 'Food', 
                    color: 'border-amber-300',
                    pricing: true,
                },
                activities: {
                    index: 6,
                    label: 'Activities', 
                    color: 'border-green-300',
                    pricing: true,
                },
                savings: {
                    index: 7,
                    label: 'Savings', 
                    color: 'border-sky-300',
                    pricing: true,
                },
                siVale: {
                    index: 8,
                    label: 'Si Vale', 
                    color: 'border-white',
                    pricing: true,
                },
            }
        }
    },
    provide() {
        return {
            inputChanged: this.inputChanged,
        }
    },
    methods: {
        inputChanged(newVal, index) {
            this.data[Object.keys(this.data)[index]].value = newVal
        }
    }
}
</script>