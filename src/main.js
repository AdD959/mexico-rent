import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            currency: '$',
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
                IMSS: {
                    index: 9,
                    label: 'IMSS',
                    color: 'dark:border-zinc-400 border-zinc-700',
                    pricing: true,
                    value: 0,
                },
            }
        }
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')
