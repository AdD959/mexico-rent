<template>
    <div class="flex-1 sm:min-w-[300px] border border-black dark:border-white">
        <canvas ref="myChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            chartData: {
                labels: ['Rent', 'Bills', 'Tax', 'Food', 'Activities', 'Savings'],
                datasets: [{
                    label: 'Monthly Outgoing Expenses',
                    data: [this.data.rent.value, this.data.bills.value, this.data.tax.value, this.data.food.value, this.data.activities.value, this.data.savings.value],
                    backgroundColor: ["#1c1c1c", "#3d3d3d", "#666666", "#E3D26F", "#5BBA6F", "#5adbff"],
                    hoverOffset: 4
                }]
            },
            chartOptions: {
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Outgoing Expenses Breakdown',
                        color: 'white',
                        font: {
                            size: 20,
                            weight: 'light',
                        },
                        padding: {
                            top: 0,
                            bottom: 40
                        }
                    },
                    emptyDoughnut: {
                        color: 'white',
                        width: 2,
                        radiusDecrease: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 20,
                            },
                            padding: 30
                        }
                    },
                },
            },
        };
    },
    mounted() {
        const ctx = this.$refs.myChart.getContext('2d');
        this.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: this.chartData,
            options: this.chartOptions
        });
    },
    watch: {
        data: {
            handler() {
                this.myChart.data.datasets[0].data = [this.data.rent.value, this.data.bills.value, this.data.tax.value, this.data.food.value, this.data.activities.value, this.data.savings.value]
                this.myChart.update();
            },
            deep: true
        }
    }
};
</script>

