<template>
  <div>
    <div class="wrapper" v-for="(field, index) in fields" :key="index">
      <table>
        <tr>
          <th>{{ field }}</th>
          <td class="sign">{{ randomSign[index] }}</td>
          <td>{{ value[index].toFixed(2) }}</td>
          <td v-show="randomSign[index] == '+'">&#x2B06;</td>
          <td v-show="randomSign[index] == '-'">&#x2B07;</td>
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
export default {
  name: "TableFields",
  props: {
    // Array of empty arrays for table/fields objects
    changesEmptyArray: {
      type: Array,
      required: true
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
    value() {
      const array = [
        this.initialValueA,
        this.initialValueB,
        this.initialValueC
      ];
      return array;
    }
  },
  methods: {
    firstObjects() {
      // creates first objects A, B, C...
      for (let i = 0; i < this.fields.length; i++) {
        const date = new Date();

        const obj = {};
        obj.field = this.fields[i];
        obj.value = Number((Math.random() * 1 + 1).toFixed(2));
        obj.indicator = this.signsArray[
          Math.floor(Math.random() * this.signsArray.length)
        ];
        obj.time = date.toLocaleTimeString();

        this.changesEmptyArray.push({ ...obj });
        this.$emit("update:changesEmptyArray", [...this.changesEmptyArray]);
      }
    },
    replaceNumbersArray() {
      // replace random A, B, C... numbers at time interval
      const A = Number((Math.random() * 1 + 1).toFixed(2)); // first number A
      const B = Number((Math.random() * 1 + 1).toFixed(2)); // first number B
      const C = Number((Math.random() * 1 + 1).toFixed(2)); // first number C
      this.randomNumbersArray.splice(0, 3, A, B, C);
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

        this.changesEmptyArray[0].push(newChange);
        this.$emit("update:changesEmptyArray[0]", [
          ...this.changesEmptyArray[0]
        ]);
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

        this.changesEmptyArray[1].push(newChange);
        this.$emit("update:changesEmptyArray[1]", [
          ...this.changesEmptyArray[1]
        ]);
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
        newChange.indicator = this.randomSign[2];
        newChange.value = this.randomNumbersArray[2];
        newChange.time = date.toLocaleTimeString();

        this.changesEmptyArray[2].push(newChange);
        this.$emit("update:changesEmptyArra[2]y", [
          ...this.changesEmptyArray[2]
        ]);
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
    if (this.changesEmptyArray === []) {
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
