<template>
  <div id="container">
    <div class="section">
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Income 1</label>
          <input style="border-left-color: transparent" class="input" type="number" name="income1" v-model="income1">
        </div>
        <div class="input-container">
          <label for="income2">Income 2</label>
          <input style="border-left-color: transparent" class="input" type="number" name="income2" v-model="income2">
        </div>
      </div>
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Rent</label>
          <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[0]}`" class="input" type="number"
            name="income1" v-model="rent">
        </div>
        <div class="input-container">
          <label for="income2">Tax</label>
          <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[1]}`" class="input" type="number"
            name="income2" v-model="tax">
        </div>
      </div>
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Bills</label>
          <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[2]}`" class="input" type="number"
            name="income1" v-model="bills">
        </div>
        <div class="input-container">
          <label for="income2">Food</label>
          <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[3]}`" class="input" type="number"
            name="income2" v-model="food">
        </div>
      </div>
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Eating Out</label>
          <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[4]}`" class="input" type="number"
            name="income1" v-model="eats">
        </div>
        <div class="input-container">
          <label :style="`color: ${totalSavings === 0 ? '#ff00008c' : ''}`" for="income2">Savings</label>
          <input disabled :style="`border-left-color: ${chartData.datasets[0].backgroundColor[5]}; color: gray; color: ${totalSavings === 0 ? '#ff00008c' : ''}`" class="input" type="number"
            name="income2" v-model="savings">
        </div>
      </div>
    </div>
    <div class="section">
      <h2>${{ totalIncome }}MXN</h2>
      <canvas ref="myChart"></canvas>
    </div>
    <div class="section"></div>
  </div>
</template>

<style scoped>
* {
  color: white;
}

#container {
  display: flex;
  justify-content: center;
  width: 900px;
}

canvas {
  width: 800px;
  height: 800px;
}

.section {
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.section:nth-child(2) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-size: 18px;
  margin-bottom: 4px;
  color: white;
}

.input-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-collection {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  max-width: 500px;
  margin-bottom: 16px
}

.input {
  background-color: rgb(33 33 33);
  outline: none;
  font-size: 24px;
  border: 0;
  padding: 4px;
  color: white;
  padding-left: 8px;
  width: 100%;
  border-left: solid 8px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      rent: 0,
      tax: 0,
      bills: 0,
      food: 0,
      eats: 0,
      savings: 0,
      income1: 0,
      income2: 0,
      chartData: {
        labels: ['Rent', 'Tax', 'Bills', 'Food', 'Eating Out', 'Savings'],
        datasets: [{
          label: 'Monthly Outgoing Expenses',
          data: [0, 0, 0, 0, 0, 0],
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
  watch: {
    rent(newValue) {
      this.updateChart();
    },
    tax(newValue) {
      this.updateChart();
    },
    bills(newValue) {
      this.updateChart();
    },
    food(newValue) {
      this.updateChart();
    },
    eats(newValue) {
      this.updateChart();
    },
    savings(newValue) {
      this.updateChart();
    },
    income1(newValue) {
      this.updateChart();
    },
    income2(newValue) {
      this.updateChart();
    },
  },
  computed: {
    totalIncome() {
      return this.income1 + this.income2;
    },
    totalExpenses() {
      return this.rent + this.tax + this.bills + this.food + this.eats;
    },
    totalSavings() {
      return this.totalIncome - this.totalExpenses < 0 ? 0 : this.totalIncome - this.totalExpenses;
    }
  },
  methods: {
    updateChart() {
      this.chartData.datasets[0].data[0] = this.rent; 
      this.chartData.datasets[0].data[1] = this.tax; 
      this.chartData.datasets[0].data[2] = this.bills; 
      this.chartData.datasets[0].data[3] = this.food; 
      this.chartData.datasets[0].data[4] = this.eats; 
      this.chartData.datasets[0].data[5] = this.totalSavings; 
      localStorage.setItem('chartData', JSON.stringify(this.chartData));
      localStorage.setItem('income1', JSON.stringify(this.income1));
      localStorage.setItem('income2', JSON.stringify(this.income2));
      this.myChart.update();
    }
  },
  mounted() {
    const chartData = JSON.parse(localStorage.getItem('chartData'));
    if (chartData) {
      this.rent = chartData.datasets[0].data[0];
      this.tax = chartData.datasets[0].data[1];
      this.bills = chartData.datasets[0].data[2];
      this.food = chartData.datasets[0].data[3];
      this.eats = chartData.datasets[0].data[4];
      this.savings = chartData.datasets[0].data[5];
      this.chartData = chartData;
      this.income1 = JSON.parse(localStorage.getItem('income1'));
      this.income2 = JSON.parse(localStorage.getItem('income2'));
    }
    const ctx = this.$refs.myChart.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.chartData,
      options: this.chartOptions
    });
  }
}

</script>
