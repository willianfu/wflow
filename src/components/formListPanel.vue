<template>
	<div class="from-panel">
		<div class="from-title">
			<span>流程面板</span>
			<div>
				<el-button type="primary" icon="el-icon-plus" size="mini" @click="newProcess">新建流程</el-button>
				<el-button icon="el-icon-sort" @click="groupSort" size="mini">分组排序</el-button>
			</div>
		</div>
		<draggable :list="groups" group="group" handle=".el-icon-rank" filter=".undrag" @start="groupsSort = true"
		           :options="{animation: 300 ,sort:true, chosenClass:'choose'}" @end="groupSort">
			<div :class="{'form-group':true, 'undrag': (group.id === 0 || group.id === undefined)}"
			     v-show="group.items.length > 0 " v-for="(group, gidx) in groups" :key="gidx">
				<div class="form-group-title">
					<span>{{group.name}}</span>
					<span>({{group.items.length}})</span>
					<i class="el-icon-rank" title="长按拖动可对分组排序"></i>
					<div v-if="!(group.id === 0 || group.id === undefined)">
						<el-dropdown>
							<el-button type="text" icon="el-icon-setting">编辑分组</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item icon="el-icon-edit-outline" @click.native="editGroup(group)">修改名称</el-dropdown-item>
								<el-dropdown-item icon="el-icon-delete" @click.native="delGroup(group)">删除分组</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<draggable style="width: 100%; min-height:25px" :list="group.items" group="from" @end="groupSort"
				           v-show="!groupsSort"
				           :options="{animation: 300, delay: 200, chosenClass:'choose',sort:true}" filter=".undrag">
					<div :class="{'form-group-item':true, 'undrag': item.isStop}" v-for="(item, index) in group.items"
					     :key="index" title="长按0.5S后可拖拽表单进行排序">
						<div>
							<i :class="item.icon" :style="'background: '+item.background"></i>
							<span>{{item.name}}</span><br>
						</div>
						<div>{{item.remark}}审批描述</div>
						<div>
							<span>最后更新时间：{{item.updated}}</span>
						</div>
						<div>
							<el-button type="text" icon="el-icon-edit-outline" size="mini" @click="editFrom(item)">编辑</el-button>
							<el-button type="text" :icon="item.isStop ? 'el-icon-check':'el-icon-close'"
							           size="mini" @click="stopFrom(item)">
								{{item.isStop ? '启用' : '停用'}}
							</el-button>
							<el-button type="text" icon="el-icon-s-promotion" size="mini" @click="moveFrom(item)"
							           :disabled="item.isStop">移动
							</el-button>
						</div>
					</div>
				</draggable>
				<div style="text-align: center" v-if="group.items === undefined || group.items.length === 0">
					<el-button style="padding-top: 0" type="text" icon="el-icon-plus" @click="newProcess">创建新表单</el-button>
				</div>
			</div>
		</draggable>
	
	
	</div>
</template>

<script>
  import draggable from "vuedraggable";
  import {getTemplateGroups, groupItemsSort, getFormDetail} from '@/api/setting'

  export default {
    name: "formListPanel",
    components: {draggable},
    data() {
      return {
        groupsSort: false,
        groups: []
      }
    },
    mounted() {
      this.getGroups()
    },
    methods: {
      getGroups() {
        getTemplateGroups().then(rsp => {
          this.groups = rsp.data
        }).catch(err => this.$message.error('获取分组异常'))
      },
      newProcess() {
        this.$router.push("/layout/baseSetup")
      },
      editProcess() {
        this.$router.push("/layout/baseSetup")
      },
      groupSort() {
        this.groupsSort = false
        groupItemsSort(this.groups).then(rsp => {
          this.$message.success(rsp.data)
          this.getGroups()
        }).catch(err => {
          this.getGroups()
          this.$message.error(err.response.data)
        })
      },
      delGroup(group) {
        this.$confirm('删除分组并不会删除表单，表单将会被转移到 “其他” 分组，确定要删除分组 ' + group.name + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      },
      editGroup(group) {
        this.$prompt('请输入新的组名', '修改分组名', {
          confirmButtonText: '提交',
          cancelButtonText: '取消',
          inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,30}$/,
          inputErrorMessage: '分组名不能为空且长度小于30',
          inputPlaceholder: '请输入分组名',
          inputValue: group.name
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        })
      },
      editFrom(item) {
        getFormDetail({templateId: item.id}).then(rsp => {
          let data = rsp.data;
          let template = {
            id: this.$getDefalut(data, 'templateId', 0),
            baseSetup: {
              icon: this.$getDefalut(data, 'icon', 'el-icon-s-custom'),
              name: this.$getDefalut(data, 'name', '未命名的表单'),
              group: this.$getDefalut(data, 'group', ''),
              remark: this.$getDefalut(data, 'remark', ''),
              whoCommit: JSON.parse(this.$getDefalut(data, 'whoCommit', '[]')),
              whoEdit: JSON.parse(this.$getDefalut(data, 'whoEdit', '[]')),
              whoViewData: JSON.parse(this.$getDefalut(data, 'whoViewData', '[]')),
            },
            form: JSON.parse(this.$getDefalut(data, 'formItems', '[]')),
            process: JSON.parse(
              this.$getDefalut(data, 'process',
                JSON.stringify({
                  type: 'root',
                  name: '发起人',
                  id: '787489674',
                })
              )),
          }
          this.$store.commit("setTemplate", template);
          this.$router.push("/layout/baseSetup");
        }).catch(err => this.$message.error(err.response.data));
      },
      stopFrom(item) {
        let tip = item.isStop ? ' 启用后将会进入 “其他” 分组，是否继续？' : ' 停用后将会被转移到 “已停用” 分组，您可以再次启用或者删除它，是否继续?';
        this.$confirm(item.name + tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      },
      moveFrom(item) {

      },
    }
  }
</script>

<style lang="less" scoped>
	body {
		background: #ffffff !important;
	}
	
	.undrag {
		background: #ebecee !important;
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
			
			.el-icon-rank {
				display: none;
				cursor: move;
			}
			
			&:hover {
				.el-icon-rank {
					display: inline-block;
				}
			}
			
			div {
				display: inline-block;
				float: right;
			}
			
			span:first-child {
				margin-right: 5px;
				font-size: 15px;
				font-weight: bold;
			}
			
			span:nth-child(2) {
				color: #656565;
				font-size: small;
				margin-right: 10px;
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
				color: #7a7a7a;
				font-size: 12px;
				left: 200px;
				max-width: 300px;
				overflow: hidden;
			}
			
			div:nth-child(3) {
				position: absolute;
				right: 30%;
			}
			
			div:nth-child(4) {
				float: right;
			}
		}
	}
</style>
