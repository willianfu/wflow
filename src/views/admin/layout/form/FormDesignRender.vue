<template>
  <component :is="type" :mode="mode" v-bind="config"/>
</template>
<script>

import cp from '@/views/common/form/ComponentExport'

export default {
  name: "FormRender",
  components: cp,
  props:{
    type:{
      type: String,
      default: 'div'
    },
    mode:{
      type: String,
      default: 'DESIGN'
    },
    config:{
      type: Object,
      default: ()=>{
        return {
          required: false,
          //mode: 'DESIGN'
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
