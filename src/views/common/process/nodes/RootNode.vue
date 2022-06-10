<template>
  <node title="发起人" :is-root="true" :content="content"
        @selected="$emit('selected')" @insertNode="type => $emit('insertNode', type)"
        placeholder="所有人" header-bgc="#576a95" header-icon="el-icon-user-solid"/>
</template>

<script>
import Node from './Node'

export default {
  name: "RootNode",
  components: {Node},
  props:{
    config:{
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      content: '所有人'
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
