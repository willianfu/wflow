<template>
  <div>
    <el-form-item label="提示文字">
      <el-input size="small" v-model="value.placeholder" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="选项设置" class="options">
      <draggable :list="value.options" group="option" handler=".el-icon-rank" :options="{animation: 300, sort: true}">
        <div v-for="(op, index) in value.options" :key="index">
          <i class="el-icon-rank"></i>
          <el-input v-model="value.options[index]" size="medium" style="width: 260px; float:right;"
                    placeholder="请设置选项值" clearable>
            <el-button icon="el-icon-delete" slot="append" type="danger" size="medium"
                       @click="value.options.splice(index, 1)"></el-button>
          </el-input>
        </div>
      </draggable>
      <el-button icon="el-icon-plus" type="text" size="mini"
                 style="float:right;"
                 @click="value.options.push('新选项')">新增选项</el-button>
    </el-form-item>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "SelectInputConfig",
  components: {draggable},
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

<style lang="less" scoped>
/deep/ .options{
  .el-form-item__label{
    display: block;
    width: 100%;
    text-align: left;
  }
}

/*/deep/ .el-form-item {
  margin-bottom: 10px;

  .el-form-item__label {
    padding: 0;
  }
  .options{
    .el-icon-rank{
      cursor: move;
    }
  }
}*/
</style>
