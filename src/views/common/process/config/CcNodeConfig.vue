<template>
  <div>
    <el-button size="mini" icon="el-icon-plus" type="primary" @click="selectOrg" round>选择抄送人</el-button>
    <div class="option">
      允许发起人添加抄送人:
      <el-switch v-model="config.shouldAdd"/>
    </div>
    <div style="margin-top: 20px">
      <el-tag class="org-item" :type="org.type === 'dept'?'':'info'"
              v-for="(org, index) in select" :key="index + '_org'"
              closable size="mini" @close="removeOrgItem(index)">
        {{org.name}}
      </el-tag>
    </div>
    <org-picker :show="showOrgSelect" @close="closeSelect" :selected="select" @selectOver="selected"></org-picker>
  </div>
</template>

<script>
import orgPicker from '@/components/common/organizationPicker'
export default {
  name: "CcNodeConfig.vue",
  components: {orgPicker},
  props:{
    config:{
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  computed:{
    select(){
      return this.config.assignedUser || []
    }
  },
  data() {
    return {
      showOrgSelect: false
    }
  },
  methods: {
    closeSelect(){

    },
    selectOrg() {
      this.showOrgSelect = true
    },
    selected(select) {
      console.log(select)
      this.showOrgSelect = false
      select.forEach(val => this.select.push(val))
    },
    removeOrgItem(index){
      this.select.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.option{
  color: #606266;
  margin-top: 20px;
  font-size: small;
}

.desc{
  font-size: small;
  color: #8c8c8c;
}
.org-item{
  margin: 5px;
}
</style>
