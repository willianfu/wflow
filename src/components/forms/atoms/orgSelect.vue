<template>
	<el-select :placeholder="placeholder" disabled size="medium" value=""></el-select>
</template>

<script>
  export default {
    name: "orgSelect",
    props:{
      type:{
        default: 'user',
        type: String
      },
      single:{
        default: false,
        type: Boolean
      },
      placeholder:{
        default: '请选择',
        type: String
      }
    }
  }
</script>

<style scoped>

</style>
