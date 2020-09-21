<template>
	<div class="workspace">
		<el-tabs type="border-card">
			<el-tab-pane label="审批列表">
				<el-row style="margin-bottom: 20px">
					<el-col :span="6">
						<el-input size="medium" placeholder="搜索表单">
							<i slot="prefix" class="el-input__icon el-icon-search"></i>
						</el-input>
					</el-col>
				</el-row>
				<el-collapse v-model="actives">
					<el-collapse-item v-for="(group, index) in groups" :key="index" :title="group.name" :name="group.name">
						<div>
							<div v-for="(item, index) in group.items" :key="index" class="form-item">
								<i class="el-icon-document"></i>
								<div>
									<span>{{item.name}}</span>
									<span>发起审批</span>
								</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</el-tab-pane>
			<el-tab-pane label="待我处理(3)">
        <div class="no-data">暂无数据 😀</div>
      </el-tab-pane>
			<el-tab-pane label="我发起的">
        <div class="no-data">暂无数据 😀</div>
      </el-tab-pane>
			<el-tab-pane label="关于我的">
        <div class="no-data">暂无数据 😀</div>
      </el-tab-pane>
		</el-tabs>
	
	</div>
</template>

<script>
  export default {
    name: "workSpace",
    data() {
      return {
        groups: [
          {
            name: '人事',
            items: [
              {name: '入职'},
              {name: '离职'}, {name: '报销'},
              {name: '绩效'}, {name: '罚款'},
              {name: '物品申请'}, {name: '绩效'},
              {name: '招聘'},
            ]
          }, {
            name: '财务',
            items: [
              {name: '报销'},
              {name: '付款申请'},
            ]
          }, {
            name: '考勤',
            items: [
              {name: '出差'},
              {name: '加班'},
            ]
          },
        ],
        actives: []
      }
    },
    mounted() {
      this.groups.forEach(g => this.actives.push(g.name))
    }
  }
</script>

<style lang="less" scoped>
	.workspace {
		padding: 50px 20px;
    
    .no-data{
      text-align: center;
      padding: 50px 0;
      color: #656565;
      margin: 0 auto;
    }
		
		/deep/ .el-collapse {
			padding: 0 15px;
			background: #ffffff;
			
			.el-collapse-item__header {
				font-size: medium;
			}
			
			.el-collapse-item__wrap {
				padding: 20px 10px;
			}
			
			.el-tabs--border-card .el-tabs__content {
				padding: 40px 15px;
			}
		}
		
		.form-item {
			padding: 15px 10px;
			width: 200px;
			cursor: pointer;
			border: 1px solid #d9dada;
			border-radius: 5px;
			float: left;
			margin: 5px 10px;
			
			&:hover {
				border: 1px solid #448ed7;
				
				span {
					display: inline-block !important;
				}
			}
			
			i {
				padding: 12px;
				border-radius: 8px;
				float: left;
				font-size: 14px;
				color: #ffffff;
				background: #38adff;
			}
			
			div {
				height: 35px;
				line-height: 35px;
				
				span:nth-child(1) {
					margin-left: 5px;
				}
				
				span:nth-child(2) {
					display: none;
					float: right;
					color: #38adff;
					font-size: 12px;
				}
			}
			
			/*span:nth-child(1) {
				float: left;
				margin: 5px 0 0 10px;
			}*/
			/*span:nth-child(1) {
				float: right;
				color: #448ed7;
				font-size: x-small;
				margin: 5px 0 5px 0;
			}*/
		}
	}
</style>
