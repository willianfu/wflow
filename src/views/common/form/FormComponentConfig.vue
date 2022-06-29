<template>
  <el-form>
    <el-form-item label="表单名称">
      <el-input size="small" clearable v-model="form.title"/>
    </el-form-item>
    <component :is="form.name" v-model="form.props"/>
    <el-form-item label="必填项">
      <el-switch v-model="form.props.required"></el-switch>
    </el-form-item>
    <el-form-item label="可打印">
      <el-switch v-model="form.props.enablePrint"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import TextInput from './config/TextInputConfig.vue'
import NumberInput from './config/NumberInputConfig.vue'
import TextareaInput from './config/TextareaInputConfig.vue'
import SelectInput from './config/SelectInputConfig.vue'
import DateTime from './config/DateTimeConfig.vue'
import DateTimeRange from './config/DateTimeRangeConfig.vue'
import ImageUpload from './config/ImageUploadConfig.vue'
import FileUpload from './config/FileUploadConfig.vue'
import Description from './config/DescriptionConfig.vue'
import MoneyInput from './config/MoneyInputConfig.vue'

export default {
  name: "FormComponentConfig",
  components: {
    TextInput,
    NumberInput,
    TextareaInput,
    SelectInput,
    DateTime,
    DateTimeRange,
    ImageUpload,
    FileUpload,
    Description,
    MoneyInput
  },
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
