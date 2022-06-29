<template>
  <component :is="config.name" :mode="mode" v-model="config.value" v-bind="config.props"/>
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
    config:{
      type: Object,
      default: ()=>{
        return {}
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
