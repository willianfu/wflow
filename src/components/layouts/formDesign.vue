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
                     :group="{ name: 'from', pull: 'clone', put: false }">
            <li v-for="(cp, id) in components" :key="id">
              <i class="el-icon-picture-outline-round"></i>
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
                <div class="tip" v-if="form.length === 0">
                  👈 请在左侧选择控件并拖至此处
                </div>
                <draggable class="drag-from" :list="form" group="from"
                           :options="{animation: 300, chosenClass:'choose',sort:true}"
                           @start="drag = true, select = null" @end="drag = false">

                  <div v-for="(cp, id) in form" :key="id" class="form-item"
                       @click="select = id" :style="select === id ?'border-left: 4px solid #F56C6C':''">
                    <component :is="atom.get(cp.name)">
                      <div class="option">
                        <i class="el-icon-copy-document"></i>
                        <i class="el-icon-delete"></i>
                      </div>
                    </component>
                  </div>
                </draggable>
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
</template>

<script>
  import draggable from "vuedraggable";
  import atom from '../forms/formComponents'

  export default {
    name: "formDesign",
    components: {draggable},
    data() {
      return {
        atom: atom,
        showMobile: true,
        components: [
          {text: '单行输入框', name: 'input'},
          {text: '多行输入框', name: 'input'},
          {text: '数字输入框', name: 'inputNumber'},
          {text: '单选框', name: 'radio'},
          {text: '多选框', name: 'checkbox'},
          {text: '日期', name: 'datePicker'},
          {text: '日期区间', name: 'timePicker'},
          {text: '图片', name: 'button'},
          /*{text: '说明文字', name:''},
          {text: '金额', name:''},
          {text: '附件', name:''},
          {text: '身份证', name:''},
          {text: '电话', name:''},
          {text: '部门', name:''},
          {text: '联系人', name:''}*/
        ],
        form: [],
        select: {},
        drag: false,
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "@/assets/theme";

  .choose {
    border: 1px dashed @primary;
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
      text-align: center;
      overflow-y: auto;
      .pc{
        margin-top: 4%;
        .drag-from{
          height: calc(100vh - 190px);
          background-color: rgb(245, 246, 246);
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
            padding: 10px 2px;
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
                list-style: none;
                background: #ffffff;
                padding: 10px 0;
                margin: 2px 0;
                cursor: grab;
              }
              .option{
                float: right;
                border-radius: 10px;
                background-color: #dedfdf;
                padding: 5px 5px;
                i:first-child{
                  margin-right: 5px;
                }
                i{
                  color: #4b4b4b;
                  cursor: pointer;
                  &:first-child:hover{
                    color: #1890FF;
                  }
                  &:first-child:hover{
                    color: #f56c6c;
                  }
                }
              }
            }
          }
        }

        .tip {
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

  }

  .layout-param {
    margin-top: 150px;
    text-align: center;
    font-size: 14px;
    color: rgb(122, 122, 122);
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
</style>
