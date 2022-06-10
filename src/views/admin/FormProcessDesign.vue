<template>
  <el-container>
    <el-header style="background: white">
      <layout-header></layout-header>
    </el-header>
    <div class="layout-body">
      <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"/>
      </transition>
    </div>
  </el-container>

</template>

<script>
import LayoutHeader from './LayoutHeader'

export default {
  name: "FormProcessDesign",
  components: {LayoutHeader},
  data() {
    return {

    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>

.layout-body{
  min-width: 980px;
}

</style>
