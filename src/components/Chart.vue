<template>
    <div class="flex-1 w-auto">
        <canvas ref="myChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
    props: {
        data: Object,
        isDarkMode: Boolean,
        siVale: Number,
        totalSavings: Number,
        totalDeficit: Number,
        totalIncome: Number,
        totalCompanySavings: Number,
    },
    data() {
        return {
            backgroundColorsTheme: {
                light: ["#71717a", "#a1a1aa", "#d4d4d8", "#eab308", "#fde047", "#22c55e", "#0ea5e9", "#ef4444", '#0ea5e9'],
                dark: ["#18181b", "#27272a", "#52525b", "#eab308", "#fde047", "#22c55e", "#0ea5e9", "#ef4444", '#0ea5e9']
            },
            borderColorsTheme: {
                light: '#52525b',
                dark: '#18181b',
            },
            chartData: null,
            chartOptions: {
                animations: {
                    colors: {
                        duration: 0
                    }
                },
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    emptyDoughnut: {
                        color: 'white',
                        width: 2,
                        radiusDecrease: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 16,
                            },
                            padding: 16
                        }
                    },
                },
            },
        };
    },
    created() {
        this.chartData = {
            labels: ['Rent', 'Bills', 'Tax', 'Food', 'Si Vale', 'Activities', 'Savings', 'Overspend','Company Savings'],
            datasets: [{
                data: [this.data.rent.value, this.data.bills.value, this.data.tax.value, this.foodValue, this.siVale, this.data.activities.value, this.totalSavings, this.totalDeficit, this.totalCompanySavings],
                backgroundColor: this.isDarkMode ? this.backgroundColorsTheme.dark : this.backgroundColorsTheme.light,
                borderColor: this.isDarkMode ? this.borderColorsTheme.dark : this.borderColorsTheme.light,
                hoverOffset: 4
            }]
        }
    },
    mounted() {
        const ctx = this.$refs.myChart.getContext('2d');
        this.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: this.chartData,
            options: this.chartOptions
        });
    },
    computed: {
        foodValue() {
            return this.data.food.value - this.siVale < 0 ? 0 : this.data.food.value - this.siVale
        }
    },
    watch: {
        data: {
            handler() {
                this.myChart.data.datasets[0].data = [this.data.rent.value, this.data.bills.value, this.data.tax.value, this.foodValue, this.siVale, this.data.activities.value, this.totalSavings, this.totalDeficit, this.totalCompanySavings]
                this.myChart.update()
            },
            deep: true
        },
        isDarkMode() {
            if (this.isDarkMode) {
                this.myChart.data.datasets[0].backgroundColor = this.backgroundColorsTheme.dark
                this.myChart.data.datasets[0].borderColor = this.borderColorsTheme.dark
            } else {
                this.myChart.data.datasets[0].backgroundColor = this.backgroundColorsTheme.light
                this.myChart.data.datasets[0].borderColor = this.borderColorsTheme.light

            }
            this.myChart.update()
        },
        totalCompanySavings() {
            this.myChart.data.datasets[0].data[8] = this.totalCompanySavings
            this.myChart.update()
        },
    },
};
</script>

