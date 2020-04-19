<template>
  <div class="statistics">
    <table v-for="(field, index) in fields" :key="index">
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>Time</th>
      </tr>
      <tr v-for="(change, index) in changesArray[index]" :key="index">
        <td>{{ change.field }}</td>
        <td>{{ change.value }}</td>
        <td>{{ change.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  props: {
    changesA: {
      type: Array,
      required: true
    },
    changesB: {
      type: Array,
      required: true
    },
    changesC: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fields: ["A", "B", "C"],
      changesArray: [this.changesA, this.changesB, this.changesC]
    };
  }
};
</script>

<style lang="scss" scoped>
.statistics {
  display: flex;
}
table {
  margin-right: 30px;
  &:last-child {
    margin: 0;
  }
  tr:first-child {
    background-color: #f2f2f2;
  }

  th {
    background-color: #42b983;
    border-color: #42b983;
    color: #ffffff;
  }
}
</style>
