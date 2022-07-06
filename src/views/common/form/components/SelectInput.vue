<template>
  <div style="max-width: 500px">
    <div v-if="mode === 'DESIGN'">
      <el-select size="medium" disabled :placeholder="placeholder"/>
    </div>
    <div v-else>
      <el-select v-model="_value" size="medium" :multiple="multiple" clearable :placeholder="placeholder">
        <el-option v-for="(op, index) in options" :key="index" :value="op" :label="op"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "SelectInput",
  components: {},
  props:{
    placeholder:{
      type: String,
      default: '请选择选项'
    },
    multiple:{
      type: Boolean,
      default: false
    },
    options:{
      type: Array,
      default: () => {
        return []
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
