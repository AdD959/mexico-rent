<template>
    <div class="flex flex-col sm:flex-row flex-wrap gap-10 w-full">
        <Chart />
        <div class="flex-1">
            <Form />
        </div>
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import Chart from '@/components/Chart.vue';

export default {
    components: {
        Form,
        Chart
    }
}
</script>