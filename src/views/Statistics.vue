<template>
  <div class="statistics">
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>Time</th>
      </tr>
      <tr v-for="(change, index) in changes" :key="index">
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
  components: {
  },
  props: {
    changes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>
