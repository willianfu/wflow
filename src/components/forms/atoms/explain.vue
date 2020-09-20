<template>
  <span v-text="remark" :style="'color: ' + color"></span>
</template>

<script>
  export default {
    name: "explain",
    props:{
      remark:{
        default: '请输入说明内容',
        type: String
      },
      color:{
        default: '#7e7e7e',
        type: String
      }
    }
  }
</script>

<style scoped>
  span{
    font-size: small;
  }
</style>