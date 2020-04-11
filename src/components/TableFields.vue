<template>
  <div class="table-fields">
    <table>
      <tr>
        <th>A</th>
        <td class="sign">{{ this.randomSign }}</td>
        <td>{{ randomValue }}</td>
        <td v-show="this.randomSign == '+'">&#x2B06;</td>
        <td v-show="this.randomSign == '-'">&#x2B07;</td>
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
      randomValue: 3,
      randomSign: '+',
      signsArray: ['+', '-'],
      interval: null
    }
  },
  computed: {
  },
  methods: {
    toggleInterval () {
      this.startStop = !this.startStop
      if (this.startStop) {
        this.interval = setInterval(this.calculations, 2000)
      } else {
        clearInterval(this.interval)
      }
    },
    calculations () {
      const randomNumber = Number((Math.random() * 1 + 1).toFixed(2))
      this.randomSign = this.signsArray[Math.floor(Math.random() * this.signsArray.length)]
      this.randomSign === '+' ? this.randomValue += randomNumber : this.randomValue -= randomNumber
    }
  },
  mounted () {
    this.interval = setInterval(this.calculations, 2000)
  }
}
</script>

<style lang="scss" scoped>
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
