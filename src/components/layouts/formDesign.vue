<template>
	<div>
		<el-container>
			<el-aside>
				<div class="components-nav">
					<span>基础控件</span>
					<span style="border-left: 1px solid #f5f6f6; border-right: 1px solid #f5f6f6;">套件</span>
					<span>关联控件</span>
				</div>
				<div class="components">
					<ul>
						<li v-for="(cp, id) in components" :key="id">
							<i class="el-icon-picture-outline-round"></i>
							<span>{{cp.name}}</span>
						</li>
					</ul>
				</div>
			</el-aside>
			
			<el-main class="layout-main">
				<div class="tool-nav">
					<div>
						<el-tooltip class="item" effect="dark" content="撤销" placement="bottom-start">
							<i class="el-icon-refresh-left"></i>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="恢复" placement="bottom-start">
							<i class="el-icon-refresh-right"></i>
						</el-tooltip>
					</div>
					<div>
						<el-tooltip class="item" effect="dark" content="移动端" placement="bottom-start">
							<i class="el-icon-mobile"></i>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="PC端" placement="bottom-start">
							<i class="el-icon-monitor"></i>
						</el-tooltip>
					</div>
				</div>
				<div class="work-form">
					<div class="mobile">
						<div class="bd">
							<div class="form-content">
								<div class="form">
									<div class="tip">
										👈 请在左侧选择控件并拖至此处
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-main>
			
			<el-aside class="layout-param">
				<div>
					😀 添加控件后在这里进行编辑
				</div>
			</el-aside>
		</el-container>
	</div>
</template>

<script>
    export default {
        name: "formDesign",
        data() {
            return {
                components: [
                    {name: '单行输入框'}, {name: '多行输入框'}, {name: '数字输入框'}, {name: '单选框'}, {name: '多选框'}, {name: '日期'}, {name: '日期区间'},
                    {name: '图片'}, {name: '说明文字'}, {name: '金额'}, {name: '附件'}, {name: '身份证'}, {name: '电话'}, {name: '部门'}, {name: '联系人'}
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
	@import "@/assets/theme";
	.components-nav{
		box-sizing: content-box;
		display: flex;
		align-items: center;
		margin: 12px 12px 0;
		height: 28px;
		box-shadow: 0 2px 4px 0 rgba(17, 31, 44, 0.04);
		border: 1px solid #ecedef;
		border-radius: 16px;
		background-color: #fff;
		span{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: 12px;
			color: rgba(17, 31, 44, 0.72);
			cursor: pointer;
			&:hover{
				color: @primary;
			}
		}
	}
	.components{
		overflow-x: hidden;
		overflow-y: scroll;
		margin-top: 20px;
		//padding: 0 20px;
		font-size: 12px;
		width: 100%;
		height: calc(100vh - 44px);
		color: rgba(17, 31, 44, 0.85);
		ul{
			margin-left: 20px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			li{
				text-align: center;
				display: flex;
				align-items: center;
				width: 124px;
				height: 38px;
				margin-bottom: 12px;
				border: 1px solid transparent;
				border-radius: 8px;
				cursor: grab;
				background-color: #fff;
				&:hover{
					border: 1px solid @primary;
					color: @primary;
				}
				i{
					margin: 0 12px;
				}
			}
			li:nth-child(odd) {
				margin-right: 8px;
			}
		}
	}
	/deep/ .el-main{
		padding: 0;
	}
	.layout-main{
		background-color:#feffff;
		.tool-nav{
			font-size: medium;
			padding: 8px 20px;
			background: #fafafb;
			border-bottom: 1px solid #ebecee;
			div:first-child{
				display: inline-block;
				text-align: left;
				i{margin-right: 10px}
			}
			div:last-child{
				float: right;
				i{margin-left: 10px}
			}
			i{
				color: #7a7a7a;
				cursor: pointer;
				&:hover{
					color: #4b4b4b;
				}
			}
		}
		.work-form{
			text-align: center;
			.mobile{
				margin-left: auto;
				margin-right: auto;
				width: 360px;
				max-height: 640px;
				margin-top: 4%;
				border-radius: 24px;
				box-shadow: 0 8px 40px 0 rgba(17, 31, 44, 0.12);
				.bd{
					border: 1px solid rgba(17, 31, 44, 0.08);
					border-radius: 24px;
					padding: 10px 10px;
					background-color: #ffffff;
					.form-content{
						border-radius: 14px;
						background-color: #f2f4f5;
						.form{
							height: calc(100vh * 0.8);
							display: inline-block;
							max-height: 640px;
						}
					}
				}
				.tip{
					padding: 35px 20px;
					border-radius: 10px;
					border: 1px dashed rgba(25, 31, 37, 0.12);
					margin-top: 50px;
					text-align: center;
					font-size: 14px;
					color: rgb(122, 122, 122);
					&:hover{
						border: 1px dashed @primary;
					}
				}
			}
		}
		
	}
	
	.layout-param{
		margin-top: 150px;
		text-align: center;
		font-size: 14px;
		color: rgb(122, 122, 122);
	}
</style>
