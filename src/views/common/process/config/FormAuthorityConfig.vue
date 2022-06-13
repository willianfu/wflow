<template>
  <div>
    <el-table :header-cell-style="{background:'#f5f6f6'}" :data="formData" border style="width: 100%">
      <el-table-column prop="title" show-overflow-tooltip label="表单字段">
        <template slot-scope="scope">
          <span v-if="scope.row.required" style="color: #c75450"> * </span>
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="readOnly" label="只读" width="80">
        <template slot="header" slot-scope="scope">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">只读</el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-radio v-model="scope.row.perm" label="R"  :name="scope.row.id"></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="editable" label="可编辑" width="90">
        <template slot="header" slot-scope="scope">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">可编辑</el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-radio v-model="scope.row.perm" label="E" :name="scope.row.id"></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="hide" label="隐藏" width="80">
        <template slot="header" slot-scope="scope">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">隐藏</el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-radio v-model="scope.row.perm" label="H"  :name="scope.row.id"></el-radio>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "FormAuthorityConfig",
  components: {},
  data() {
    return {
      tableData:[],
      isIndeterminate:true,
      checkAll: false,

    }
  },
  computed:{
    formData(){
      return this.$store.state.design.formItems
    }
  },
  methods: {
    handleCheckAllChange(){

    }
  }
}
</script>

<style lang="less" scoped>

/deep/ .el-table__row{
  &>td:first-child{
    .cell{
      text-align: left;
    }
  }
  .cell{
    text-align: center;
  }
  .el-radio__label{
    display: none;
  }
}
</style>
