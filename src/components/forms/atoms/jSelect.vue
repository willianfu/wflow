<template>
  <el-select :placeholder="placeholder" disabled size="medium" value=""></el-select>
</template>

<script>
  export default {
    name: "textInput",
    props:{
      options:{
        type: Array
      },
      type: {
        default: 'single',
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