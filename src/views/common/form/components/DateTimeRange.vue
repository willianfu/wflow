<template>
  <div>
    <div v-if="mode === 'DESIGN'" style="max-width: 300px">
      <el-date-picker  size="medium" disabled style="width: 100%;" :type="type" :start-placeholder="placeholder[0]" :end-placeholder="placeholder[1]"/>
    </div>
    <div v-else>
      <el-date-picker v-model="_value" size="medium" clearable :value-format="format" :type="type" :start-placeholder="placeholder[0]" :end-placeholder="placeholder[1]"/>
    </div>
  </div>
</template>

<script>
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "DateTimeRange",
  components: {},
  props:{
    format:{
      type: String,
      default: 'yyyy-MM-dd HH:mm'
    },
    placeholder:{
      type: Array,
      default: ()=>{
        return ['开始时间', '结束时间']
      }
    }
  },
  computed:{
    type(){
      switch (this.format){
        case 'yyyy-MM-dd': return 'daterange';
        case 'yyyy-MM-dd HH:mm': return 'datetimerange';
        default: return 'daterange';
      }
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
