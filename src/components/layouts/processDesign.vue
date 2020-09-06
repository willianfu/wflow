<template>
  <div @click="drawer = false">
    <div class="scale">
      <el-button icon="el-icon-plus" size="small" @click="scale += 10" circle></el-button>
      <span>{{scale}}%</span>
      <el-button icon="el-icon-minus" size="small" @click="scale -= 10" circle></el-button>
    </div>
    <div class="design" :style="'transform: scale('+ scale/100 +'); transform-origin: 50% 0px 0px;'">
      <el-row v-for="(node, id) in nodes" :key="id">
        <arrow :node="node" @click.prevent.stop="selectNode(node)"></arrow>
      </el-row>
    </div>
    <el-drawer :title="select.name" :visible.sync="drawer" direction="rtl">
      <span></span>
    </el-drawer>
  </div>

</template>

<script>
  import arrow from "./process/arrow";

  export default {
    name: "processDesign",
    components: {arrow},
    data() {
      return {
        select: {},
        drawer: false,
        scale: 100,
        nodes: [
          {
            name: '发起人',
            type: 'root',
          }, {
            name: '审批人',
            type: 'sp',
          }, {
            name: '审批人',
            type: 'sp',
            children: []
          }, {
            name: '抄送人',
            type: 'cs',
          }
        ]
      }
    },
		methods:{
			selectNode(node){
				this.select = node;
				this.drawer = true;
			}
		}
  }
</script>

<style lang="less" scoped>
  @import "@/assets/theme";

  .design {
    margin-top: 50px;

    /deep/ .el-row {
      display: flex;
      justify-content: center;
    }
  }

  .scale {
    z-index: 999;
    position: fixed;
    top: 80px;
    right: 40px;

    span {
      margin: 0 10px;
      font-size: 15px;
      color: #7a7a7a;
      width: 50px;
    }
  }
</style>
