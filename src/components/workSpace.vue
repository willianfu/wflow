<template>
	<div class="workspace">
		<el-tabs type="border-card">
			<el-tab-pane label="审批列表">
				<el-row style="margin-bottom: 20px">
					<el-col :span="6">
						<el-input size="medium" v-model="formList.inputs" placeholder="搜索表单" clearable>
							<i slot="prefix" class="el-input__icon el-icon-search"></i>
						</el-input>
					</el-col>
				</el-row>
				<el-collapse v-model="actives" v-show="formList.inputs === ''">
					<el-collapse-item v-for="(group, index) in formList.list" :key="index"
					                  :title="group.name" :name="group.name" v-show="group.items.length > 0 && group.id > 0">
						<div>
							<div v-for="(item, index) in group.items" :key="index" class="form-item">
								<i :class="item.icon" :style="'background: '+item.background"></i>
								<div>
									<span>{{item.name}}</span>
									<span>发起审批</span>
								</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
				<div>
					<div v-for="(item, index) in formList.searchResult" :key="index" class="form-item">
						<i :class="item.icon" :style="'background: '+item.background"></i>
						<div>
							<span>{{item.name}}</span>
							<span>发起审批</span>
						</div>
					</div>
					<div class="no-data" v-show="formList.searchResult.length === 0 && formList.inputs !== ''">
						没有找到相关的表单 😥
					</div>
				</div>
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
  import {getTemplateGroups} from '@/api/setting'
  
  export default {
    name: "workSpace",
    data() {
      return {
        actives: [],
	      formList:{
          list:[],
		      inputs:'',
		      searchResult:[]
	      },
        pending:{
          list:[]
        }
      }
    },
    mounted() {
      this.getGroups()
    },
    methods: {
      getGroups() {
        getTemplateGroups().then(rsp => {
          this.formList.list = rsp.data
          this.formList.list.forEach(g => this.actives.push(g.name))
        }).catch(err => this.$message.error('获取分组异常'))
      },
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
				padding: 8px;
				border-radius: 8px;
				float: left;
				font-size: 20px;
				color: #ffffff;
				background: #38adff;
			}
			
			div {
				height: 35px;
				line-height: 35px;
				
				span:nth-child(1) {
					margin-left: 10px;
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
