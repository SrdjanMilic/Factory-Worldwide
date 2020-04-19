<template>
  <div>
    <table>
      <tr>
        <th>A</th>
        <td class="sign">{{ this.randomSign.A }}</td>
        <td>{{ valueA }}</td>
        <td v-show="this.randomSign.A == '+'">&#x2B06;</td>
        <td v-show="this.randomSign.A == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleInterval('A')" :class="[startStopA ? 'button-start' : 'button-stop']">
      <span v-show="this.startStopA">Stop</span>
      <span v-show="!this.startStopA">Start</span>
    </button>
    <table>
      <tr>
        <th>B</th>
        <td class="sign">{{ this.randomSign.B }}</td>
        <td>{{ valueB }}</td>
        <td v-show="this.randomSign.B == '+'">&#x2B06;</td>
        <td v-show="this.randomSign.B == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleInterval('B')" :class="[startStopB ? 'button-start' : 'button-stop']">
      <span v-show="this.startStopB">Stop</span>
      <span v-show="!this.startStopB">Start</span>
    </button>
    <table>
      <tr>
        <th>C</th>
        <td class="sign">{{ this.randomSign.C }}</td>
        <td>{{ valueC }}</td>
        <td v-show="this.randomSign.C == '+'">&#x2B06;</td>
        <td v-show="this.randomSign.C == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleInterval('C')" :class="[startStopC ? 'button-start' : 'button-stop']">
      <span v-show="this.startStopC">Stop</span>
      <span v-show="!this.startStopC">Start</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "TableFields",
  props: {
    changesA: {
      type: Array,
      required: false
    },
    changesB: {
      type: Array,
      required: false
    },
    changesC: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      timerA: undefined,
      timerB: undefined,
      timerC: undefined,
      fields: ["A", "B", "C"],
      startStopA: true,
      startStopB: true,
      startStopC: true,
      initialValueA: 3,
      initialValueB: 3,
      initialValueC: 3,
      randomNumbersArray: [],
      randomSign: {
        A: "+",
        B: "+",
        C: "+"
      },
      signsArray: ["+", "-"]
    };
  },
  computed: {
    valueA() {
      return this.initialValueA.toFixed(2);
    },
    valueB() {
      return this.initialValueB.toFixed(2);
    },
    valueC() {
      return this.initialValueC.toFixed(2);
    }
  },
  methods: {
    firstObjects() {
      // creates first objects A, B
      for (let i = 0; i < this.fields.length; i++) {
        const date = new Date();
        const obj = {};
        obj.field = this.fields[i];
        obj.value = Number((Math.random() * 1 + 1).toFixed(2));
        obj.time = date.toLocaleTimeString();
        this.changesA.push({ ...obj });
        this.changesB.push({ ...obj });
        this.changesC.push({ ...obj });
        this.$emit("update:changesA", [...this.changesA]);
        this.$emit("update:changesB", [...this.changesB]);
        this.$emit("update:changesC", [...this.changesC]);
      }
    },
    replaceNumbersArray() {
      // replace random A, B numbers at time interval
      const numberA = Number((Math.random() * 1 + 1).toFixed(2)); // first number A
      const numberB = Number((Math.random() * 1 + 1).toFixed(2)); // first number B
      const numberC = Number((Math.random() * 1 + 1).toFixed(2)); // first number B
      this.randomNumbersArray.splice(0, 3, numberA, numberB, numberC);
    },
    toggleInterval(field) {
      // button toggle
      if (field === "A") {
        this.startStopA = !this.startStopA;
        if (this.startStopA) {
          this.timerA = setInterval(() => {
            this.calculations("A");
          }, 2000);
        } else {
          clearInterval(this.timerA);
        }
      }
      if (field === "B") {
        this.startStopB = !this.startStopB;
        if (this.startStopB) {
          this.timerB = setInterval(() => {
            this.calculations("B");
          }, 2000);
        } else {
          clearInterval(this.timerB);
        }
      }
      if (field === "C") {
        this.startStopC = !this.startStopC;
        if (this.startStopC) {
          this.timerC = setInterval(() => {
            this.calculations("C");
          }, 2000);
        } else {
          clearInterval(this.timerC);
        }
      }
    },
    calculations(field) {
      if (field === "A") {
        this.randomSign.A = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        this.randomSign.A === "+"
          ? (this.initialValueA += this.randomNumbersArray[0])
          : (this.initialValueA -= this.randomNumbersArray[0]);
        const date = new Date();
        const newChange = {};
        newChange.field = "A";
        newChange.value = this.randomNumbersArray[0];
        newChange.time = date.toLocaleTimeString();
        this.changesA.push(newChange);
        this.$emit("update:changesA", [...this.changesA]);
      }
      if (field === "B") {
        this.randomSign.B = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        this.randomSign.B === "+"
          ? (this.initialValueB += this.randomNumbersArray[1])
          : (this.initialValueB -= this.randomNumbersArray[1]);
        const date = new Date();
        const newChange = {};
        newChange.field = "B";
        newChange.value = this.randomNumbersArray[1];
        newChange.time = date.toLocaleTimeString();
        this.changesB.push(newChange);
        this.$emit("update:changesB", [...this.changesB]);
      }
      if (field === "C") {
        this.randomSign.C = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        this.randomSign.C === "+"
          ? (this.initialValueC += this.randomNumbersArray[2])
          : (this.initialValueC -= this.randomNumbersArray[2]);
        const date = new Date();
        const newChange = {};
        newChange.field = "C";
        newChange.value = this.randomNumbersArray[2];
        newChange.time = date.toLocaleTimeString();
        this.changesC.push(newChange);
        this.$emit("update:changesC", [...this.changesC]);
      }
    }
  },
  beforeUpdate() {
    if (!this.startStopA) {
      clearInterval(this.timerA);
    }
    if (!this.startStopB) {
      clearInterval(this.timerB);
    }
    if (!this.startStopC) {
      clearInterval(this.timerC);
    }
  },
  mounted() {
    if (this.changesA && this.changesB && this.changesC === []) {
      this.firstObjects();
    }
    setInterval(this.replaceNumbersArray, 2000);

    this.initialValueA = this.$root.initialValueA || 3;
    this.timerA = setInterval(() => {
      this.calculations("A");
    }, 2000);

    this.initialValueB = this.$root.initialValueB || 3;
    this.timerB = setInterval(() => {
      this.calculations("B");
    }, 2000);

    this.initialValueC = this.$root.initialValueC || 3;
    this.timerC = setInterval(() => {
      this.calculations("C");
    }, 2000);

    this.startStopA = !this.$root.startStopA || !this.startStopA;
    this.startStopB = !this.$root.startStopB || !this.startStopB;
    this.startStopC = !this.$root.startStopC || !this.startStopC;
  },
  beforeDestroy() {
    this.$root.initialValueA = this.initialValueA;
    this.$root.initialValueB = this.initialValueB;
    this.$root.initialValueC = this.initialValueC;
    this.$root.startStopA = !this.startStopA;
    this.$root.startStopB = !this.startStopB;
    this.$root.startStopC = !this.startStopC;
    clearInterval(this.timerA);
    clearInterval(this.timerB);
    clearInterval(this.timerC);
  }
};
</script>

<style lang="scss" scoped>
button {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  border: 1px solid transparent;
  border-radius: 0;
  background-color: #42b983;
  color: #ffffff;
  margin-top: 7px;
  padding: 5px 10px;
  font-weight: bold;

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
  width: 12px;
  text-align: center;
}
</style>
