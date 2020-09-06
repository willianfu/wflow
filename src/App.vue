<template>
	<div id="app">
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"/>
		</transition>
	</div>
</template>

<script>
    //import layout from './components/layout'
    export default {
        components: {},
        data() {
					return{}
        },
        methods: {}
    }
</script>
<style lang="less">
	@import "@/assets/global";
	
	body {
		margin: 0;
		min-width: 1000px;
		background-color: #f5f6f6;
	}
	ul{
		padding: 0;
		margin: 0;
		li{
			list-style-type: none;
		}
	}
	
	::-webkit-scrollbar {
		width: 4px;
		height: 4px;
		background-color: #f8f8f8;
	}
	
	::-webkit-scrollbar-thumb {
		border-radius: 16px;
		background-color: #e8e8e8;
	}
	
</style>
