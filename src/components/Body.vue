<template>
    <div>
        <div class="flex flex-col md:flex-row gap-10 w-full">
            <Chart :data="data" :isDarkMode="isDarkMode" :siVale="siValeValue" :totalSavings="totalSavings"
                :totalIncome="totalIncome" :totalDeficit="totalDeficit" :totalTax="totalTax" :totalCompanySavings="totalCompanySavings" :totalFood="totalFood"/>
            <Form :data="data" :totalIncome="totalIncome" :totalSavings="totalSavings" :totalDeficit="totalDeficit"
                :totalTax="totalTax" :totalFood="totalFood" />
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
            return (this.data.income1.value + this.data.income2.value) - this.totalCompanySavings || 0
        },
        totalExpenses() {
            return this.data.rent.value + this.data.tax.value + this.data.bills.value + this.data.food.value + this.data.activities.value
        },
        totalSavings() {
            return Math.round(this.totalIncome - this.totalExpenses) < 0 ? 0 : Math.round(this.totalIncome - this.totalExpenses)
        },
        totalDeficit() {
            return Math.round(this.totalIncome - this.totalExpenses) < 0 ? Math.round(this.totalIncome - this.totalExpenses) : 0
        },
        siValeValue() {
            return Math.round(this.data.siVale.value * 4307.68)
        },
        totalTax() {
            return Math.round(this.findThresholdIndex(this.data.income1.value) + this.findThresholdIndex(this.data.income2.value));
        },
        totalCompanySavings() {
            return Math.round(this.companySavings1 + this.companySavings2)
        },
        totalFood() {
            return Math.round(this.data.food.value - this.siValeValue < 0 ? 0 : this.data.food.value - this.siValeValue)
        },
        foodToSavings() {
            return this.data.food.value - this.totalFood
        }
    },
    data() {
        return {
            companySavings1: 0,
            companySavings2: 0,
            tax: {
                lower_threshold: [0.01, 746.05, 6332.06, 11128.02, 12935.83, 15487.72, 31236.50, 49233.01, 93993.91, 125325.21, 375975.62],
                upper_threshold: [746.04, 6332.05, 11128.01, 12935.82, 15487.71, 31236.49, 49233.00, 93993.90, 125325.20, 375975.61, 9999999999],
                fixed_fee: [0.00, 14.32, 371.83, 893.63, 1182.88, 1640.18, 5004.12, 9236.89, 22665.17, 32691.18, 117912.32],
                exceedance: [1.92, 6.40, 10.88, 16.00, 17.92, 21.36, 23.52, 30.00, 32.00, 34.00, 35.00],
            },
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
            savingsChanged: this.savingsChanged
        }
    },
    methods: {
        inputChanged(newVal, index) {
            typeof newVal === "string" ? newVal = 0 : newVal = newVal
            this.data[Object.keys(this.data)[index]].value = newVal
        },
        savingsChanged(val, savings, income2) {
            if (income2) {
                this.companySavings2 = savings ? this.data.income2.value * 0.13 : 0
            } else {
                this.companySavings1 = savings ? this.data.income1.value * 0.13 : 0
            }
        },
        findThresholdIndex(num) {
            for (let i = 0; i < this.tax.lower_threshold.length; i++) {
                if ((num >= this.tax.lower_threshold[i] && num < this.tax.upper_threshold[i]) ||
                    (num >= this.tax.lower_threshold[i] && !this.tax.upper_threshold[i + 1])) {
                    const totalTax = this.tax.fixed_fee[i] + (this.tax.exceedance[i] * (num - this.tax.lower_threshold[i]) / 100);
                    return totalTax
                }
            }
            return -1;
        }
    }
}
</script>