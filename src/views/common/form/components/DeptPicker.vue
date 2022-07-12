<template>
  <div style="max-width: 350px">
    <div v-if="mode === 'DESIGN'">
      <el-button disabled icon="el-icon-coin" type="primary" size="mini" round>选择部门</el-button>
      <span class="placeholder"> {{placeholder}}</span>
    </div>
    <div v-else>
      <el-button icon="el-icon-coin" type="primary" size="mini" round @click="showOrgSelect = true">选择部门</el-button>
      <org-picker type="dept" :single="!multiple" :show="showOrgSelect" @close="showOrgSelect = false"
                  :selected="_value" @selectOver="selected"></org-picker>
      <span class="placeholder"> {{placeholder}}</span>
      <div style="margin-top: 5px">
        <el-tag size="mini" style="margin: 5px" closable v-for="(dept, i) in _value" @close="delDept(i)">{{dept.name}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import componentMinxins from '../ComponentMinxins'
import OrgPicker from '@/components/common/organizationPicker'

export default {
  mixins: [componentMinxins],
  name: "DeptPicker",
  components: {OrgPicker},
  props: {
    placeholder: {
      type: String,
      default: '请选择部门'
    },
    multiple:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showOrgSelect: false
    }
  },
  methods: {
    selected(values){
      this.showOrgSelect = false
      this._value = values
    },
    delDept(i){
      this._value.splice(i, 1)
    }
  }
}
</script>

<style scoped>
.placeholder{
  margin-left: 10px;
  color: #adabab;
  font-size: smaller;
}
</style>
