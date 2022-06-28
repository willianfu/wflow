<template>
  <el-form>
    <el-form-item label="表单名称">
      <el-input size="small" clearable v-model="form.title"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "FormComponentConfig",
  components: {},
  props:{
    formSelected:{
      type: Number,
      default: 0
    }
  },
  computed:{
    form(){
      return this.$store.state.design.formItems[this.formSelected]
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
