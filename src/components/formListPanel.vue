<template>
  <div>
    <p>流程面板</p>
    <el-button type="primary" icon="el-icon-plus" @click="newProcess">新建流程</el-button>
    <el-button icon="el-icon-edit" @click="editProcess">编辑流程</el-button>
  </div>
</template>

<script>
  export default {
    name: "formListPanel",
    methods:{
      newProcess(){
        this.$router.push("/layout/baseSetup")
      },
      editProcess(){
        this.$router.push("/layout/baseSetup")
      }
    }
  }
</script>

<style scoped>

</style>