<template>
  <div style="max-width: 500px">
    <div v-if="mode === 'DESIGN'">
      <el-select disabled :placeholder="placeholder"/>
    </div>
    <div v-else>
      <el-select :multiple="multiple" clearable :placeholder="placeholder">
        <el-option v-for="(op, index) in options" :key="index" :value="op" :label="op"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  components: {},
  props:{
    mode:{
      type: String,
      default: 'DESIGN'
    },
    required:{
      type: Boolean,
      default: false
    },
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
