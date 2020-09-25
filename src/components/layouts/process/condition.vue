<template>
	<span>
		{{value}}
	</span>
</template>

<script>
  export default {
    name: "condition",
	  props:{
      value:{
        default: ()=> {return {}},
	      type: Object
      }
	  }
  }
</script>

<style scoped>

</style>
