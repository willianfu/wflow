<template>
  <div class="workspace">
    <p>审批列表</p>
    <el-collapse v-model="actives">
      <el-collapse-item v-for="(group, index) in groups" :key="index" :title="group.name" :name="group.name">
        <div>
          <div v-for="(item, index) in group.items" :key="index" class="form-item">
            <i class="el-icon-document"></i>
            <div>
              <span>{{item.name}}</span>
              <span>发起审批</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: "workSpace",
    data() {
      return {
        groups: [
          {
            name: '人事',
            items: [
              {name: '入职'},
              {name: '离职'},{name: '报销'},
              {name: '绩效'},{name: '罚款'},
              {name: '物品申请'},{name: '绩效'},
              {name: '招聘'},
            ]
          }, {
            name: '财务',
            items: [
              {name: '报销'},
              {name: '付款申请'},
            ]
          }, {
            name: '考勤',
            items: [
              {name: '出差'},
              {name: '加班'},
            ]
          },
        ],
        actives: []
      }
    },
    mounted() {
      this.groups.forEach(g => this.actives.push(g.name))
    }
  }
</script>

<style lang="less" scoped>
  .workspace {
    margin-top: 50px;
    p{
      margin-left: 15px;
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
    }
    .form-item {
      padding: 15px 10px;
      width: 200px;
      cursor: pointer;
      border: 1px solid #d9dada;
      border-radius: 5px;
      float: left;
      margin: 5px 10px;
      &:hover{
        border: 1px solid #448ed7;
        span{
          display: inline-block !important;
        }
      }

      i {
        padding: 12px;
        border-radius: 8px;
        float: left;
        font-size: 14px;
        color: #ffffff;
        background: #38adff;
      }
      div{
        height: 35px;
        line-height: 35px;
        span:nth-child(1) {
          margin-left: 5px;
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