<template>
  <el-form label-position="top" label-width="80px">
    <el-form-item label="名称" prop="text">
      <el-input v-model="atom.text" size="medium" placeholder="请输入选项名"></el-input>
    </el-form-item>
    <el-form-item label="提示文字" prop="placeholder" v-if="showPlaceholder">
      <el-input v-model="atom.props.placeholder" size="medium" placeholder="请输入提示为文字"></el-input>
    </el-form-item>

      <el-form-item label="配置选项" prop="placeholder" v-if="showMoreSelect">
        <draggable :list="atom.props.options" group="option" handler=".el-icon-rank" :options="{animation: 300, sort: true}">
          <div v-for="(op, index) in atom.props.options" :key="index" class="options">
            <i class="el-icon-rank"></i>
            <el-input v-model="atom.props.options[index]" size="medium" style="width: 260px; float:right;"
                      placeholder="请输入提示为文字" clearable>
              <el-button icon="el-icon-delete" slot="append" type="danger" size="medium"
                         @click="atom.props.options.splice(index, 1)"></el-button>
            </el-input>
          </div>

        </draggable>
        <el-button icon="el-icon-plus" type="text" size="mini"
                   style="float:right;"
                   @click="atom.props.options.push('新选项')">新增选项</el-button>
      </el-form-item>
    <div v-if="showRemark">
      <el-form-item label="说明文字内容" prop="remark">
        <el-input placeholder="请输入说明" v-model="atom.props.remark" type="textarea" show-word-limit
                  :autosize="{ minRows: 2, maxRows: 5}" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="文字颜色" prop="color">
        <el-color-picker v-model="atom.props.color" :predefine="colors"></el-color-picker>
      </el-form-item>
    </div>
  
    <div v-if="showOrgSelect">
      <el-form-item label="选择方式" prop="single">
        <el-switch v-model="atom.props.single" active-text="多选部门"
        inactive-text="单选部门" size="medium" v-if="atom.props.type === 'dept'"></el-switch>
        <el-switch v-model="atom.props.single" active-text="多选人员" inactive-text="单选人员" size="medium" v-else></el-switch>
      </el-form-item>
    </div>
    
    <el-form-item label="必填" prop="valid">
      <el-switch v-model="atom.valid" size="medium"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
  import draggable from "vuedraggable";

  export default {
    name: "atomConfig",
    components:{draggable},
    props: {
      atom: {
        default: () => {
          return {}
        },
        type: Object
      }
    },
    data() {
      return {
        colors: [
          '#7e7e7e',
          '#F56C6C',
          '#409EFF',
          '#E6A23C',
          '#67C23A',
          '#00ced1',
          '#c71585',
        ]
      }
    },
    computed: {
      showPlaceholder() {
        let name = this.atom.name;
        return name === 'jDateTime' || name === 'jSelect' || name === 'jInput'
      },
      showRemark() {
        return this.atom.name === 'explain'
      },
      showMoreSelect(){
        return this.atom.name === 'jSelect' && this.atom.props.type === 'more'
      },
      showOrgSelect(){
        return this.atom.name === 'orgSelect'
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>

  /deep/ .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label {
      padding: 0;
    }
    .options{
      .el-icon-rank{
        cursor: move;
      }
    }
  }

</style>
