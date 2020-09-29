<template>
  <el-form label-position="top" label-width="100px" class="condition">
    <el-form-item :label="condition.name" v-for="condition in selectedNode.condition" :key="condition.id">
      <div v-if="condition.type === type.NUMBER">
        <el-select v-model="condition.symbol" style="width: 120px; margin-right: 20px" size="small">
          <el-option :value="sb.symbol" :label="sb.name" v-for="sb in symbolOptions" :key="sb.symbol"></el-option>
        </el-select>
        <el-input v-model="condition.left" size="small" type="number"
                  :placeholder="isBetween(condition.symbol) ? '最小值':'比较值'"
                  :style="'width: ' + (isBetween(condition.symbol) ? '100px' : '200px')"></el-input>
        <span v-if="isBetween(condition.symbol)"> ~ </span>
        <el-input v-model="condition.right" placeholder="最大值"
                  type="number"
                  v-if="isBetween(condition.symbol)"
                  size="small" style="width: 100px;"></el-input>
      </div>

      <div v-else-if="condition.type === type.ONE || condition.type === type.MORE">
        <el-select v-model="condition.symbol" style="width: 120px; margin-right: 20px" size="small">
          <el-option :value="'='" label="完全等于"></el-option>
          <el-option :value="'in'" label="在选项中"></el-option>
        </el-select>
        <el-select v-model="condition.values" style="width: 200px;" size="small" multiple>
          <el-option :value="op" :label="op" v-for="(op, id) in condition.options" :key="id"></el-option>
        </el-select>
      </div>

      <div v-else-if="condition.type === type.DEPT || condition.type === type.USER">
        选择部门
      </div>

      <div v-else-if="condition.type === type.ORG">
        <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 15px"
                   round @click="showUserSelect = true, select = condition.values">选择
        </el-button>
        <div>
          <el-tag :type="type.DEPT === user.type? 'info': 'primary'" v-for="(user, index) in condition.orgValues"
                  size="mini" style="margin: 5px 10px 5px 0" :key="index"
                  @close="condition.orgValues.splice(index, 1)" closable>{{user.name}}
          </el-tag>
        </div>
      </div>
    </el-form-item>

    <org-picker :show="showUserSelect" :onlyUser="onlySelectUser"
                @close="showUserSelect = false" :selected="select"
                @selectOver="selected"></org-picker>
  </el-form>
</template>

<script>
  import orgPicker from '@/components/common/organizationPicker'
  import { conditionType } from '@/components/common/enumConst'
  
  export default {
    name: "condition",
    components: {orgPicker},
    props: {
      value: {
        default: () => {
          return {}
        },
        type: Object
      }
    },
    data() {
      return {
        type: conditionType,
        showUserSelect: false,
        onlySelectUser: false,
        select: [],
        symbolOptions: [
          {name: '大于', symbol: '>'},
          {name: '大于等于', symbol: '>='},
          {name: '小于', symbol: '<'},
          {name: '小于等于', symbol: '<='},
          {name: '等于', symbol: '='},
          {name: '介于两者之间', symbol: 'between'},
          {name: '包含并介于两者之间', symbol: 'between-eq'},
        ]
      }
    },
    computed: {
      selectedNode() {
        return this.$store.state.selectedNode;
      },
    },
    methods: {
      isBetween(symbol) {
        return symbol === 'between' || symbol === 'between-eq'
      },
      selected(select) {

      },
      selectClick(orgs) {
        this.select = orgs
      }
    }
  }
</script>

<style scoped>

</style>
