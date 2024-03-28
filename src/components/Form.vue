<template>
    <div class="flex-1">
        <h2 class="text-center mb-4">Total Income: {{ $store.state.currency }}{{ totalIncome }}</h2>

        <form class="w-full sm:min-w-[300px] inline-grid grid-cols-[repeat(auto-fit,minmax(180px,_1fr))] gap-4" action="">
            <InputStandard :isMXN="isMXN" :data="this.$store.state.data.income1" :checkbox="true" checkboxLabel="13% Company Savings" />
            <InputStandard :isMXN="isMXN" :data="this.$store.state.data.income2" :checkbox="true" checkboxLabel="13% Company Savings" />
            <div class="relative">
                <div>
                    <InputStandard :isMXN="isMXN" :data="this.$store.state.data.rent" :checkboxLabel="`% of income`"/>
                </div>
                <div class="group  absolute right-0 top-1/2 pr-2 text-zinc-600 dark:text-zinc-500 cursor-default">
                    <span class="group-hover:hidden block absolute text-[8px] -top-[8px] right-5">GROSS</span>
                    <span class="group-hover:block hidden absolute text-[8px] -top-[8px] right-[7px]">EXPENSED</span>
                    <div class="group-hover:hidden block">{{ Math.round(this.$store.state.data.rent.value / totalIncome * 100) }}%</div>
                    <div class="group-hover:block hidden">{{ Math.round(this.$store.state.data.rent.value / (totalIncome - totalExpensesMinusRent) * 100)  }}%</div>
                </div>

            </div>
            <InputStandard :isMXN="isMXN" :data="this.$store.state.data.bills" />
            <div class="relative">
                <InputStandard :isMXN="isMXN" :data="this.$store.state.data.food" checkboxLabel="Actual Spends"/>
                <div class="absolute right-0 top-1/2 pr-2 text-zinc-600 dark:text-zinc-500">({{ $store.state.currency }}{{ siValeRemainder }})</div>
            </div>
            <InputStandard :isMXN="isMXN" :data="this.$store.state.data.siVale" :checkboxLabel="`${ $store.state.currency }${siValeValue} discount`" />
            <InputStandard :isMXN="isMXN" :data="this.$store.state.data.activities" />
            <InputStandard :data="this.$store.state.data.tax" :readonly="true" :value="totalTax" />
            <div class="relative">
                <InputStandard :data="this.$store.state.data.savings" :readonly="true" :value="totalSavingsActual" :color="color" checkboxLabel="End of Year bonus:" />
                <div class="absolute right-0 top-1/2 pr-2 text-zinc-600 dark:text-zinc-500">{{ $store.state.currency }}{{ EndOfYearBonus }}</div>
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
        isMXN: Boolean,
        totalExpensesMinusRent: Number,
    },
    data() {
        return {
            expensed: false
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
}
</script>
