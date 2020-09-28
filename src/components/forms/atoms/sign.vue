<template>
	<div class="sign">
		<span>签署 </span>
		<i class="el-icon-edit"></i>
	</div>
</template>

<script>
	//https://github.com/szimek/signature_pad
  export default {
    name: "sign"
	  
  }
</script>

<style lang="less" scoped>
	.sign{
		border: 1px dashed rgba(25, 31, 37, 0.12);
		border-radius: 5px;
		background: rgb(245, 247, 250);
		padding: 15px 0;
		text-align: center;
		max-width: 500px;
		color: #b0b0b1;
		i{
			font-size: 25px;
		}
	}
</style>
