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
               :options="{animation: 200 ,sort:true, chosenClass:'choose'}" @start="groupsSort = true"
               @end="groupsSort = false">
      <div class="form-group" v-for="(group, gidx) in groups" :key="gidx">
        <div class="form-group-title">
          <span>{{group.name}}</span>
          <span>({{group.items.length}})</span>
          <i class="el-icon-rank" title="长按拖动可对分组排序"></i>
          <div>
            <el-dropdown>
              <el-button type="text" icon="el-icon-setting">编辑分组</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline" @click.native="editGroup(group)">修改名称</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete" @click.native="delGroup(group)">删除分组</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <draggable style="width: 100%; min-height:25px" :list="group.items" group="from" v-show="!groupsSort"
                   :options="{animation: 200, delay: 200, chosenClass:'choose',sort:true}">
          <div class="form-group-item" v-for="(item, index) in group.items" :key="index" title="长按0.5S后可拖拽表单进行排序">
            <div>
              <i class="el-icon-s-check" style="background: rgb(7, 189, 135)"></i>
              <span>{{item.name}}</span><br>
            </div>
						<div>{{item.remark}}审批描述</div>
            <div>
              <span>最后更新时间：{{item.updated}}</span>
            </div>
            <div>
              <el-button type="text" icon="el-icon-edit-outline" size="mini" @click="editFrom(item)">编辑</el-button>
              <el-button type="text" icon="el-icon-close" size="mini" @click="stopFrom(item)">停用</el-button>
              <el-button type="text" icon="el-icon-s-promotion" size="mini" @click="moveFrom(item)">移动</el-button>
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

      },
      stopFrom(item) {
				this.$confirm(item.name + ' 停用后将会被转移到 “已停用” 分组，您可以再次启用或者删除它，是否继续?', '提示', {
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
