<template>
  <div style="max-width: 350px">
    <div v-if="mode === 'DESIGN'">
      <el-input disabled :placeholder="placeholder"/>
    </div>
    <div v-else>
      <el-input :placeholder="placeholder"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
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
      default: '请输入内容'
    },
    value:{
      type: String,
      default: ''
    },
    attr:{
      type: Boolean,
      default: false
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
