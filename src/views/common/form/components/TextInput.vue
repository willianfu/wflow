<template>
  <div style="max-width: 350px">
    <div v-if="mode === 'DESIGN'">
      <el-input size="medium" disabled :placeholder="placeholder"/>
    </div>
    <div v-else>
      <el-input size="medium" clearable v-model="_value" :placeholder="placeholder"/>
    </div>
  </div>
</template>

<script>
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "TextInput",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
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
