<template>
  <div class="table-fields">
    <table class="table-a">
      <tr>
        <th>A</th>
        <td class="sign">{{ this.randomSignA }}</td>
        <td>{{ initialValueA }}</td>
        <td v-show="this.randomSignA == '+'">&#x2B06;</td>
        <td v-show="this.randomSignA == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleIntervalA()">
      <span v-show="this.startStopA === true">Stop</span>
      <span v-show="this.startStopA === false">Start</span>
    </button>
    <table class="table-b">
      <tr>
        <th>B</th>
        <td class="sign">{{ this.randomSignB }}</td>
        <td>{{ initialValueB }}</td>
        <td v-show="this.randomSignB == '+'">&#x2B06;</td>
        <td v-show="this.randomSignB == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleIntervalB()">
      <span v-show="this.startStopB === true">Stop</span>
      <span v-show="this.startStopB === false">Start</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TableFields',
  props: {
    msg: String
  },
  data () {
    return {
      startStopA: true,
      startStopB: true,
      initialValueA: 3,
      initialValueB: 3,
      randomNumbersArray: [],
      randomSignA: '+',
      randomSignB: '+',
      signsArray: ['+', '-'],
      intervalA: null,
      intervalB: null
    }
  },
  computed: {
  },
  methods: {
    initialNumbersArray () {
      for (let i = 0; i < 2; i++) {
        const randomNumber = Number((Math.random() * 1 + 1).toFixed(2))
        this.randomNumbersArray.push(randomNumber)
      }
    },
    replaceNumbersArray () {
      const n1 = Number((Math.random() * 1 + 1).toFixed(2))
      const n2 = Number((Math.random() * 1 + 1).toFixed(2))
      this.randomNumbersArray.splice(0, 2, n1, n2)
    },
    toggleIntervalA () {
      this.startStopA = !this.startStopA
      if (this.startStopA) {
        this.intervalA = setInterval(this.calculationsA, 2000)
      } else {
        clearInterval(this.intervalA)
      }
    },
    toggleIntervalB () {
      this.startStopB = !this.startStopB
      if (this.startStopB) {
        this.intervalB = setInterval(this.calculationsB, 2000)
      } else {
        clearInterval(this.intervalB)
      }
    },
    calculationsA () {
      this.randomSignA = this.signsArray[Math.floor(Math.random() * this.signsArray.length)]
      this.randomSignA === '+' ? this.initialValueA += this.randomNumbersArray[0] : this.initialValueA -= this.randomNumbersArray[0]
      const d = new Date()
      console.log(d)
      console.log(this.randomNumbersArray[0])
    },
    calculationsB () {
      this.randomSignB = this.signsArray[Math.floor(Math.random() * this.signsArray.length)]
      this.randomSignB === '+' ? this.initialValueB += this.randomNumbersArray[1] : this.initialValueB -= this.randomNumbersArray[1]
    },
    date () {
      const d = new Date()
      console.log(d)
    }
  },
  mounted () {
    this.initialNumbersArray()
    this.initialNumbersArray = setInterval(this.replaceNumbersArray, 2000)
    this.intervalA = setInterval(this.calculationsA, 2000)
    this.intervalB = setInterval(this.calculationsB, 2000)
    // console.log(setInterval(this.date, 2000))
  }
}
</script>

<style lang="scss" scoped>
  .table-b {
    margin-top: 15px;
  }
  .sign {
    width: 12px;
    text-align: center;
  }
  button {
    border: 1px solid transparent;
    border-radius: 0;
    background-color: #42b983;
    color: #ffffff;
    margin-top: 7px;
    padding: 5px 10px;

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
</style>
