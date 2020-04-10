<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TableFields msg="Table Fields" />
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
