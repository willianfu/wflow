<template>
  <div>
    <el-date-picker type="date" :placeholder="placeholder"
                    v-if="type === 'date'" size="medium" :disabled="disabled">
    </el-date-picker>
    <el-date-picker type="daterange" range-separator="至" size="medium"
                    :start-placeholder="start" :end-placeholder="end"
                    v-else-if="type === 'dateRange'" :disabled="disabled">
    </el-date-picker>
    <el-date-picker type="datetime" :placeholder="placeholder"  :disabled="disabled" size="medium"
                    v-else-if="type === 'dateTime'"></el-date-picker>
    <el-date-picker type="datetimerange" range-separator="至" :disabled="disabled" size="medium"
                    :start-placeholder="start" :end-placeholder="end"
                    v-else-if="type === 'dateTimeRange'">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: "jDateTime",
    props:{
      type: {
        default: 'date',
        type: String
      },
      disabled:{
        default: true,
        type: Boolean
      },
      placeholder: {
        default: '请选择日期',
      },
      start:{
        default: '请选择开始时间',
      },
      end: {
        default: '请选择结束时间',
      }
    }
  }
</script>

<style lang="less" scoped>

  /deep/ .el-range-editor{
    width: 100%;
    max-width: 400px;
  }
</style>