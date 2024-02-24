<template>
    <div>
        <div class="flex flex-col md:flex-row gap-10 w-full">
            <Chart :data="data" :isDarkMode="isDarkMode" :siVale="siValeValue" :totalSavings="totalSavings" :totalDeficit="totalDeficit"/>
            <Form :data="data" :totalIncome="totalIncome" :totalSavings="totalSavings" :totalDeficit="totalDeficit"/>
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
    computed: {
        totalIncome() {
            return this.data.income1.value + this.data.income2.value || 0
        },
        totalExpenses() {
            return this.data.rent.value + this.data.tax.value + this.data.bills.value + this.data.food.value + this.data.activities.value
        },
        totalSavings() {
            return Math.round(this.totalIncome - this.totalExpenses) < 0 ? 0 : Math.round(this.totalIncome - this.totalExpenses)
        },
        totalDeficit() {
            return Math.round(this.totalIncome - this.totalExpenses) < 0 ?  Math.round(this.totalIncome - this.totalExpenses) : 0
        },
        siValeValue() {
            return Math.round(this.data.siVale.value * 4250)
        }
    },
    data() {
        return {
            data: {
                income1: {
                    index: 0,
                    label: 'Income 1',
                    pricing: true,
                    value: 0,
                },
                income2: {
                    index: 1,
                    label: 'Income 2',
                    pricing: true,
                    value: 0,
                },
                rent: {
                    index: 2,
                    label: 'Rent',
                    color: 'dark:border-zinc-400 border-zinc-700',
                    pricing: true,
                    value: 0,
                },
                bills: {
                    index: 3,
                    label: 'Bills',
                    color: 'dark:border-zinc-500 border-zinc-600',
                    pricing: true,
                    value: 0,
                },
                tax: {
                    index: 4,
                    label: 'Tax',
                    color: 'dark:border-zinc-600 border-zinc-500',
                    pricing: true,
                    value: 0,
                },
                food: {
                    index: 5,
                    label: 'Food',
                    color: 'border-amber-300',
                    pricing: true,
                    value: 0,
                },
                siVale: {
                    index: 6,
                    label: 'Si Vale',
                    color: 'border-yellow-300',
                    pricing: false,
                    value: 0,
                },
                activities: {
                    index: 7,
                    label: 'Activities',
                    color: 'border-green-300',
                    pricing: true,
                    value: 0,
                },
                savings: {
                    index: 8,
                    label: 'Savings',
                    color: 'border-sky-300',
                    pricing: true,
                    value: 0,
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
            typeof newVal === "string" ? newVal = 0 : newVal = newVal
            this.data[Object.keys(this.data)[index]].value = newVal
        }
    }
}
</script>