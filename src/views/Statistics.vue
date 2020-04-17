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
  name: 'Statistics',
  props: {
    changesA: {
      type: Array,
      required: true
    },
    changesB: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fields: ['A', 'B'],
      changesArray: [this.changesA, this.changesB]
    }
  },
  mounted () {
    // this.changesArray = this.$root.changesArray
  },
  beforeDestroy () {
    // this.$root.changesArray = this.changesArray
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  display: flex;
}
table:first-of-type {
  margin-right: 20px;
}
</style>
