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
      return {}
    },
    mounted() {
      this.$router.push("/formListPanel")
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
	body,html {margin:0; height:100%;}
	ul {
		padding: 0;
		margin: 0;
		
		li {
			list-style-type: none;
		}
	}

</style>
