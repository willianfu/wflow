<template>
  <el-container style="height: calc(100vh - 65px);">
    <el-aside>
      <div class="components-nav">
        <span>基础控件</span>
        <span style="border-left: 1px solid #f5f6f6; border-right: 1px solid #f5f6f6;">套件</span>
        <span>关联控件</span>
      </div>
      <div class="components">
        <ul>
          <draggable class="drag" :list="components" :options="{sort:false}"
                     :group="{ name: 'from', pull: 'clone', put: false }"
                     @start="isStart = true" @end="isStart = false" :clone="clone"
          >
            <li v-for="(cp, id) in components" :key="id">
              <i :class="cp.icon"></i>
              <span>{{cp.text}}</span>
            </li>
          </draggable>
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
            <i :class="{'el-icon-mobile':true, 'select': showMobile}" @click="showMobile = true"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="PC端" placement="bottom-start">
            <i :class="{'el-icon-monitor':true, 'select': !showMobile}" @click="showMobile = false"></i>
          </el-tooltip>
        </div>
      </div>
      <div class="work-form">
        <div :class="{'mobile': showMobile, 'pc': !showMobile}">
          <div :class="{'bd': showMobile}">
            <div :class="{'form-content': showMobile}">
              <div class="form">
                <div class="tip" v-show="form.length === 0 && !isStart">
                  👈 请在左侧选择控件并拖至此处
                </div>
                <draggable class="drag-from" :list="form" group="from"
                           :options="{animation: 300, chosenClass:'choose', sort:true}"
                           @start="drag = true, select = null" @end="drag = false">

                  <div v-for="(cp, id) in form" :key="id" class="form-item"
                       @click="select = id" :style="select === id ?'border-left: 4px solid #F56C6C':''">
                    <form-header :atom="atom.get(cp.name)" :obj="cp"
                                 @onCopy="copy(cp, id)"
                                 @onDel="del(id)"
                    >
                    </form-header>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <el-aside class="layout-param">
      <div class="tool-nav-r" v-if="select !== null && form[select] !== undefined">
        <i :class="form[select].icon" style="margin-right: 5px; font-size: medium"></i>
        <span>{{form[select].text}}</span>
      </div>
      <div v-if="select === null || form.length === 0" class="tip">
        😀 选中控件后在这里进行编辑
      </div>
      <div style="text-align:left; padding: 10px" v-else>
        <atom-config :atom="form[select]"></atom-config>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
  import draggable from "vuedraggable";
  import atom from '../forms/formComponents'
  import formHeader from '../forms/formHeader'
  import atomConfig from '../forms/atomConfig'

  export default {
    name: "formDesign",
    components: {draggable, formHeader, atomConfig},
    data() {
      return {
        atom: atom,
        isStart: false,
        showMobile: true,
        components: [
          {text: '单行输入框', name: 'jInput', icon: 'el-icon-edit', valid: false, props:{type: 'text'}},
          {text: '多行输入框', name: 'jInput', icon: 'el-icon-edit-outline', valid: false, props:{type: 'textarea'}},
          {text: '数字输入框', name: 'jInput', icon: 'el-icon-more-outline', valid: false, props:{type: 'number'}},
          {text: '单选框', name: 'jSelect', icon: 'el-icon-menu', valid: false, props:{type: 'single', options:['选项']}},
          {text: '多选框', name: 'jSelect', icon: 'el-icon-s-grid', valid: false, props:{type: 'more', options:['选项']}},
          {text: '日期', name: 'jDateTime', icon: 'el-icon-date', valid: false, props:{type: 'dateTime'}},
          {text: '日期区间', name: 'jDateTime', icon: 'el-icon-c-scale-to-original', valid: false, props:{type: 'dateTimeRange'}},
          {text: '上传图片', name: 'jFile', icon: 'el-icon-picture-outline', valid: false, props:{type: 'image'}},
          {text: '上传附件', name: 'jFile', icon: 'el-icon-upload', valid: false, props:{type: 'file'}},
          {text: '说明文字', name: 'explain', icon: 'el-icon-warning-outline', valid: false, props:{remark:'请输入说明内容'}},
          {text: '人员', name: 'orgSelect', icon: 'el-icon-user', valid: false, props:{type: 'user'}},
          {text: '部门', name: 'orgSelect', icon: 'el-icon-takeaway-box', valid: false, props:{type: 'dept'}},
          /*{text: '说明文字', name:''},
          {text: '金额', name:''},
          {text: '附件', name:''},
          {text: '身份证', name:''},
          {text: '电话', name:''},
          {text: '部门', name:''},
          {text: '联系人', name:''}*/
        ],
        select: null,
        drag: false,
      }
    },
    computed:{
      form(){
        return this.$store.state.template.form;
      }
    },
    methods:{
      copy(node, index){
        this.form.splice(index + 1, 0, Object.assign({}, node))
      },
      del(index){
        this.form.splice(index, 1)
      },
      clone(obj){
        return JSON.parse(JSON.stringify(obj));
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "@/assets/theme";

  .choose {
    border: 1px dashed @primary !important;
  }
  .components-nav {
    box-sizing: content-box;
    display: flex;
    align-items: center;
    margin: 12px 12px 0;
    height: 28px;
    box-shadow: 0 2px 4px 0 rgba(17, 31, 44, 0.04);
    border: 1px solid #ecedef;
    border-radius: 16px;
    background-color: #fff;

    span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 12px;
      color: rgba(17, 31, 44, 0.72);
      cursor: pointer;

      &:hover {
        color: @primary;
      }
    }
  }

  .components {
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 20px;
    //padding: 0 20px;
    font-size: 12px;
    width: 100%;
    color: rgba(17, 31, 44, 0.85);

    .drag {
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      li {
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

        &:hover {
          border: 1px solid @primary;
          color: @primary;
        }

        i {
          margin: 0 12px;
        }
      }

      li:nth-child(odd) {
        margin-right: 8px;
      }
    }
  }

  /deep/ .el-main {
    padding: 0;
  }

  .layout-main {
    background-color: #feffff;

    .tool-nav {
      font-size: medium;
      padding: 8px 20px;
      background: #fafafb;
      border-bottom: 1px solid #ebecee;

      div:first-child {
        display: inline-block;
        text-align: left;

        i {
          margin-right: 10px
        }
      }

      div:last-child {
        float: right;

        i {
          margin-left: 10px
        }
      }

      i {
        color: #7a7a7a;
        cursor: pointer;

        &:hover {
          color: #4b4b4b;
        }
      }
    }

    .work-form {
      margin: 0 auto;
      height: calc(100% - 38px);
      overflow-y: auto;
      background: rgb(245, 246, 246);
      border-left: 1px solid rgb(235, 236, 238);
      border-right: 1px solid rgb(235, 236, 238);
      .pc{
        margin-top: 4%;
        .drag-from{
          height: calc(100vh - 190px);
          background-color: rgb(245, 246, 246);
          .form-item, li {
            cursor: grab;
            background: #ffffff;
            padding: 10px;
            border: 1px solid #ebecee;
            margin: 5px 0;
          }
        }
      }
      .mobile {
        margin-left: auto;
        margin-right: auto;
        width: 360px;
        max-height: 640px;
        margin-top: 4%;
        border-radius: 24px;
        box-shadow: 0 8px 40px 0 rgba(17, 31, 44, 0.12);

        .bd {
          border: 1px solid rgba(17, 31, 44, 0.08);
          border-radius: 24px;
          padding: 10px 10px;
          background-color: #ffffff;

          .form-content {
            padding: 3px 2px;
            border-radius: 14px;
            background-color: #f2f4f5;

            .drag-from {
              width: 100%;
              height: calc(100vh - 190px);
              min-height: 200px;
              max-height: 600px;
            }

            .form {
              overflow-y: auto;
              width: 100%;
              display: inline-block;
              max-height: 640px;

              .form-item, li {
                border: 1px solid #ffffff;
                list-style: none;
                background: #ffffff;
                padding: 10px;
                margin: 5px 0;
                cursor: grab;
              }
            }
          }
        }
      }
      .tip {
        //float: left;
        margin: 0 auto;
        width: 65%;
        max-width: 400px;
        padding: 35px 20px;
        border-radius: 10px;
        border: 1px dashed rgba(25, 31, 37, 0.12);
        margin-top: 50px;
        text-align: center;
        font-size: 14px;
        color: rgb(122, 122, 122);
        z-index: 9999;
    
        &:hover {
          border: 1px dashed @primary;
        }
      }
    }

  }

  .layout-param {
    text-align: center;
    font-size: 14px;
    color: rgb(122, 122, 122);
    .tool-nav-r {
      text-align: left;
      font-size: small;
      border-left: 1px solid #ebecee;
      padding: 10px 20px;
      background: #fafafb;
      border-bottom: 1px solid #ebecee;
    }
    .tip{
      margin-top: 150px;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .select{
    color: #4b4b4b !important;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: #f8f8f8;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: #e8e8e8;
  }
</style>
