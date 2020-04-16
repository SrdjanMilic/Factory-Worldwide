<template>
  <div>
    <div class="fields" v-for="(field, index) in fields" :key="index">
      <table>
        <tr>
          <th>{{ field }}</th>
          <td class="sign">{{ Object.values(randomSign)[index] }}</td>
          <td>{{ Object.values(initialValue)[index] }}</td>
          <td v-show="Object.values(randomSign)[index] == '+'">&#x2B06;</td>
          <td v-show="Object.values(randomSign)[index] == '-'">&#x2B07;</td>
        </tr>
      </table>
      <button @click="toggleInterval(field)">
        <span v-show="Object.values(startStop)[index]">Stop</span>
        <span v-show="!Object.values(startStop)[index]">Start</span>
      </button>
    </div>
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
          this.interval.A = setInterval(() => { this.calculations('A') }, 2000)
        } else {
          clearInterval(this.interval.A)
        }
      }
      if (field === 'B') {
        this.startStop.B = !this.startStop.B
        if (this.startStop.B) {
          this.interval.B = setInterval(() => { this.calculations('B') }, 2000)
        } else {
          clearInterval(this.interval.B)
        }
      }
    },
    calculations (field) {
      if (field === 'A') {
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
      }
      if (field === 'B') {
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
    }
  },
  mounted () {
    this.firstObjects()
    setInterval(this.replaceNumbersArray, 2000)
    this.interval.A = setInterval(() => { this.calculations('A') }, 2000)
    this.interval.B = setInterval(() => { this.calculations('B') }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.fields {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
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
