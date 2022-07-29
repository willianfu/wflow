<template>
  <div>
    <div v-if="mode === 'DESIGN'">
      <draggable class="l-drag-from" :list="_columns" group="form"
                 :options="{animation: 300, chosenClass:'choose', sort:true}"
                 @start="drag = true; selectFormItem = null" @end="drag = false">
        <div v-for="(cp, id) in _columns" :key="id" class="l-form-item" @click.stop="selectItem(cp)"
             :style="getSelectedClass(cp)">
          <div class="l-form-header">
            <p><span v-if="cp.props.required">*</span>{{ cp.title }}</p>
            <div class="l-option">
              <!--<i class="el-icon-copy-document" @click="copy"></i>-->
              <i class="el-icon-close" @click="delItem(id)"></i>
            </div>
            <form-design-render :config="cp"/>
          </div>
        </div>
      </draggable>
      <div style="color: #c0bebe;text-align: center; width: 90%; padding: 5px;">☝ 拖拽控件到表格内部</div>
    </div>
    <div v-else>
      <div v-if="rowLayout">
        <el-table size="medium" :header-cell-style="{background:'#f5f7fa', padding:'3px 0'}" :border="showBorder" :data="_value" style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column min-width="150" v-for="(column, index) in _columns" :prop="column.id" :label="column.title">
            <form-design-render v-model="column.value" :mode="mode" :config="column"/>
          </el-table-column>
          <el-table-column fixed="right" min-width="90" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="copyData(scope.$index, scope.row)">复制</el-button>
              <el-button size="mini" type="text" @click="delRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button size="small" icon="el-icon-plus" @click="addRow">{{placeholder}}</el-button>
      </div>
      <div v-else>
        <el-form class="table-column" v-for="(row, i) in _value" :key="i">
          <div class="table-column-action">
            <i class="el-icon-close" @click="delRow(i, row)"></i>
          </div>
          <el-form-item v-for="(column, index) in _columns" :prop="column.id" :label="column.title">
            <form-design-render v-model="column.value" :mode="mode" :config="column"/>
          </el-form-item>
        </el-form>
        <el-button size="small" icon="el-icon-plus" @click="addRow">{{placeholder}}</el-button>
      </div>
    </div>

  </div>

</template>

<script>
import draggable from "vuedraggable";
import FormDesignRender from '@/views/admin/layout/form/FormDesignRender'
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "TableList",
  components: {draggable, FormDesignRender},
  props: {
    placeholder: {
      type: String,
      default: '添加数据'
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: Number,
      default: 0
    },
    rowLayout: {
      type: Boolean,
      default: true
    },
  },
  created() {
    if (!Array.isArray(this.value)){
      this._value = []
    }
  },
  computed: {
    _columns: {
      get() {
        return this.columns;
      },
      set(val) {
        this.columns = val;
      }
    },
    selectFormItem: {
      get() {
        return this.$store.state.selectFormItem
      },
      set(val) {
        this.$store.state.selectFormItem = val
      },
    }
  },
  data() {
    return {
      select: null,
      drag: false,
      formConfig: {
        //数据字段
        data: {},
        //校验规则
        rules: {}
      },
      form: {
        formId: '',
        formName: "",
        logo: {},
        formItems: [],
        process: {},
        remark: ""
      }
    }
  },
  methods: {
    copyData(i, row){
      this._value.push(this.$deepCopy(row))
    },
    delRow(i, row){
      this._value.splice(i, 1)
    },
    addRow(){
      if (this.maxSize > 0 && this._value.length >= this.maxSize){
        this.$message.warning(`最多只能添加${this.maxSize}行`)
      }else {
        this._value.push({})
      }
    },
    delItem(id) {
      this._columns.splice(id, 1)
    },
    selectItem(cp) {
      this.selectFormItem = cp
    },
    getSelectedClass(cp) {
      return this.selectFormItem && this.selectFormItem.id === cp.id ?
          'border-left: 4px solid #f56c6c' : ''
    }
  }
}
</script>

<style lang="less" scoped>


.choose {
  border: 1px dashed @theme-primary !important;
}

.table-column {
  padding: 5px;
  margin-bottom: 10px;
  border-left: 3px solid #409eff;
  border-radius: 5px;
  background: #fafafa;
  .table-column-action{
    float: right;
    i{
      color: #afafaf;
      padding: 5px;
      font-size: large;
      cursor: pointer;
      &:hover{
        color: #666666;
      }
    }
  }
}

.l-drag-from {
  min-height: 50px;
  background-color: rgb(245, 246, 246);

  .l-form-item, li {
    cursor: grab;
    background: #ffffff;
    padding: 10px;
    border: 1px solid #ebecee;
    margin: 5px 0;
  }
}

.l-form-header {
  font-size: small;
  color: #818181;
  text-align: left;
  position: relative;
  background-color: #fff;

  p {
    position: relative;
    margin: 0 0 10px 0;

    span {
      position: absolute;
      left: -8px;
      top: 3px;
      color: rgb(217, 0, 19);
    }
  }

  .l-option {
    position: absolute;
    top: -10px;
    right: -10px;

    i {
      font-size: large;
      cursor: pointer;
      color: #8c8c8c;
      padding: 5px;

      &:hover {
        color: @theme-primary;
      }
    }
  }
}

</style>
