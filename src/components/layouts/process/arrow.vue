<template>
  <div :class="{'arrow': true, 'borderTop': !showCard(node)}" ref="arrow" >
    <div @click.stop="select" v-if="showCard(node)">
      <el-card shadow="always" >
        <div slot="header" :class="node.type">
          <span>{{node.name}}</span>
          <i class="el-icon-close" v-if="'root' !== node.type" @click.stop="delNode"></i>
          <el-tooltip effect="dark" content="复制条件" placement="top-start">
            <i class="el-icon-copy-document" v-if="'tj' === node.type"></i>
          </el-tooltip>
        </div>
        <span>请设置{{node.name}}</span>
      </el-card>
    </div>
    <div class="line-y">
      <el-popover
          placement="bottom-start"
          title="添加流程节点"
          width="350"
          trigger="click">
        <div class="node-select">
          <div @click="addNode('sp')">
            <i class="el-icon-s-check" style="color:rgb(255, 148, 62);"></i>
            <span>审批人</span>
          </div>
          <div @click="addNode('cs')">
            <i class="el-icon-s-promotion" style="color:rgb(50, 150, 250);"></i>
            <span>抄送人</span>
          </div>
          <div @click="addNode('tj')">
            <i class="el-icon-share" style="color:rgb(21, 188, 131);"></i>
            <span>条件分支</span>
          </div>
        </div>
        <el-button icon="el-icon-plus" ref="bt" slot="reference"
                   type="primary" size="small"  circle>
        </el-button>
      </el-popover>
    </div>
    <div class="jt" v-if="!showArrow(node)"></div>
    <div class="add-tj" v-if="showAddTjBtn(node)" @click="addCd">添加条件</div>

  </div>
</template>

<script>
  export default {
    name: "arrow",
    props: {
      hasArrow: {
        default: true,
        type: Boolean
      },
      node:{
        default: null,
        type: Object
      },
      index:{
        default: null,
        type: Number
      }
    },
    methods: {
      addNode(type){
        this.$refs.arrow.click()
        this.$emit('addNode', type, this.node)
      },
      addCd(){
        this.$emit('addCd', this.node)
      },
      delNode(){
        this.$emit('delNode')
      },
      select(){
        this.$emit('select', this.node)
      },
      showCard(node){
        return node !== null
          && (node.type === 'root'
            || node.type === 'sp'
            || node.type === 'cs'
            || node.type === 'tj')
      },
      showArrow(node){
        return node.node === undefined
      },
      showAddTjBtn(node){
        return node.node !== undefined && node.node.conditions !== undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "@/assets/theme";

  .borderTop{
    border-top: 1px solid #a9a9a9;
  }
  .arrow{
    position: relative;
    .add-tj{
      cursor: pointer;
      font-size: small;
      border-radius: 14px;
      padding: 8px 10px;
      color: rgb(21, 188, 131);
      width: 54px;
      left: calc(50% - 36px);
      bottom: -15px;
      background-color: #ffffff;
      position: absolute;
      box-shadow: 0 0 8px 2px #e5e5e5;
      &:hover{
        box-shadow: 0 0 8px 2px #d6d6d6;
      }
    }
  }
  .arrow {
    /deep/ .el-card {
      margin: 0 auto;
      cursor: pointer;
    /*  margin: 0 60px;*/
      height: 77px;
      font-size: medium;
      width: 220px;

      .el-card__header {
        color: #ffffff;
        font-size: small;
        width: 100%;
        padding: 0;
      }
      .el-card__body{
        padding: 10px 20px;
        font-size: small;
      }
      .root, .sp, .cs, .tj {
        padding: 5px 10px;

        span {
          &:hover {
            text-decoration: underline;
          }
        }

        i {
          display: none;
          float: right;
          margin-top: 2px;

          &:hover {
            font-size: 15px;
          }
        }
      }

      .root {
        background-color: rgb(87, 106, 149);
      }

      .sp {
        background-color: rgb(255, 148, 62);
      }
      .cs {
        background-color: #1890ff;
      }
      .tj {
        font-size: small;
        background-color: #ffffff;
        color: rgb(21, 188, 131);
        i{
          color: #818181;
        }
        i:last-child{
          margin-right: 10px;
        }
      }
      &:hover {
        border: 1px solid @primary;

        i {
          display: inline;
        }
      }
    }
    .line-y {
      position: relative;
      height: 80px;
      margin: 0 auto;
      width: 0;
      border: 1px solid #a9a9a9;

      button {
        position: absolute;
        top: 18px;
        right: -16px;

        &:hover {
          box-shadow: 0 0 10px 2px #C2C2C2;
        }
      }
    }

    .jt {
      border: 5px solid rgb(245, 246, 246);
      border-top-width: 10px;
      border-top-color: #a9a9a9;
      margin: 0 auto;
      width: 0;
      height: 0;
    }
  }

  .node-select{
    div{
      display: inline-block;
      margin: 5px 5px;
      cursor: pointer;
      padding: 10px 15px;
      border: 1px solid #F8F9F9;
      background-color: #F8F9F9;
      border-radius: 10px;
      width: 130px;
      position: relative;
      span{
        position: absolute;
        left: 65px;
        top: 18px;
      }
      &:hover{
        background-color: #fff;
        box-shadow: 0 0 8px 2px #d6d6d6;
      }
      i{
        font-size: 25px;
        padding: 5px;
        border: 1px solid #dedfdf;
        border-radius: 14px;
      }
    }
  }
</style>
