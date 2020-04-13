<template>
  <div class="statistics">
    <table>
      <tr>
        <th>Value</th>
        <th>Time</th>
      </tr>
      <tr>
        <td>{{ this.value }}</td>
        <td>{{ this.date }}</td>
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
    return {
      value: Number((Math.random() * 1 + 1).toFixed(2)),
      date: new Date().toLocaleTimeString()
    }
  },
  methods: {
    clock () {
      setInterval(() => {
        const d = new Date().toLocaleTimeString()
        console.log('Clock', d)
      }, 1000)
    }
  },
  mounted () {
    this.clock()
  }
}
</script>
