<template>
  <node :title="config.name" :show-error="showError" :content="content" :error-info="errorInfo"
        @selected="$emit('selected')" @delNode="$emit('delNode')" @insertNode="type => $emit('insertNode', type)"
        placeholder="请设置延时时间" header-bgc="#f25643" header-icon="el-icon-time"/>
</template>

<script>
import Node from './Node'

export default {
  name: "DelayNode",
  props:{
    config:{
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {Node},
  data() {
    return {
      showError: false,
      errorInfo: '',
    }
  },
  computed:{
    content(){
      this.config
    }
  },
  methods: {
    //校验数据配置的合法性
    validate(){
      this.showError = false
      try {
        if (this.config.type === "AUTO") {
          if ((this.config.datetime || "") === ""){
            this.showError = true
            this.errorInfo = "请选择时间点"
          }
        } else {
          if (this.config.time <= 0) {
            this.showError = true
            this.errorInfo = "请设置延时时长"
          }
        }
      } catch (e) {
        this.showError = true
        this.errorInfo = "配置出现问题"
      }
      return !this.showError
    }
  }
}
</script>

<style scoped>

</style>
