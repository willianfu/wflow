<template>
	<div @click="drawer = false">
		<div class="scale">
			<el-button icon="el-icon-plus" size="small" @click="scale += 10" :disabled="scale >= 150" circle></el-button>
			<span>{{scale}}%</span>
			<el-button icon="el-icon-minus" size="small" @click="scale -= 10" :disabled="scale <= 50" circle></el-button>
		</div>
		<div class="design" :style="'transform: scale('+ scale/100 +'); transform-origin: 50% 0px 0px;'">
			<el-row v-for="(node, id) in nodes" :key="id">
				<arrow :node="node" :index="id" @addNode="addNode" @delNode="delNode(id)" @select="selectNode">
                </arrow>
			</el-row>
          <el-row>
            <div class="end-node">流程结束</div>
          </el-row>
          
		</div>
		<el-drawer :title="select.name" :visible.sync="drawer" direction="rtl"
            :modal="false" >
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
                    }/*, {
                        name: '审批人',
                        type: 'sp',
                    }, {
                        name: '审批人',
                        type: 'sp',
                        children: []
                    }, {
                        name: '抄送人',
                        type: 'cs',
                    }*/
                ]
            }
        },
        methods: {
          selectNode(node) {
            this.select = node;
            this.drawer = true;
          },
          addNode(type, index){
              console.log(index, type)
            if (type === 'sp'){
              this.nodes.splice(index + 1, 0, {
                name: '审批人',
                type: 'sp',
              })
            }else if(type === 'cs'){
              this.nodes.splice(index + 1, 0, {
                name: '抄送人',
                type: 'cs',
              })
            }else{
              this.$message({
                message: '暂不支持条件分支哦 😁',
                type: 'warning'
              });
            }
          },
          delNode(index){
            this.nodes.splice(index, 1)
          }
        }
    }
</script>

<style lang="less" scoped>
	@import "@/assets/theme";
	
	.design {
		margin-top: 100px;
		
		/deep/ .el-row {
			display: flex;
			justify-content: center;
          .end-node{
            margin-bottom: 20px;
            border-radius: 15px;
            padding: 5px 10px;
            font-size: small;
            color: #747474;
            background-color: #f2f2f2;
            box-shadow: 0 0 10px 0 #bcbcbc;
          }
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
