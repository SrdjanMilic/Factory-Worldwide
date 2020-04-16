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
    <button @click="toggleInterval('A')">
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
    <button @click="toggleInterval('B')">
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
      fields: ['A', 'B'],
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
    firstObjects () {
      for (let i = 0; i < this.fields.length; i++) {
        const date = new Date()
        const obj = {}
        obj.field = this.fields[i]
        obj.value = Number((Math.random() * 1 + 1).toFixed(2))
        obj.time = date.toLocaleTimeString()
        this.changesA.push(obj[0])
        this.changesB.push(obj[1])
        this.$emit('update:changesA', this.localChanges.A)
        this.$emit('update:changesB', this.localChanges.B)
      }
    },
    replaceNumbersArray () { // replace random A, B numbers at time interval
      const n1 = Number((Math.random() * 1 + 1).toFixed(2)) // n1 = first number (A)
      const n2 = Number((Math.random() * 1 + 1).toFixed(2)) // n2 = second number (B)
      this.randomNumbersArray.splice(0, 2, n1, n2)
    },
    toggleInterval (field) {
      if (field === 'A') {
        this.startStop.A = !this.startStop.A
        if (this.startStop.A) {
          this.interval.A = setInterval(this.calculationsA, 2000)
        } else {
          clearInterval(this.interval.A)
        }
      }
      if (field === 'B') {
        this.startStop.B = !this.startStop.B
        if (this.startStop.B) {
          this.interval.B = setInterval(this.calculationsB, 2000)
        } else {
          clearInterval(this.interval.B)
        }
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
    this.firstObjects()
    setInterval(this.replaceNumbersArray, 2000)
    this.interval.A = setInterval(this.calculationsA, 2000)
    this.interval.B = setInterval(this.calculationsB, 2000)
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
