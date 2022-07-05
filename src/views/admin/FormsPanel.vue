<template>
  <div class="from-panel" ref="panel">
    <div class="from-title">
      <el-button icon="el-icon-back" type="info" size="mini" circle plain style="margin-right: 15px" @click="$router.push('/')"></el-button>
      <span>流程面板</span>
      <div>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="newProcess">新建表单</el-button>
        <el-button icon="el-icon-plus" @click="addGroup" size="mini">新建分组</el-button>
      </div>
    </div>
    <draggable :list="groups" group="group" handle=".el-icon-rank" filter=".undrag" @start="groupsSort = true"
               :options="{animation: 300 ,sort:true, scroll: true, chosenClass:'choose'}" @end="groupSort">
      <div :class="{'form-group':true, 'undrag': (group.id === 0 || group.id === undefined)}"
           v-show="group.id > 1 || group.items.length > 0 " v-for="(group, gidx) in groups" :key="gidx">
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
        <draggable style="width: 100%; min-height:25px" :list="group.items" group="from" @end="groupSort" v-show="!groupsSort" filter=".undrag"
                   :options="{animation: 300, delay: 200, chosenClass:'choose', scroll: true, sort:true}">
          <div :class="{'form-group-item':true, 'undrag': item.isStop}" v-for="(item, index) in group.items"
               :key="index" title="长按0.5S后可拖拽表单进行排序">
            <div>
              <i :class="item.logo.icon" :style="'background: '+item.logo.background"></i>
              <span>{{item.formName}}</span><br>
            </div>
            <div class="desp">{{item.remark}}</div>
            <div>
              <span>最后更新时间：{{item.updated}}</span>
            </div>
            <div>
              <el-button type="text" icon="el-icon-edit-outline" size="mini" @click="editFrom(item, group)">编辑</el-button>
              <el-button type="text" :icon="item.isStop ? 'el-icon-check':'el-icon-close'" size="mini" @click="stopFrom(item)">
                {{item.isStop ? '启用' : '停用'}}
              </el-button>

              <el-button type="text" icon="el-icon-delete" size="mini" @click="moveFrom(item)" v-if="item.isStop">删除
              </el-button>
              <el-popover placement="left" trigger="click" width="400" style="margin-left: 10px" @show="moveSelect === null" v-else>
                <el-radio-group v-model="moveSelect" size="mini">
                  <el-radio :label="g.id" border v-for="g in groups" :key="g.id" v-show="g.id > 1"
                            :disabled="g.id === group.id" style="margin: 10px;">{{g.name}}</el-radio>
                </el-radio-group>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini" @click="moveFrom(item)">提交</el-button>
                </div>
                <el-button slot="reference" type="text" icon="el-icon-s-promotion" size="mini" >移动</el-button>
              </el-popover>
            </div>
          </div>
        </draggable>
        <div style="text-align: center" v-if="group.items === undefined || group.items.length === 0">
          <el-button style="padding-top: 0" type="text" icon="el-icon-plus" @click="newProcess(group.id)">创建新表单</el-button>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {
  getFormGroups, groupItemsSort,
  getFormDetail, updateGroup, updateForm
} from '@/api/design'

export default {
  name: "FormsPanel",
  components: {draggable},
  data() {
    return {
      moveSelect: '',
      visible: false,
      groupsSort: false,
      groups: []
    }
  },
  mounted() {
    this.getGroups()
  },
  methods: {
    getGroups() {
      getFormGroups().then(rsp => {
        this.groups = rsp.data
        this.groups.forEach(group => {
          group.items.forEach(item => {
            item.logo = JSON.parse(item.logo)
          })
        })
      }).catch(err => this.$message.error('获取分组异常'))
    },
    newProcess(groupId) {
      this.$store.commit("setTemplate", this.getTemplateData());
      this.$store.commit("setIsEdit", false);
      this.$router.push("/admin/design/baseSetting?groupId=" + groupId);
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
    addGroup() {
      this.$prompt('请输入要添加的组名', '新的分组名', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9\\-]{1,30}$/,
        inputErrorMessage: '分组名不能为空且长度小于30',
        inputPlaceholder: '请输入分组名'
      }).then(({value}) => {
        updateGroup({name: value}, 'post').then(rsp => {
          this.$message.success(rsp.data)
          this.getGroups()
        }).catch(err => this.$message.error(err.response.data))
      })
    },
    delGroup(group) {
      this.$confirm('删除分组并不会删除表单，表单将会被转移到 “其他” 分组，确定要删除分组 ' + group.name + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateGroup({id: group.id}, 'delete').then(rsp => {
          this.$message.success(rsp.data)
          this.getGroups()
        }).catch(err => this.$message.error(err.response.data))
      })
    },
    editGroup(group) {
      this.$prompt('请输入新的组名', '修改分组名', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9\\-]{1,30}$/,
        inputErrorMessage: '分组名不能为空且长度小于30',
        inputPlaceholder: '请输入分组名',
        inputValue: group.name
      }).then(({value}) => {
        updateGroup({id: group.id, name: value}, 'put').then(rsp => {
          this.$message.success(rsp.data)
          this.getGroups()
        }).catch(err => this.$message.error(err.response.data))
      })
    },
    updateForm(item, type) {
      updateForm({templateId: item.id, type: type}).then(rsp => {
        this.$message.success(rsp.data)
        this.getGroups()
      }).catch(err => this.$message.error(err.response.data))
    },
    getTemplateData(data, group){
      return data
    },
    editFrom(item, group) {
      this.$router.push("/admin/design/baseSetting?code=" + item.formId);
    },
    stopFrom(item) {
      let tip = item.isStop ? ' 启用后将会进入 “其他” 分组，是否继续？' : ' 停用后将会被转移到 “已停用” 分组，您可以再次启用或者删除它，是否继续?';
      this.$confirm(item.name + tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateForm(item, (item.isStop ? 'using' : 'stop'));
      })
    },
    moveFrom(item) {
      if (item.isStop) {
        this.$confirm('您确定要删除表单 ' + item.name + ' 吗，删除后无法恢复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateForm(item, 'delete');
        })
      } else {
        if (this.moveSelect === null || this.moveSelect === ''){
          this.$message.error('请选择分组')
          return;
        }
        updateForm({templateId: item.id, type: 'move', groupId: this.moveSelect}).then(rsp => {
          this.$message.success(rsp.data)
          this.getGroups()
          this.moveSelect = null
        }).catch(err => this.$message.error(err.response.data))
      }
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

@media screen and (max-width: 1000px) {
  .desp {
    display: none !important;
  }
}

@media screen and (max-width: 800px) {
  .from-panel{
    padding: 50px 10px;
  }
}
</style>
