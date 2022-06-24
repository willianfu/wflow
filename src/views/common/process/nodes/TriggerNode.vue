<template>
  <node :title="config.name" :show-error="showError" :content="content" :error-info="errorInfo"
        @selected="$emit('selected')" @delNode="$emit('delNode')" @insertNode="type => $emit('insertNode', type)"
        placeholder="请设置触发器" header-bgc="#47bc82" header-icon="el-icon-set-up"/>
</template>

<script>
import Node from './Node'

export default {
  name: "TriggerNode",
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
      if(this.config.assignedUser && this.config.assignedUser.length > 0){
        this.showError = false
      }else {
        this.showError = true
        this.errorInfo = '请设置触发器详情'
      }
      return !this.showError
    }
  }
}
</script>

<style scoped>

</style>
