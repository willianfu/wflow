<template>
  <div class="node-config">
    <el-form label-position="top" label-width="80px">
    <el-form-item label="选择发起人" prop="text">
      <el-select v-model="selectNode.porps" @click.native="showUserSelect = true" value-key="name"
                 class="select-u" placeholder="请选择可以发起提交的人员"
                 size="medium" clearable multiple>
        <el-option v-for="(wc, index) in approver" :label="wc.name" :key="index" :value="wc"></el-option>
      </el-select>
    </el-form-item>

    </el-form>

    <div v-if="showRoot">

    </div>
    <org-picker :show="showUserSelect" @close="showUserSelect = false" :selected="select" @selectOver="selected"></org-picker>
  </div>
</template>

<script>
  import orgPicker from '@/components/common/organizationPicker'

  export default {
    name: "nodeConfig",
    components: {orgPicker},
    props:{
      node:{
        default: () => {return {}},
        type: Object
      }
    },
    data(){
      return{
        showUserSelect: false,
        select: [],
        approver:[]
      }
    },
    computed:{
      selectNode(){
        return this.node;
      }
    },
    methods:{
      showRoot(){
        return this.node.type === 'root'
      },
      selected(select){
        this.approver = select
        this.showUserSelect = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .node-config{
    padding: 10px;
    /deep/ .el-form-item__label {
      padding: 0;
    }

    /deep/  .el-form-item {
      margin-bottom: 5px;
    }
  }

  .select-u{
    width: 100%;
  }
</style>