<template>
  <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="show"
      width="700px" center>
      <div class="picker">
        <div style="float:left;">
          <p>选择</p>
          <div class="box">
            <div>
              <el-input placeholder="搜索人员" prefix-icon="el-icon-search"
                        size="medium" v-model="search" :maxlength="50" clearable>
              </el-input>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
            <div style="margin-top: 8px; width: 100%;">
              <div style="margin-top: 8px; overflow-y: auto; height: calc(100% - 90px);">
                <div v-for="(node, index) in nodes" :key="index" class="line">
                  <el-checkbox></el-checkbox>
                  <span style="margin-left: 10px">
                    <i class="el-icon-folder-opened" v-if="node.type === 'dept'"></i>
                    <span class="avt" v-else>
                      {{node.name}}
                    </span>
                    <span style="margin-left: 10px">{{node.name}}</span>
                    <span style="float: right; color:#38adff;cursor: pointer">
                      <i class="el-icon-coin"></i>下级
                    </span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style="float:right;">
          <p>已选</p>
          <div class="box">
            <div style="margin-top: 8px; overflow-y: auto; ">
              <div v-for="(node, index) in nodes" :key="index" class="line">
                <span style="margin-left: 10px">
                    <i class="el-icon-folder-opened" v-if="node.type === 'dept'"></i>
                    <span class="avt" v-else>
                      {{node.name}}
                    </span>
                    <span style="margin-left: 10px">{{node.name}}</span>
                    <span style="float: right; color:#a9a9a9 !important;cursor: pointer">
                      <i class="el-icon-close"></i>
                    </span>
                  </span>
              </div>
            </div>
          </div>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false" size="small">取 消</el-button>
      <el-button type="primary" @click="show = false" size="small">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  export default {
    name: "organizationPicker",
    props: {
      //是否展示
      show:{
        default: true,
        type:Boolean
      },
      //标题
      title:{
        default: '请选择',
        type: String
      },
      //选择哪种类型 all=人和部门  user=只能选人  dept=只能选部门
      type:{
        default: 'all',
        type: String
      }
    },
    data(){
      return{
        checkAll: false,
        isIndeterminate: false,
        nodes:[
          {
            id:'325435',
            type: 'dept',
            name: '采购部',
          }, {
            id:'354335',
            type: 'dept',
            name: '研发部',
          }, {
            id:'3546535',
            type: 'dept',
            name: '行政部',
          },{
            id:'546354754756474',
            type: 'user',
            name: '张三',
            avatar: ''
          },{
            id:'546354754756474',
            type: 'user',
            name: '李四',
            avatar: ''
          }
        ],
        select:[
          {
            id:'354335',
            type: 'dept',
            name: '研发部',
          }, {
            id:'3546535',
            type: 'dept',
            name: '行政部',
          },{
            id:'546354754756474',
            type: 'user',
            name: '张三',
            avatar: ''
          },
        ],
        search:''
      }
    },
    methods:{
      handleCheckAllChange(){

      },
      handleCheckedChange(){

      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .el-dialog{
    border-radius: 13px;
    overflow: hidden;

    .el-dialog__header{
      background: #f7f7f7;
    }

    .el-dialog__body{
      padding-top: 0;
    }

    .el-dialog__footer{
      margin-top: 450px;
    }
  }

  .line{
    width: 290px;
    height: 35px;
    line-height: 35px;
    &:hover{
      background: #dfdfe0;
    }
    .avt{
      background: #38adff;
      padding: 8px 3px;
      font-size: xx-small;
      border-radius: 50%;
      color:#ffffff;
    }
    i{
      color: #448ed7;
      font-size: large;
    }
  }
  .picker{
    p{
      font-size: larger;
    }
    /deep/ .box{
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px;
      height: 400px;
      width: 290px;
      border-radius: 5px;
      border: 1px solid #d4d4d5;
      background: #f7f7f7;
      .el-breadcrumb{
        margin: 10px 0;
      }
    }
  }

  ::-webkit-scrollbar {
    float: right;
    width: 4px;
    height: 4px;
    background-color: #f8f8f8;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: #e8e8e8;
  }
</style>