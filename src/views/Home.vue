<template>
  <div class="home">
    <TableFields msg="This is the table fields page" />
  </div>
</template>

<script>
// @ is an alias to /src
import TableFields from '@/components/TableFields.vue'

export default {
  name: 'Home',
  components: {
    TableFields
  }
}
</script>
