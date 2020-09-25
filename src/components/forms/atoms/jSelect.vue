<template>
  <el-select :placeholder="placeholder" disabled size="medium" value=""></el-select>
</template>

<script>
  export default {
    name: "jSelect",
    props:{
      options:{
        type: Array
      },
      type: {
        default: 'one',
        type: String
      },
      placeholder: {
        default: '请选择',
      }
    }
  }
</script>

<style scoped>

</style>
