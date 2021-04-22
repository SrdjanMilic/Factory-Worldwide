<template>
  <div class="statistics">
    <table v-for="(field, index) in $store.state.fields" :key="index">
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>+/-</th>
        <th>Time</th>
      </tr>
      <tr v-for="(change, index) in $store.state.changes[index]" :key="index">
        <td>{{ change.field }}</td>
        <td>{{ change.value }}</td>
        <td v-show="change.indicator === '+'">&#x2B06;</td>
        <td v-show="change.indicator === '-'">&#x2B07;</td>
        <td>{{ change.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Statistics'
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
    text-align: center;
  }
}
</style>
