<template>
  <div>
    <el-form-item label="提示文字">
      <el-input size="small" v-model="value.placeholder" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="最大上传图片数量（为0则不限制）">
      <el-input-number controls-position="right" :precision="0" size="small" v-model="value.maxNumber" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="单个文件最大大小（MB）">
      <el-input-number controls-position="right" :precision="1" size="small" v-model="value.maxSize" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="图片压缩">
      <el-switch v-model="value.enableZip"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "ImageUploadConfig",
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
