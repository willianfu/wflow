<template>
	<div>
		<div v-if="type === 'file'" class="file">
			<i class="el-icon-plus"></i>
		</div>
		<div v-else class="image">
			<i class="el-icon-plus"></i>
			<i class="el-icon-picture-outline"></i>
		</div>
	</div>
</template>

<script>
  export default {
    name: "jUpload",
    props: {
      type: {
        default: 'file',
        type: String
      }
    }
  }
</script>

<style lang="less" scoped>
	.file{
		border: 1px dashed rgba(25, 31, 37, 0.12);
		border-radius: 5px;
		background: rgb(245, 247, 250);
		padding: 10px 0;
		text-align: center;
		max-width: 500px;
		i{
			color: #b0b0b1;
			font-weight: bold;
			font-size: 25px;
		}
	}
	.image{
		position: relative;
		height: 40px;
		i{
			color: #b0b0b1;
			position: absolute;
		}
		i:first-child{
			top: 4px; left: 0;
			background: rgb(245, 247, 250);
			font-size: 22px;
			padding: 5px;
			border-radius: 5px;
			border: 1px solid rgb(222, 224, 227);
			margin-right: 20px;
		}
		i:last-child{
			top: 0; left: 50px;
			font-size: 40px;
		}
	}
</style>
