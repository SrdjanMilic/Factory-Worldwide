<template>
  <div>
    <table>
      <tr>
        <th>A</th>
        <td class="sign">{{ this.randomSign[0] }}</td>
        <td>{{ valueA }}</td>
        <td v-show="this.randomSign[0] == '+'">&#x2B06;</td>
        <td v-show="this.randomSign[0] == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleInterval('A')" :class="[startStopA ? 'button-start' : 'button-stop']">
      <span v-show="this.startStopA">Stop</span>
      <span v-show="!this.startStopA">Start</span>
    </button>
    <table>
      <tr>
        <th>B</th>
        <td class="sign">{{ this.randomSign[1] }}</td>
        <td>{{ valueB }}</td>
        <td v-show="this.randomSign[1] == '+'">&#x2B06;</td>
        <td v-show="this.randomSign[1] == '-'">&#x2B07;</td>
      </tr>
    </table>
    <button @click="toggleInterval('B')" :class="[startStopB ? 'button-start' : 'button-stop']">
      <span v-show="this.startStopB">Stop</span>
      <span v-show="!this.startStopB">Start</span>
    </button>
    <table>
      <tr>
        <th>C</th>
        <td class="sign">{{ this.randomSign[2] }}</td>
        <td>{{ valueC }}</td>
        <td v-show="this.randomSign[2] == '+'">&#x2B06;</td>
        <td v-show="this.randomSign[2] == '-'">&#x2B07;</td>
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
      timer: [undefined, undefined, undefined],
      fields: ["A", "B", "C"],
      startStopA: true,
      startStopB: true,
      startStopC: true,
      initialValueA: 3,
      initialValueB: 3,
      initialValueC: 3,
      randomNumbersArray: [],
      randomSign: ["+", "+", "+"],
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
      // creates first objects A, B, C...
      for (let i = 0; i < this.fields.length; i++) {
        const obj = {};
        const date = new Date();
        obj.field = this.fields[i];
        obj.value = Number((Math.random() * 1 + 1).toFixed(2));
        obj.indicator = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
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
      const numberC = Number((Math.random() * 1 + 1).toFixed(2)); // first number C
      this.randomNumbersArray.splice(0, 3, numberA, numberB, numberC);
    },
    toggleInterval(field) {
      // button toggle
      if (field === "A") {
        this.startStopA = !this.startStopA;
        if (this.startStopA) {
          this.timer[0] = setInterval(() => {
            this.calculations("A");
          }, 2000);
        } else {
          clearInterval(this.timer[0]);
        }
      }
      if (field === "B") {
        this.startStopB = !this.startStopB;
        if (this.startStopB) {
          this.timer[1] = setInterval(() => {
            this.calculations("B");
          }, 2000);
        } else {
          clearInterval(this.timer[1]);
        }
      }
      if (field === "C") {
        this.startStopC = !this.startStopC;
        if (this.startStopC) {
          this.timer[2] = setInterval(() => {
            this.calculations("C");
          }, 2000);
        } else {
          clearInterval(this.timer[2]);
        }
      }
    },
    calculations(field) {
      if (field === "A") {
        this.randomSign[0] = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        this.randomSign[0] === "+"
          ? (this.initialValueA += this.randomNumbersArray[0])
          : (this.initialValueA -= this.randomNumbersArray[0]);
        const date = new Date();
        const newChange = {};
        newChange.field = "A";
        newChange.indicator = this.randomSign[0];
        newChange.value = this.randomNumbersArray[0];
        newChange.time = date.toLocaleTimeString();
        this.changesA.push(newChange);
        this.$emit("update:changesA", [...this.changesA]);
      }
      if (field === "B") {
        this.randomSign[1] = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        this.randomSign[1] === "+"
          ? (this.initialValueB += this.randomNumbersArray[1])
          : (this.initialValueB -= this.randomNumbersArray[1]);
        const date = new Date();
        const newChange = {};
        newChange.field = "B";
        newChange.indicator = this.randomSign[1];
        newChange.value = this.randomNumbersArray[1];
        newChange.time = date.toLocaleTimeString();
        this.changesB.push(newChange);
        this.$emit("update:changesB", [...this.changesB]);
      }
      if (field === "C") {
        this.randomSign[2] = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        this.randomSign[2] === "+"
          ? (this.initialValueC += this.randomNumbersArray[2])
          : (this.initialValueC -= this.randomNumbersArray[2]);
        const date = new Date();
        const newChange = {};
        newChange.field = "C";
        newChange.indicator = this.randomSign[0];
        newChange.value = this.randomNumbersArray[2];
        newChange.time = date.toLocaleTimeString();
        this.changesC.push(newChange);
        this.$emit("update:changesC", [...this.changesC]);
      }
    }
  },
  beforeUpdate() {
    const array = [this.startStopA, this.startStopB, this.startStopC];
    array.forEach((value, index) => {
      if (!value) {
        clearInterval(this.timer[index]);
      }
    });
  },
  mounted() {
    if (this.changesA && this.changesB && this.changesC === []) {
      this.firstObjects();
    }
    setInterval(this.replaceNumbersArray, 2000);

    this.initialValueA = this.$root.initialValueA || 3;
    this.initialValueB = this.$root.initialValueB || 3;
    this.initialValueC = this.$root.initialValueC || 3;

    this.fields.forEach((value, index) => {
      this.timer[index] = setInterval(() => {
        this.calculations(value);
      }, 2000);
    });

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

    this.timer.forEach((value) => {
      clearInterval(value);
    });
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
  padding: 6px 12px;
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
