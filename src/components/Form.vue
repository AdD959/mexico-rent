<template>
    <div class="flex-1">
        <h2 class="text-center mb-4 under">Total Income: {{ totalIncome }}</h2>
        <form class="w-full sm:min-w-[300px] inline-grid grid-cols-[repeat(auto-fit,minmax(180px,_1fr))] gap-4" action="">
            <InputStandard :isMXN="isMXN" :data="data.income1" :checkbox="true" checkboxLabel="13% Company Savings" />
            <InputStandard :isMXN="isMXN" :data="data.income2" :checkbox="true" checkboxLabel="13% Company Savings" />
            <div class="relative">
                <InputStandard :isMXN="isMXN" :data="data.rent" :checkboxLabel="`% of income`"/>
                <div class="absolute right-0 top-1/2 pr-2 text-zinc-600 dark:text-zinc-500">{{ Math.round(data.rent.value / totalIncome * 100) }}%</div>
            </div>
            <InputStandard :isMXN="isMXN" :data="data.bills" />
            <div class="relative">
                <InputStandard :isMXN="isMXN" :data="data.food" checkboxLabel="Actual Spends"/>
                <div class="absolute right-0 top-1/2 pr-2 text-zinc-600 dark:text-zinc-500">(${{ siValeRemainder }})</div>
            </div>
            <InputStandard :data="data.siVale" :checkboxLabel="`$${siValeValue} discount`" />
            <InputStandard :isMXN="isMXN" :data="data.activities" />
            <InputStandard :data="data.tax" :readonly="true" :value="totalTax" />
            <div class="relative">
                <InputStandard :data="data.savings" :readonly="true" :value="totalSavingsActual" :color="color" checkboxLabel="End of Year bonus:" />
                <div class="absolute right-0 top-1/2 pr-2 text-zinc-600 dark:text-zinc-500">${{ bonus }}</div>

            </div>
            <InputCurrency />
        </form>
    </div>
</template>

<script>
import InputStandard from '@/components/Input-Standard.vue'
import InputCurrency from '@/components/Input-Currency.vue'
export default {
    props: {
        data: Object,
        totalIncome: Number,
        totalSavings: Number,
        totalDeficit: Number,
        totalTax: Number,
        siValeRemainder: Number,
        siValeValue: Number,
        totalCompanySavings: Number,
        totalSavingsActual: Number,
        isMXN: Boolean
    },
    data() {
        return {
            bonus: this.EndOfYearBonus
        }
    },  
    components: {
        InputStandard,
        InputCurrency,
    },
    computed: {
        color() {
            return this.totalSavings > 0 ? 'border-sky-500' : 'border-red-500'
        },
        EndOfYearBonus() {
            return (this.totalCompanySavings * 2) * 12
        }
    },
    watch: {
        isMXN(isMXN, oldVal) {
            if (isMXN) {
                this.bonus = this.EndOfYearBonus
            } else {
                this.bonus = Math.round(this.EndOfYearBonus / 20.5)
            }
        }
    }
}
</script>
