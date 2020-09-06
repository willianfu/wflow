<template>
	<div class="header">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1" @click="to('/layout/baseSetup')">基础设置</el-menu-item>
			<el-menu-item index="2" @click="to('/layout/formDesign')">表单设计</el-menu-item>
			<el-menu-item index="3" @click="to('/layout/processDesign')">流程设计</el-menu-item>
			<el-menu-item index="4" @click="to('/layout/seniorSetup')">高级设置</el-menu-item>
		</el-menu>
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
            };
        },
        methods: {
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
	.layout-body {
		margin-top: 61px;
	}
	/deep/ .el-menu{
		top: 0;
		z-index: 999;
		position: fixed;
		width: 100%;
	}
</style>
