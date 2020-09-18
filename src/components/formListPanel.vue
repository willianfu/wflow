<template>
	<div class="from-panel">
		<div class="from-title">
			<span>流程面板</span>
			<div>
				<el-button type="primary" icon="el-icon-plus" size="mini" @click="newProcess">新建流程</el-button>
				<el-button icon="el-icon-sort" @click="groupSort" size="mini">分组排序</el-button>
			</div>
		</div>
		<draggable :list="group" group="group" handle=".el-icon-rank"
		           :options="{animation: 200 ,sort:true, chosenClass:'choose'}" @start="groupsSort = true"  @end="groupsSort = false">
			<div class="form-group" v-for="(group, gidx) in groups" :key="gidx">
				<div class="form-group-title">
					<span>{{group.name}}</span>
					<i class="el-icon-rank" title="长按拖动可对分组排序"></i>
					<div>
						<el-button type="text" icon="el-icon-setting">编辑分组</el-button>
					</div>
				</div>
				<draggable style="width: 100%; min-height:40px" :list="group.items" group="from" v-show="!groupsSort"
				           :options="{animation: 200, delay: 200, chosenClass:'choose',sort:true}">
					<div class="form-group-item" v-for="(item, index) in group.items" :key="index" title="长按0.5S后可拖拽表单进行排序">
						<div>
							<i class="el-icon-s-check" style="background: rgb(7, 189, 135)"></i>
							<span>{{item.name}}</span>
						</div>
						<div>
							<span>最后更新时间：{{item.updated}}</span>
						</div>
						<div>
							<el-button type="text" icon="el-icon-edit-outline" size="mini">编辑</el-button>
							<el-button type="text" icon="el-icon-close" size="mini">停用</el-button>
							<el-button type="text" icon="el-icon-s-promotion" size="mini">移动</el-button>
						</div>
					</div>
				</draggable>
				<div style="text-align: center" v-if="group.items === undefined || group.items.length === 0">
					<el-button type="text" icon="el-icon-plus" @click="newProcess">创建新表单</el-button>
				</div>
			</div>
		</draggable>
	</div>
</template>

<script>
  import draggable from "vuedraggable";

  export default {
    name: "formListPanel",
    components: {draggable},
    data() {
      return {
        groupsSort: false,
        groups: [
          {
            name: '人事',
            items: [
              {name: '入职', updated: '2020-09-20'},
              {name: '离职', updated: '2020-09-20'},
            ]
          }, {
            name: '财务',
            items: [
              {name: '报销', updated: '2020-09-20'},
              {name: '付款申请', updated: '2020-09-20'},
            ]
          }, {
            name: '考勤',
            items: [
              {name: '出差', updated: '2020-09-20'},
              {name: '加班', updated: '2020-09-20'},
            ]
          },
        ]
      }
    },
    methods: {
      newProcess() {
        this.$router.push("/layout/baseSetup")
      },
      editProcess() {
        this.$router.push("/layout/baseSetup")
      },
      groupSort() {

      }
    }
  }
</script>

<style lang="less" scoped>
	body {
		background: #ffffff !important;
	}
	
	.from-panel {
		padding: 50px 100px;
		min-width: 500px;
		background: #ffffff;
		
		/deep/ .from-title {
			div {
				float: right;
				
				.el-button {
					border-radius: 15px;
				}
			}
		}
		
		//height: 100vh;
	}
	
	.choose {
		background: #e9ebee;
	}
	
	.form-group {
		margin: 20px 0;
		padding: 5px 0px;
		border-radius: 10px;
		//border: 1px solid #d3d3d3;
		box-shadow: 1px 1px 10px 0 #d2d2d2;
		
		&:hover {
			box-shadow: 1px 1px 12px 0 #b3b3b3;
		}
		
		.form-group-title {
			padding: 5px 20px;
			height: 40px;
			line-height: 40px;
			border-bottom: 1px solid #d3d3d3;
			.el-icon-rank{
				display: none;
				cursor: move;
			}
			&:hover{
				.el-icon-rank{
					display: inline-block;
				}
			}
			div {
				display: inline-block;
				float: right;
			}
			
			span {
				margin-right: 15px;
				font-size: 15px;
				font-weight: bold;
			}
			
			/deep/ .el-button {
				color: #404040;
				margin-left: 20px;
				
				&:hover {
					color: #2b2b2b;
				}
			}
		}
		
		.form-group-item:nth-child(1) {
			border-top: none !important;
		}
		
		.form-group-item {
			color: #3e3e3e;
			font-size: small;
			padding: 10px 0;
			margin: 0 20px;
			height: 40px;
			position: relative;
			line-height: 40px;
			border-top: 1px solid #d3d3d3;
			
			div {
				display: inline-block;
			}
			
			i {
				border-radius: 10px;
				padding: 7px;
				font-size: 20px;
				color: #ffffff;
				margin-right: 10px;
			}
			
			div:nth-child(1) {
				float: left;
			}
			
			div:nth-child(2) {
				position: absolute;
				right: 30%;
			}
			
			div:nth-child(3) {
				float: right;
			}
		}
	}
</style>
