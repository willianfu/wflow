<template>
  <div :class="{'arrow': true, 'borderTop': !showCard(node)}" ref="arrow" >
    <div @click.stop="select" v-if="showCard(node)">
      <el-card shadow="always" >
        <div slot="header" :class="node.type">
          <span>
            <i :class="{'el-icon-s-check': node.type === 'sp', 'el-icon-s-promotion': node.type === 'cs'}"></i>
            {{node.name}}
          </span>
          <i class="el-icon-close" v-if="'root' !== node.type" @click.stop="delNode"></i>
          <el-tooltip effect="dark" content="复制条件" placement="top-start">
            <i class="el-icon-copy-document" v-if="'tj' === node.type"></i>
          </el-tooltip>
        </div>
        <div style="position:relative;" v-show="'notify' === node.props.approval.timeoutEvent.event">
          <i class="el-icon-time" style="font-size: x-small; position:absolute; left: -15px; top: -5px;"></i>
        </div>
        <span>{{nodeText}}</span>
        
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
    <div class="jt" v-if="showArrow(node)"></div>
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
    computed:{
      nodeText(){
        let text = '', type = '', approval = this.node.props.approval;
        if (this.node.type === 'root'){
          text = this.getUsersText(approval.user.users)
          text = text === '' ? '所有人':text
          type = '发起人'
        }else if (this.node.type === 'sp'){
          switch (approval.type) {
            case "1": text = this.getUsersText(approval.user.users); break;
            case '2': text = '发起人自选(' +
                    (approval.user.select === 'one' ? '一人)':'多人)'); break;
            case '3': text = '连续多级主管'; break;
            case '4': text = '发起人的' +
                    (approval.leaderLevel === 1 ?
                            '直接主管' : ('第 ' + approval.leaderLevel + ' 级主管')); break;
            case '5': text = '角色- ' +
                    (approval.user.role !== ''?approval.user.role.name : '请选择角色'); break;
            case '6': text = '发起人自己'; break;
          }
          type = '审批人'
        }else if (this.node.type === 'tj'){
          type = '审批条件'
        }else if (this.node.type === 'cs'){
          text = this.getUsersText(approval.user.users)
          type = '抄送人'
        }else {
          return '未知节点'
        }
        if (text.lastIndexOf('、') !== -1){
          text = text.substring(0, text.length - 1);
        }else if(text === ''){
          text = '请设置' + type
        }
        return text.length > 24 ? (text.substring(0, 24) + '...') : text;
      }
    },
    methods: {
      addNode(type){
        this.$refs.arrow.click()
        this.$emit('addNode', type, this.node)
      },
      getUsersText(users){
        let text = ''
        if (users === undefined || (users === '')){
          users = []
        }
        users.forEach(u => {
          text = text + u.name + '、'
        })
        return text
      },
      addCd(){
        this.$emit('addCd', this.node)
      },
      delNode(){
        this.$emit('delNode', this.node)
      },
      select(){
        this.$store.commit('selectedNode', this.node)
        this.$emit('select', this.node)
      },
      showCard(node){
        return (node !== null && node !== undefined)
          && (node.type === 'root'
            || node.type === 'sp'
            || node.type === 'cs'
            || node.type === 'tj')
      },
      showArrow(node){
        return false && node;//node.node === undefined
      },
      showAddTjBtn(node){
        return node.node !== undefined && node.node.conditions !== undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "@/assets/theme";
  
  /deep/ .el-card{
    .el-card__body{
      height: 50px;
      overflow: hidden;
      padding: 0 20px !important;
      display: flex;
      align-items:center;
    }
  }
  
  .arrow{
    z-index: 555;
    position: relative;
    .add-tj{
      cursor: pointer;
      font-size: small;
      border-radius: 14px;
      padding: 8px 10px;
      color: rgb(21, 188, 131);
      width: 54px;
      left: calc(50% - 36px);
      bottom: -30px;
      background-color: #ffffff;
      position: absolute;
      box-shadow: 0 0 8px 2px #e5e5e5;
      &:hover{
        box-shadow: 0 0 8px 2px #d6d6d6;
      }
    }
  }
  .arrow::before{
    content: "";
    z-index: -999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 2px;
    height: calc(100% + 4px);
    background-color: #CACACA;
  }
  .arrow {
    padding: 30px 0px;
    //margin: 0 50px;
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

        .el-icon-close, .el-icon-copy-document{
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
  
        .el-icon-close, .el-icon-copy-document {
          display: inline;
        }
      }
    }
    .line-y {
      position: relative;
      height: 80px;
      margin: 0 auto;
      width: 0;
      //border: 1px solid #a9a9a9;

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
