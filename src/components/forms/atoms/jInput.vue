<template>
  <div>
    <el-input :placeholder="placeholder" :disabled="true"
              type="textarea" v-if="type === 'textarea'" show-word-limit
              :autosize="{ minRows: 2, maxRows: 5}" maxlength="500"
    ></el-input>
    <el-input :placeholder="placeholder" :disabled="true" size="medium"  v-else></el-input>
  </div>

</template>

<script>
    export default {
      name: "singleInput",
      props:{
          //单行输入框输入值类型
          type:{
            default: 'text',
            type: String
          },
          placeholder: {
            default: '请输入内容',
          }
      }
    }
</script>

<style lang="less" scoped>
  /deep/ .el-textarea{
    max-width: 500px;
  }
</style>
