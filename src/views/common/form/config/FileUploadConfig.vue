<template>
  <div>
    <el-form-item label="提示文字">
      <el-input size="small" v-model="value.placeholder" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="最大上传数量（为0则不限制）">
      <el-input-number controls-position="right" :precision="0" size="small" v-model="value.maxNumber" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="单个文件最大大小（MB）">
      <el-input-number controls-position="right" :precision="1" size="small" v-model="value.maxSize" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="文件类型限制">
      <el-select size="small" style="width: 100%;" v-model="value.fileTypes" multiple
                 filterable allow-create default-first-option clearable placeholder="允许上传文件的后缀格式，可设置多种"/>
    </el-form-item>
    <el-form-item label="只允许在线预览文件">
      <el-switch v-model="value.onlyRead"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "FileUploadConfig",
  components: {},
  props:{
    value:{
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
