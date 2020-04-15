<template>
  <div>
    <table class="table-a">
      <tr>
        <th>A</th>
        <td class="sign">{{ this.randomSign.A }}</td>
        <td>{{ initialValue.A }}</td>
        <td v-show="this.randomSign.A == '+'">&#x2B06;</td>
        <td v-show="this.randomSign.A == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleintervalA()">
      <span v-show="this.startStop.A">Stop</span>
      <span v-show="!this.startStop.A">Start</span>
    </button>
    <table class="table-b">
      <tr>
        <th>B</th>
        <td class="sign">{{ this.randomSign.B }}</td>
        <td>{{ initialValue.B }}</td>
        <td v-show="this.randomSign.B == '+'">&#x2B06;</td>
        <td v-show="this.randomSign.B == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleintervalB()">
      <span v-show="this.startStop.B">Stop</span>
      <span v-show="!this.startStop.B">Start</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TableFields',
  props: {
    changesA: {
      type: Array,
      required: false
    },
    changesB: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      startStop: {
        A: true,
        B: true
      },
      initialValue: {
        A: 3,
        B: 3
      },
      randomNumbersArray: [],
      randomSign: {
        A: '+',
        B: '+'
      },
      signsArray: ['+', '-'],
      interval: {
        A: null,
        B: null
      },
      localChanges: {
        A: [],
        B: []
      }
    }
  },
  computed: {},
  methods: {
    firstObjectA () {
      const date = new Date()
      const foA = {} // foA = first object A
      foA.field = 'A'
      foA.value = Number((Math.random() * 1 + 1).toFixed(2))
      foA.time = date.toLocaleTimeString()
      this.changesA.push(foA)
      this.$emit('update:changesA', this.localChanges.A)
    },
    firstObjectB () {
      const date = new Date()
      const foB = {} // foA = first object A
      foB.field = 'A'
      foB.value = Number((Math.random() * 1 + 1).toFixed(2))
      foB.time = date.toLocaleTimeString()
      this.changesA.push(foB)
      this.$emit('update:changesB', this.localChanges.B)
    },
    replaceNumbersArray () { // replace random A, B numbers at time interval
      const n1 = Number((Math.random() * 1 + 1).toFixed(2)) // n1 = first number
      const n2 = Number((Math.random() * 1 + 1).toFixed(2)) // n2 = second number
      this.randomNumbersArray.splice(0, 2, n1, n2)
    },
    toggleintervalA () {
      this.startStop.A = !this.startStop.A
      if (this.startStop.A) {
        this.interval.A = setInterval(this.calculationsA, 2000)
      } else {
        clearInterval(this.interval.A)
      }
    },
    toggleintervalB () {
      this.startStop.B = !this.startStop.B
      if (this.startStop.B) {
        this.interval.B = setInterval(this.calculationsB, 2000)
      } else {
        clearInterval(this.interval.B)
      }
    },
    calculationsA () {
      this.randomSign.A = this.signsArray[
        Math.floor(Math.random() * this.signsArray.length)
      ]
      this.randomSign.A === '+'
        ? (this.initialValue.A += this.randomNumbersArray[0])
        : (this.initialValue.A -= this.randomNumbersArray[0])
      const date = new Date()
      const newChange = {}
      newChange.field = 'A'
      newChange.value = this.randomNumbersArray[0]
      newChange.time = date.toLocaleTimeString()
      this.changesA.push(newChange)
      this.$emit('update:changesA', this.localChanges.A)
    },
    calculationsB () {
      this.randomSign.B = this.signsArray[
        Math.floor(Math.random() * this.signsArray.length)
      ]
      this.randomSign.B === '+'
        ? (this.initialValue.B += this.randomNumbersArray[1])
        : (this.initialValue.B -= this.randomNumbersArray[1])
      const date = new Date()
      const newChange = {}
      newChange.field = 'B'
      newChange.value = this.randomNumbersArray[1]
      newChange.time = date.toLocaleTimeString()
      this.changesB.push(newChange)
      this.$emit('update:changesB', this.localChanges.B)
    }
  },
  mounted () {
    setInterval(this.replaceNumbersArray, 2000)
    this.firstObjectA()
    this.firstObjectB()
    this.interval.A = setInterval(this.calculationsA, 2000)
    this.interval.B = setInterval(this.calculationsB, 2000)

    const values = Object.values(this.startStop)
    console.log(values)
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
