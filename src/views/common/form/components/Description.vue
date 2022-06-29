<template>
  <div :style="{'color': color}">
    <el-icon class="el-icon-warning-outline"></el-icon>
    <span> {{placeholder}}</span>
  </div>

</template>

<script>
export default {
  name: "Description",
  components: {},
  props: {
    mode: {
      type: String,
      default: 'DESIGN'
    },
    color:{
      type: String,
      default: '#868686'
    },
    placeholder: {
      type: String,
      default: '只是一段说明文字'
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
