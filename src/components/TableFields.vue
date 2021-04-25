<template>
  <div>
    <div class="wrapper" v-for="(field, index) in fields" :key="index">
      <table>
        <tr>
          <th>{{ field }}</th>
          <td class="sign">{{ randomSign[index] }}</td>
          <td class="value">{{ initialValues[index].toFixed(2) }}</td>
          <td v-show="$store.state.randomSign[index] === '+'">&#x2B06;</td>
          <td v-show="$store.state.randomSign[index] === '-'">&#x2B07;</td>
        </tr>
      </table>

      <button
        @click="toggleInterval(field)"
        v-if="field === 'A'"
        :class="[startStopA ? 'button-start' : 'button-stop']"
      >
        <span v-show="startStopA">Stop</span>
        <span v-show="!startStopA">Start</span>
      </button>

      <button
        @click="toggleInterval(field)"
        v-if="field === 'B'"
        :class="[startStopB ? 'button-start' : 'button-stop']"
      >
        <span v-show="startStopB">Stop</span>
        <span v-show="!startStopB">Start</span>
      </button>

      <button
        @click="toggleInterval(field)"
        v-if="field === 'C'"
        :class="[startStopC ? 'button-start' : 'button-stop']"
      >
        <span v-show="startStopC">Stop</span>
        <span v-show="!startStopC">Start</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TableFields',

  data () {
    return {
      startStopA: true,
      startStopB: true,
      startStopC: true,
      initialValueA: 3,
      initialValueB: 3,
      initialValueC: 3,
      arraysInterval: null
    };
  },

  computed: {
    ...mapState([
      'changes',
      'timer',
      'fields',
      'signs',
      'randomSign',
      'randomNumbers'
    ]),

    initialValues () {
      return [this.initialValueA, this.initialValueB, this.initialValueC];
    },
  },

  methods: {
    ...mapMutations(['replaceNumbersArray']),

    toggleInterval (field) {
      // button toggle

      if (field === 'A') {
        this.startStopA = !this.startStopA;
        if (this.startStopA) {
          this.timer[0] = setInterval(() => {
            this.calculations('A');
          }, 2000);
        } else {
          clearInterval(this.timer[0]);
        }
      }

      if (field === 'B') {
        this.startStopB = !this.startStopB;
        if (this.startStopB) {
          this.timer[1] = setInterval(() => {
            this.calculations('B');
          }, 2000);
        } else {
          clearInterval(this.timer[1]);
        }
      }

      if (field === 'C') {
        this.startStopC = !this.startStopC;
        if (this.startStopC) {
          this.timer[2] = setInterval(() => {
            this.calculations('C');
          }, 2000);
        } else {
          clearInterval(this.timer[2]);
        }
      }
      if (!this.startStopA && !this.startStopB && !this.startStopC) {
        clearInterval(this.arraysInterval);
      }
    },

    calculations (field) {
      this.fields.forEach((value, index) => {
        if (field === value) {
          this.randomSign[index] = this.signs[
            Math.floor(Math.random() * this.signs.length)
          ];
          const date = new Date();
          const newChange = [];

          newChange.field = field;
          newChange.indicator = this.randomSign[index];
          newChange.value = this.randomNumbers[index];
          newChange.time = date.toLocaleTimeString();

          this.changes[index].push(newChange);
        }
      });

      if (field === 'A') {
        this.randomSign[0] === '+'
          ? (this.initialValueA += this.randomNumbers[0])
          : (this.initialValueA -= this.randomNumbers[0]);
      }

      if (field === 'B') {
        this.randomSign[1] === '+'
          ? (this.initialValueB += this.randomNumbers[1])
          : (this.initialValueB -= this.randomNumbers[1]);
      }

      if (field === 'C') {
        this.randomSign[2] === '+'
          ? (this.initialValueC += this.randomNumbers[2])
          : (this.initialValueC -= this.randomNumbers[2]);
      }
    }
  },

  beforeUpdate () {
    const array = [this.startStopA, this.startStopB, this.startStopC];
    array.forEach((value, index) => {
      if (!value) {
        clearInterval(this.timer[index]);
      }
    });
  },

  mounted () {
    this.arraysInterval = setInterval(this.replaceNumbersArray, 2000);

    this.fields.forEach((value, index) => {
      this.timer[index] = setInterval(() => {
        this.calculations(value);
      }, 2000);
    });

    this.initialValueA = this.$root.initialValueA || 3;
    this.initialValueB = this.$root.initialValueB || 3;
    this.initialValueC = this.$root.initialValueC || 3;

    this.startStopA = !this.$root.startStopA || !this.startStopA;
    this.startStopB = !this.$root.startStopB || !this.startStopB;
    this.startStopC = !this.$root.startStopC || !this.startStopC;

  },

  beforeDestroy () {
    clearInterval(this.arraysInterval);

    this.$root.initialValueA = this.initialValueA;
    this.$root.initialValueB = this.initialValueB;
    this.$root.initialValueC = this.initialValueC;

    this.$root.startStopA = !this.startStopA;
    this.$root.startStopB = !this.startStopB;
    this.$root.startStopC = !this.startStopC;

    this.timer.forEach(value => {
      clearInterval(value);
    });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 15px;
  &:last-child {
    margin-top: 0;
  }
}

button {
  border: 1px solid transparent;
  border-radius: 0;
  background-color: #42b983;
  color: #ffffff;
  margin-top: 7px;
  padding: 6px 12px;
  font-weight: bold;
  width: 80px;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
}

.button-stop {
  background-color: #e95959;
}

.button-start {
  background-color: #42b983;
}

.sign {
  width: 10px;
}

.value {
  width: 50px;
}
</style>
