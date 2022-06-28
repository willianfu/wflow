<template>
  <div style="max-width: 500px">
    <div v-if="mode === 'DESIGN'">
      <el-input disabled :placeholder="placeholder" show-word-limit :rows="2" type="textarea"/>
    </div>
    <div v-else>
      <el-input clearable :maxlength="255" :placeholder="placeholder" show-word-limit :rows="3" type="textarea"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextareaInput",
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
