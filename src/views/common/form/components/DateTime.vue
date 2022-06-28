<template>
  <div>
    <div v-if="mode === 'DESIGN'" >
      <el-date-picker disabled :type="type" :placeholder="placeholder"></el-date-picker>
    </div>
    <div v-else>
      <el-date-picker :type="type" :placeholder="placeholder"></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateTime",
  components: {},
  props:{
    mode:{
      type: String,
      default: 'DESIGN'
    },
    required:{
      type: Boolean,
      default: false
    },
    format:{
      type: String,
      default: 'yyyy-MM-dd HH:mm'
    },
    placeholder:{
      type: String,
      default: '请选择日期时间'
    }
  },
  computed:{
    type(){
      switch (this.format){
        case 'yyyy': return 'year';
        case 'yyyy-MM': return 'month';
        case 'yyyy-MM-dd': return 'date';
        case 'yyyy-MM-dd HH:mm': return 'datetime';
        default: return 'datetime';
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
