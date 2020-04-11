<template>
  <div class="table-fields">
    <table>
      <tr>
        <th>A</th>
        <td>{{ this.randomSigns }}</td>
        <td>{{ initialValue }}</td>
        <td v-show="this.randomSigns == '+'">&#x2B06;</td>
        <td v-show="this.randomSigns == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleInterval()">
      <span v-show="this.startStop === true">Stop</span>
      <span v-show="this.startStop === false">Start</span>
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
      startStop: true,
      initialValue: 3,
      signsArray: ['+', '-'],
      randomNumber: Number((Math.random() * 1 + 1).toFixed(2)),
      // numberInterval: setInterval(this.calculations, 2000),
      numberInterval: null
      // signsInterval: setInterval(this.randomSigns, 2000)
    }
  },
  computed: {
    randomSigns () {
      const sign = this.signsArray[Math.floor(Math.random() * this.signsArray.length)]
      return sign
    }
  },
  methods: {
    toggleInterval () {
      this.startStop = !this.startStop
      if (this.startStop) {
        this.numberInterval = setInterval(this.calculations, 2000)
      } else {
        clearInterval(this.numberInterval)
      }
      console.log(this.startStop)
    },
    calculations () {
      this.randomSigns === '+' ? this.initialValue += this.randomNumber : this.initialValue -= this.randomNumber
    }
  },
  mounted () {
    this.numberInterval = setInterval(this.calculations, 2000)
  }
}
</script>
