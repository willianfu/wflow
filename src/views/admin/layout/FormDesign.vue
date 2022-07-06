<template>
  <el-container style="height: calc(100vh - 65px);">
    <el-aside>
      <div class="components-nav">
        <span :class="{'selected': libSelect === 0}" @click="libSelect = 0">基础组件</span>
        <span :class="{'border': true, 'selected': libSelect === 1}" @click="libSelect = 1">扩展组件</span>
        <span :class="{'selected': libSelect === 2}" @click="libSelect = 2">关联组件</span>
      </div>
      <div class="components">
        <ul>
          <draggable class="drag" :list="components" :options="{sort: false}"
                     :group="{ name: 'form', pull: 'clone', put: false }"
                     @start="isStart = true" @end="isStart = false" :clone="clone">
            <li v-for="(cp, id) in components" :key="id">
              <i :class="cp.icon"></i>
              <span>{{ cp.title }}</span>
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
          <el-tooltip class="item" effect="dark" content="预览表单" placement="bottom-start">
            <i class="el-icon-view" @click="viewForms"></i>
          </el-tooltip>
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
                <div class="tip" v-show="forms.length === 0 && !isStart">👈 请在左侧选择控件并拖至此处</div>
                <draggable class="drag-from" :list="forms" group="form"
                           :options="{animation: 300, chosenClass:'choose', sort:true}"
                           @start="drag = true, select = null" @end="drag = false">

                  <div v-for="(cp, id) in forms" :key="id" class="form-item"
                       @click="select = id" :style="select === id ?'border-left: 4px solid #F56C6C':''">
                    <div class="form-header">
                      <p><span v-if="cp.props.required">*</span>{{ cp.title }}</p>
                      <div class="option">
                      <!--<i class="el-icon-copy-document" @click="copy"></i>-->
                        <i class="el-icon-close" @click="del(id)"></i>
                      </div>
                      <form-design-render :config="cp"/>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <el-aside class="layout-param">
      <div class="tool-nav-r" v-if="select !== null && forms[select] !== undefined">
        <i :class="forms[select].icon" style="margin-right: 5px; font-size: medium"></i>
        <span>{{ forms[select].title }}</span>
      </div>
      <div v-if="select === null || forms.length === 0" class="tip">
        😀 选中控件后在这里进行编辑
      </div>
      <div style="text-align:left; padding: 10px" v-else>
        <form-component-config :formSelected="select"/>
      </div>
    </el-aside>
    <el-dialog title="表单预览" :visible.sync="viewFormVisible">
      <el-form label-width="150px">
        <el-form-item :label="item.title" v-for="(item, index) in forms" :key="item.name + index">
          <form-design-render mode="PC" :config="item"/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
import FormDesignRender from '@/views/admin/layout/form/FormDesignRender'
import FormComponentConfig from '@/views/common/form/FormComponentConfig'
import components from '@/views/common/form/ComponentsConfigExport'

export default {
  name: "FormDesign",
  components: {draggable, FormComponentConfig, FormDesignRender},
  data() {
    return {
      libSelect: 0,
      viewFormVisible: false,
      isStart: false,
      showMobile: true,
      components,
      select: null,
      drag: false,
    }
  },
  computed: {
    forms() {
      return this.$store.state.design.formItems;
    }
  },
  methods: {
    copy(node, index) {
      this.form.splice(index + 1, 0, Object.assign({}, node))
    },
    getId() {
      return 'field' + (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString()
          + new Date().getTime().toString().substring(5);
    },
    del(index) {
      this.forms.splice(index, 1)
    },
    clone(obj) {
      obj.id = this.getId()
      return JSON.parse(JSON.stringify(obj));
    },
    viewForms(){
      this.viewFormVisible = true
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

  .selected {
    color: @primary;
  }

  .border {
    border-left: 1px solid #f5f6f6;
    border-right: 1px solid #f5f6f6;
  }

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

    .pc {
      margin-top: 4%;

      .drag-from {
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

  .tip {
    margin-top: 150px;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.select {
  color: #4b4b4b !important;
}

.form-header {
  font-size: small;
  color: #818181;
  text-align: left;
  position: relative;
  background-color: #fff;
  padding: 10px 15px;

  p {
    position: relative;
    margin: 0 0 10px 0;

    span {
      position: absolute;
      left: -8px;
      top: 3px;
      color: rgb(217, 0, 19);
    }
  }

  .option {
    position: absolute;
    top: -10px;
    right: -10px;
    i {
      font-size: large;
      cursor: pointer;
      color: #8c8c8c;
      padding: 5px;
      &:hover{
        color: #f56c6c;
      }
    }
  }
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
