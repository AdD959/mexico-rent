<template>
  <div id="container">
    <div class="section">
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Income 1</label>
          <div class="money">
            <input style="border-left-color: transparent" class="input" type="number" name="income1" v-model="income1">
          </div>
        </div>
        <div class="input-container">
          <label for="income2">Income 2</label>
          <div class="money">
            <input style="border-left-color: transparent" class="input" type="number" name="income2" v-model="income2">
          </div>
        </div>
      </div>
      <div class="input-collection">
        <div class="input-container">
          <div class="pcnt">
            <span>{{ percentageOfTotalIncome }}</span>
            <span>of total income</span>
          </div>
          <label for="income1">Rent</label>
          <div class="money">
            <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[0]}`" class="input" type="number"
            name="income1" v-model="rent">
          </div>
        </div>
        <div class="input-container disabled">
          <label for="income2">Tax</label>
          <div class="money">
            <input disabled :style="`border-left-color: ${chartData.datasets[0].backgroundColor[1]}; color: gray;`" class="input" type="number"
            name="income2" v-model="tax">
          </div>
        </div>
      </div>
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Bills</label>
          <div class="money">
            <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[2]}`" class="input" type="number"
            name="income1" v-model="bills">
          </div>
        </div>
        <div class="input-container">
          <label for="income2">Food</label>
          <div class="money">
            <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[3]}`" class="input" type="number"
            name="income2" v-model="food">
          </div>
        </div>
      </div>
      <div class="input-collection">
        <div class="input-container">
          <label for="income1">Activities</label>
          <div class="money">
            <input :style="`border-left-color: ${chartData.datasets[0].backgroundColor[4]}`" class="input" type="number"
            name="income1" v-model="eats">
          </div>
        </div>
        <div class="input-container disabled">
          <label :style="`color: ${totalSavings <= 0 ? '#ff00008c' : ''}`" for="income2">Savings</label>
          <div class="money">
            <input disabled
            :style="`border-left-color: ${ totalSavings <= 0 ? '#ff00008c' : chartData.datasets[0].backgroundColor[5]}; color: gray; color: ${totalSavings <= 0 ? '#ff00008c' : ''}`"
            class="input" type="number" name="income2" v-model="totalSavings">
          </div>
        </div>
      </div>
      <div class="input-container">
        <label for="si-vale">Si Vale (quantity of cards)</label>
        <div>
          <input
          class="input" type="number" name="si-vale" v-model="siVale">
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

.pcnt {
  position: absolute;
  left: -83px;
  top: 26px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

.pcnt > span {
  text-align: end;
  color: grey;
}

.pcnt > span:last-child {
  font-size: 12px;
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
  position: relative;
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
  padding-left: 20px;
  width: 200px;
  border-left: solid 8px;
}

.input-container > .money::before {
  content: '$';
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}

.input-container.disabled > div::before {
  color: gray;
}

.input-container > div:not(.pcnt) {
  position: relative;
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
      lower_threshold: [0.01, 746.05, 6332.06, 11128.02, 12935.83, 15487.72, 31236.50, 49233.01, 93993.91, 125325.21, 375975.62],
      upper_threshold: [746.04, 6332.05, 11128.01, 12935.82, 15487.71, 31236.49, 49233.00, 93993.90, 125325.20, 375975.61, 9999999999],
      fixed_fee: [0.00, 14.32, 371.83, 893.63, 1182.88, 1640.18, 5004.12, 9236.89, 22665.17, 32691.18, 117912.32],
      exceedance: [1.92, 6.40, 10.88, 16.00, 17.92, 21.36, 23.52, 30.00, 32.00, 34.00, 35.00],
      rent: 0,
      bills: 0,
      food: 0,
      eats: 0,
      savings: 0,
      income1: 0,
      income2: 0,
      siVale: 1,
      chartData: {
        labels: ['Rent', 'Tax', 'Bills', 'Food', 'Eating Out', 'Savings'],
        datasets: [{
          label: 'Monthly Outgoing Expenses',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: ["#1c1c1c", "#3d3d3d", "#666666", "#E3D26F", "#5BBA6F", "#5adbff", '#ff00008c'],
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
    siVale(newValue, oldValue) {
      return;
    }
  },
  computed: {
    totalIncome() {
      return this.income1 + this.income2;
    },
    totalExpenses() {
      return this.rent + this.tax + this.bills + this.food + this.eats;
    },
    tax() {
      return Math.round(this.findThresholdIndex(this.income1) + this.findThresholdIndex(this.income2));
    },
    totalSavings() {
      return Math.round(this.totalIncome - this.totalExpenses);
    },
    totalFood() {
      return Math.round(this.food - (this.siVale * 4307.68));
    },
    percentageOfTotalIncome() {
      return `${Math.round((this.rent / this.totalIncome) * 100)}%`;
    }
  },
  methods: {
    updateChart() {
      this.chartData.datasets[0].data[0] = this.rent;
      this.chartData.datasets[0].data[1] = this.tax;
      this.chartData.datasets[0].data[2] = this.bills;
      this.chartData.datasets[0].data[3] = this.food;
      this.chartData.datasets[0].data[4] = this.eats;
      this.chartData.datasets[0].data[5] = this.totalSavings <= 0 ? 0 : this.totalSavings;
      this.chartData.datasets[0].data[6] = this.totalSavings <= 0 ? this.totalSavings * -1 : 0;
      localStorage.setItem('chartData', JSON.stringify(this.chartData));
      localStorage.setItem('income1', JSON.stringify(this.income1));
      localStorage.setItem('income2', JSON.stringify(this.income2));
      this.myChart.update();
    },
    findThresholdIndex(num) {
      for (let i = 0; i < this.lower_threshold.length; i++) {
        if ((num >= this.lower_threshold[i] && num < this.upper_threshold[i]) ||
          (num >= this.lower_threshold[i] && !this.upper_threshold[i + 1])) {
          const totalTax = this.fixed_fee[i] + (this.exceedance[i] * (num - this.lower_threshold[i]) / 100);
          return totalTax
        }
      }
      return -1;
    }
  },
  mounted() {
    const chartData = JSON.parse(localStorage.getItem('chartData'));
    if (chartData) {
      this.rent = chartData.datasets[0].data[0];
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
