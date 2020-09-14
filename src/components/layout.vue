<template>
	<div>
		<div class="header">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1" @click="to('/layout/baseSetup')">基础设置</el-menu-item>
				<el-menu-item index="2" @click="to('/layout/formDesign')">表单设计</el-menu-item>
				<el-menu-item index="3" @click="to('/layout/processDesign')">流程设计</el-menu-item>
				<el-menu-item index="4" @click="to('/layout/seniorSetup')">高级设置</el-menu-item>
			</el-menu>
			<div class="publish">
				<el-button size="mini" @click="preview"><i class="el-icon-view"></i>预览</el-button>
				<el-button size="mini" type="primary" @click="publish"><i class="el-icon-s-promotion"></i>发布</el-button>
			</div>
		</div>
		
		<el-dialog title="请使用手机扫码预览" :visible.sync="viewCode" width="300px" :close-on-click-modal="false" center>
			<img src="../assets/image/code.png" width="250" height="250">
		</el-dialog>
		
		<div class="layout-body">
			<transition name="router-fade" mode="out-in">
				<router-view v-if="!$route.meta.keepAlive"/>
			</transition>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                viewCode: false,
            };
        },
        methods: {
            publish() {
                this.$confirm('您确定审批流程已配置完毕,并需要将其发布，发布后立即生效，是否继续?', '提示', {
                    confirmButtonText: '发布',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                })
            },
            preview() {
				this.viewCode = true;
            },
            to(path) {
                this.$router.push(path);
                console.log(this.$route.path);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style lang="less" scoped>
	@import "@/assets/global";
	
	/deep/ .header {
		.el-menu {
			top: 0;
			z-index: 999;
			display: flex;
			justify-content: center;
			width: 100%;
		}
		
		.publish {
			position: fixed;
			top: 15px;
			right: 20px;
			z-index: 1000;
			
			i {
				margin-right: 6px;
			}
			
			button {
				border-radius: 15px;
			}
		}
	}
</style>
