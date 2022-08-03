<template>
  <component ref="form" :is="config.name" :mode="mode" v-model="_value" v-bind="config.props"/>
</template>
<script>

import components from '@/views/common/form/ComponentExport'

export default {
  name: "FormRender",
  components: components,
  props:{
    mode:{
      type: String,
      default: 'DESIGN'
    },
    value: {
      default: undefined
    },
    config:{
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    validate(call){
      this.$refs.form.validate(call)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
