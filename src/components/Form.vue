<template>
    <div class="flex-1">
        <h2 class="text-center mb-4">Total Income: {{ totalIncome }}</h2>
        <form class="w-full sm:min-w-[300px] inline-grid grid-cols-[repeat(auto-fit,minmax(180px,_1fr))] gap-4" action="">
            <InputStandard :data="data.income1" />
            <InputStandard :data="data.income2" />
            <InputStandard :data="data.rent" />
            <InputStandard :data="data.bills" />
            <InputStandard :data="data.tax" />
            <InputStandard :data="data.food" />
            <InputStandard :data="data.activities" />
            <InputStandard :data="data.savings" />
            <InputStandard :data="data.siVale" />
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
        totalIncome: Number
    },
    components: {
        InputStandard,
        InputCurrency
    },
};
</script>
