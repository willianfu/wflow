<template>
  <div class="node-config">
    <el-form label-position="top" label-width="80px">
      <div v-if="selectedNode.type === 'root'">
        <el-form-item label="谁可以发起此审批" prop="text">
          <el-select v-model="props.approval.user.users" @click.native="showUserSelect = true" value-key="name"
                     class="select-u" placeholder="请选择可以发起提交的人员"
                     size="medium" clearable multiple>
            <el-option v-for="(wc, index) in props.approval.user.users" :label="wc.name" :key="index" :value="wc"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div v-else-if="selectedNode.type === 'sp'">
        <el-form-item label="选择审批人" prop="text" class="select-user-type">
          <el-radio-group v-model="props.approval.type">
            <el-radio label="1">指定人员</el-radio>
            <el-radio label="2">发起人自选</el-radio>
            <el-radio label="3">连续多级主管</el-radio>
            <el-radio label="4">主管</el-radio>
            <el-radio label="5">角色</el-radio>
            <el-radio label="6">发起人自己</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <div v-if="props.approval.type === '1'">
            <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 15px"
                       round @click="showUserSelect = true">选择人员</el-button>
            <div>
              <el-tag type="primary" v-for="(user, index) in props.approval.user.users" size="mini"
                      style="margin-right: 10px"
                      @close="props.approval.user.users.splice(index, 1)" closable>{{user.name}}</el-tag>
            </div>
            
          </div>
          <div v-if="props.approval.type === '2'">
            <el-select size="small" v-model="props.approval.user.select" placeholder="选择人数">
              <el-option value="自选一个人" lable="one"></el-option>
              <el-option value="自选多个人" lable="more"></el-option>
            </el-select>
          </div>
          <div v-if="props.approval.type === '3'">
            <el-button type="primary" size="mini" round>指定成员</el-button>
          </div>
          <div v-if="props.approval.type === '4'">
            <el-button type="primary" size="mini" round>指定成员</el-button>
          </div>
        </div>
      </div>
      <div v-if="showModel">
        <el-divider></el-divider>
        <el-form-item label="多人审批时审批方式" prop="text" class="approve-mode">
          <el-radio-group v-model="props.approval.mode">
            <el-radio label="next">按选择顺序依次审批</el-radio>
            <el-radio label="and">会签（可同时审批，每个人必须同意）</el-radio>
            <el-radio label="or">或签（有一人同意即可）</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      
      
    </el-form>

    
    
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
        approval:[]
      }
    },
    computed:{
      selectedNode(){
        return this.$store.state.selectedNode;
      },
      props(){
        return this.$store.state.selectedNode.props;
      },
      showModel(){
        return (this.props.approval.user.users.length > 1 && this.props.approval.model === '1') || this.props.approval.user.select === 'more'
                || this.props.approval.model === '4' || this.props.approval.model === '5'
      },
    },
    methods:{
      showRoot(){
        return this.selectedNode.type === 'root'
      },
      selected(select){
        this.$store.commit('selectedApprover', select.map(s => {return {id: s.id, type: s.type, name: s.name}}))
        this.showUserSelect = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .node-config{
    padding: 0 20px;
    
    /deep/ .el-form{
      .el-form-item__label {
        padding: 0;
      }
      .el-form-item__label{
        font-size: 14px;
        color: #000;
      }
      .el-form-item {
        margin-bottom: 5px;
      }
    }
    
  }
  .select-user-type{
    /deep/ .el-radio{
      width: 80px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
  /deep/ .approve-mode{
    .el-radio{
      float: left;
      margin-top: 15px;
    }
  }
  
  .select-u{
    width: 100%;
  }
</style>
