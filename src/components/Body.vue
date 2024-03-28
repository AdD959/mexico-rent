<template>
    <div>
        <div class="flex flex-col md:flex-row gap-10 w-full">
            <Chart :data="this.$store.state.data" :isDarkMode="isDarkMode" :siVale="siValeValue" :totalSavings="totalSavingsActual"
                :totalIncome="totalIncome" :totalDeficit="totalDeficit" :totalTax="totalTax"
                :totalCompanySavings="totalCompanySavings" :totalFood="totalFood" :totalIMSS="totalIMSS" />
            <Form :totalIncome="totalIncome" :totalSavings="totalSavings" :totalDeficit="totalDeficit"
                :totalTax="totalTax" :totalFood="totalFood" :siValeRemainder="siValeRemainder" :siValeValue="siValeValue"
                :totalCompanySavings="totalCompanySavings" :totalSavingsActual="totalSavingsActual" :isMXN="isMXN" :totalExpensesMinusRent="totalExpensesMinusRent" />
        </div>
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import Chart from '@/components/Chart.vue';

export default {
    props: {
        isDarkMode: Boolean,
        savingsCalc: '',
        isMXN: Boolean
    },
    components: {
        Form,
        Chart
    },
    computed: {
        totalIncome() {
            return Math.round((this.$store.state.data.income1.value + this.$store.state.data.income2.value) - this.totalCompanySavings || 0)
        },
        totalExpenses() {
            return Math.round(this.$store.state.data.rent.value + this.totalTax + this.$store.state.data.bills.value + this.totalFood + this.$store.state.data.activities.value + this.totalIMSS)
        },
        totalExpensesMinusRent() {
            return Math.round(this.totalTax+ this.$store.state.data.bills.value + this.totalFood + this.$store.state.data.activities.value)
        },
        totalSavings() {
            return Math.round(this.totalIncome - this.totalExpenses) < 0 ? 0 : Math.round(this.totalIncome - this.totalExpenses)
        },
        totalSavingsActual() {
            return Math.round(this.totalIncome - this.totalExpenses)
        },
        totalDeficit() {
            return Math.round(this.totalIncome - this.totalExpenses) < 0 ? Math.round(this.totalIncome - this.totalExpenses) : 0
        },
        savingsRentCalc() {
            return Math.round(((this.totalIncome - this.totalExpensesMinusRent) - this.savingsCalc) / 1000) * 1000 || 0;
        },
        siValeValue() {
            if (!this.isMXN) { return Math.round(this.$store.state.data.siVale.value * (4307.68 / 20.5) > this.$store.state.data.food.value ? this.$store.state.data.food.value : this.$store.state.data.siVale.value * (4307.68 / 20.5)) }
            return Math.round(this.$store.state.data.siVale.value * 4307.68 > this.$store.state.data.food.value ? this.$store.state.data.food.value : this.$store.state.data.siVale.value * 4307.68)
        },
        siValeRemainder() {
            return Math.round(this.$store.state.data.food.value - this.siValeValue < 0 ? 0 : this.$store.state.data.food.value - this.siValeValue)
        },
        totalTax() {
            if (!this.isMXN) { return Math.round(Math.round(this.findThresholdIndex(this.$store.state.data.income1.value * 20.5) + this.findThresholdIndex(this.$store.state.data.income2.value * 20.5)) / 20.5) }
            return Math.round(this.findThresholdIndex(this.$store.state.data.income1.value) + this.findThresholdIndex(this.$store.state.data.income2.value));
        },
        totalCompanySavings() {
            return Math.round(this.companySavings1 + this.companySavings2)
        },
        totalFood() {
            return Math.round(this.$store.state.data.food.value - this.siValeValue < 0 ? 0 : this.$store.state.data.food.value - this.siValeValue)
        },
        foodToSavings() {
            return Math.round(this.$store.state.data.food.value - this.totalFood)
        },
        totalIMSS() {
            return Math.round(Math.round((this.$store.state.data.income1.value + this.$store.state.data.income2.value)) * 0.03)
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
        }
            
    },
    provide() {
        return {
            inputChanged: this.inputChanged,
            checkboxToggled: this.checkboxToggled,
            savingsChanged: this.savingsChanged,
            setcheckBox: this.setcheckBox
        }
    },
    methods: {
        setcheckBox(val, index) {
            if (index === 0) {
                this.companySavings1 = Math.round(val ? JSON.parse(localStorage.getItem('Income 1')) * 0.11 : 0)
            } else if (index === 1) {
                this.companySavings2 = Math.round(val ? JSON.parse(localStorage.getItem('Income 2')) * 0.11 : 0)
            }
        },
        inputChanged(newVal, index) {
            typeof newVal === "string" ? newVal = 0 : newVal = newVal
            this.$store.state.data[Object.keys(this.$store.state.data)[index]].value = newVal
        },
        savingsChanged(val, savings, income2) {
            if (income2) {
                this.companySavings2 = Math.round(savings ? this.$store.state.data.income2.value * 0.11 : 0)
            } else {
                this.companySavings1 = Math.round(savings ? this.$store.state.data.income1.value * 0.11 : 0)
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
            return 0;
        },
    },
    watch: {
        savingsCalc(newVal) {
            this.$emit('rentCalc', this.savingsRentCalc)
        },
        totalIncome() {
            this.$emit('rentCalc', this.savingsRentCalc)
        },
        isMXN() {
            if (this.isMXN) {
                this.companySavings1 *= 20.5
                this.companySavings2 *= 20.5
                Object.keys(this.$store.state.datwhata).forEach((key) => {
                    if (this.$store.state.data[key].label === 'Si Vale') { return }
                    if (this.$store.state.data[key].label === 'Tax') { return }
                    this.$store.state.data[key].value *= 20.5
                });
            } else {
                this.companySavings1 /= 20.5
                this.companySavings2 /= 20.5
                Object.keys(this.$store.state.data).forEach((key) => {
                    if (this.$store.state.data[key].label === 'Si Vale') { return }
                    if (this.$store.state.data[key].label === 'Tax') { return }
                    this.$store.state.data[key].value /= 20.5
                });
            }
        }
    }
}
</script>