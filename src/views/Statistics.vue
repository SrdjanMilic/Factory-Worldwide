<template>
  <div class="statistics">
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
        <th>Time</th>
      </tr>
      <tr v-for="item in changes" :key="item.value">
        <td>{{ item.field }}</td>
        <td>{{ item.value }}</td>
        <td>{{ item.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
// import TableFields from '@/components/TableFields.vue'

export default {
  name: 'Statistics',
  components: {
    // TableFields
  },
  data () {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
