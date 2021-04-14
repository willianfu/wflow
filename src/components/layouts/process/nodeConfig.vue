<template>
  <div class="node-config">
    <el-form label-position="top" label-width="80px">
      <div v-if="isRootNode || isCsNode">
        <el-form-item :label="isRootNode ? '谁可以发起此审批' : '选择要抄送的人员'" prop="text">
          <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 15px"
                     round @click="showUserSelect = true, select = props.targetObj.objs">
            选择人员/部门
          </el-button>
          <div style="color: #38adff; font-size: x-small"
               v-show="isRootNode && props.targetObj.objs.length === 0">
            不指定则默认所有人都可发起此审批
          </div>
          <div>
            <el-tag :type="'dept' === user.type? 'info': 'primary'"
                    v-for="(user, index) in props.targetObj.objs"
                    size="mini"
                    style="margin: 5px 10px 5px 0"
                    @close="props.targetObj.objs.splice(index, 1)" closable>
              {{user.name}}
            </el-tag>
          </div>
        </el-form-item>
      </div>

      <!-- <el-form-item label="谁可以发起此审批" prop="text">
         <el-select v-model="props.approval.user.users" @click.native="showUserSelect = true" value-key="name"
                    class="select-u" placeholder="请选择可以发起提交的人员"
                    size="medium" clearable multiple>
           <el-option v-for="(wc, index) in props.approval.user.users" :label="wc.name" :key="index" :value="wc"></el-option>
         </el-select>
       </el-form-item>-->

      <div v-if="isTjNode">
        <el-form-item label="优先级" prop="level">
          <el-select v-model="selectedNode.level" size="mini">
            <el-option>1</el-option>
            <el-option>2</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设置审批条件" prop="text">
          <el-divider></el-divider>
          <condition></condition>
          <el-divider v-if="selectedNode.cids.length > 0"></el-divider>
          <el-popover placement="left" title="选择审批条件" width="300" trigger="click">
            <!-- <div>以下条件将决定具体的审批流程</div>-->
            <el-checkbox-group v-model="selectedNode.cids" @change="conditionSelect">
              <el-checkbox :label="condition.id" v-for="condition in formList" :key="condition.id">{{condition.name}}
              </el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" slot="reference" size="mini" icon="el-icon-plus" round @click="">选择条件</el-button>
          </el-popover>
          <span style="font-size: small; color: #7a7a7a; margin-left: 20px">只有必填选项才能作为审批条件</span>
        </el-form-item>
      </div>

      <div v-if="isSpNode">
        <el-form-item label="选择审批人" prop="text" class="select-user-type">
          <el-radio-group v-model="props.type">
            <el-radio v-for="t in approvalType" :label="t.label" :key="t.label">
              {{t.text}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <div v-if="props.type === enumConst.approvalType.ASSIGN_USER">
            <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 15px"
                       round @click="showUserSelect = true, select = props.targetObj.objs">选择人员
            </el-button>
            <div>
              <el-tag :type="'dept' === user.type? 'info': 'primary'" v-for="(user, index) in props.targetObj.objs"
                      size="mini" style="margin: 5px 10px 5px 0"
                      @close="props.targetObj.objs.splice(index, 1)" closable>{{user.name}}
              </el-tag>
            </div>
          </div>

          <div v-if="props.type === enumConst.approvalType.ROLE">
            <el-button type="primary" slot="reference" size="mini" icon="el-icon-plus" round @click="">选择角色</el-button>
            <el-tag type="primary" size="mini" style="margin: 5px 10px 5px 20px" v-for="role in props.targetObj.roles">
              {{role.name}}
            </el-tag>
          </div>

          <div v-if="props.type === enumConst.approvalType.SELF">
            <p style="font-size: 15px; color:#8c8c8c;">发起人自己作为审批人进行审批</p>
          </div>

          <div v-if="props.type === enumConst.approvalType.SELF_SELECT">
            <el-select size="small" v-model="props.targetObj.multiple" placeholder="选择人数">
              <el-option :value="false" label="自选一个人"></el-option>
              <el-option :value="true" label="自选多个人"></el-option>
            </el-select>
          </div>
        </div>

        <el-divider></el-divider>
        <el-form-item label="审批同意时是否需要手写签字">
          <el-switch inactive-text="不用" active-text="需要"
                     v-model="props.sign"
                     :disable="$store.state.template.baseSetup.sign"></el-switch>
          <el-tooltip class="item" effect="dark" content="如果全局设置了需要签字，则此处不生效" placement="top-start">
            <i class="el-icon-question" style="margin-left: 10px; font-size: medium; color: #b0b0b1"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="审批期限（为 0 则不生效）" prop="timeLimit">
          <el-select v-model="props.timeLimit.type" size="mini" placeholder="维度 天 / 小时" style="width:100px">
            <el-option :value="enumConst.timeLimitType.HOUR" label="小时"></el-option>
            <el-option :value="enumConst.timeLimitType.DAY" label="天"></el-option>
          </el-select>
          <span style="margin: 0 10px">时长:</span>
          <el-input-number :min="0" :max="100" :step="1" size="mini"
                           v-model="props.timeLimit.limit"></el-input-number>
          <span> {{props.timeLimit.type === enumConst.timeLimitType.HOUR ? '小时':'天'}}</span>
        </el-form-item>

        <el-form-item label="审批期限超时后执行" prop="level" v-if="props.timeLimit.limit > 0">
          <el-radio-group v-model="props.timeLimit.event.type">
            <el-radio v-for="evs in timeoutEvents" :label="evs.event" :key="evs.event">{{evs.name}}</el-radio>
          </el-radio-group>
          <!--<div>
            <span style="color:#4987ff; font-size: small">提醒 </span>
            <el-select v-model="props.approval.timeoutEvent.userType" size="mini" placeholder="提醒谁" style="width:100px">
              <el-option :value="'sender'" label="发起人"></el-option>
              <el-option :value="'select'" label="指定成员"></el-option>
            </el-select>
          </div>-->
          <div v-if="props.timeLimit.event.type === enumConst.timeoutEvent.NOTIFY">
            <div style="color:#409EEF; font-size: small">默认提醒当前审批人</div>
            <el-switch inactive-text="一次" active-text="循环" v-model="props.timeLimit.event.loop"></el-switch>
            <span style="margin-left: 20px" v-if="props.timeLimit.event.loop">
							每隔
							<el-input-number :min="0" :max="10000" :step="1" size="mini"
                               v-model="props.timeLimit.event.loopTime"></el-input-number>
							天
						</span>
          </div>
        </el-form-item>
      </div>

      <div v-if="props.type === enumConst.approvalType.LEADER">
        <el-divider></el-divider>
        <el-form-item label="指定主管" prop="text" style="color:#606266;">
          <span>发起人的第 </span>
          <el-input-number :min="1" :max="20" :step="1" size="mini"
                           v-model="props.leaderLevel"></el-input-number>
          <span> 级主管</span>
          <div style="color: #409EFF; font-size: small;">👉 直接主管为 第 1 级主管</div>
        </el-form-item>
      </div>

      <div v-if="showModel">
        <el-divider></el-divider>
        <el-form-item label="多人审批时审批方式" prop="text" class="approve-mode">
          <el-radio-group v-model="props.mode">
            <el-radio :label="enumConst.approvalMode.NEXT">按选择顺序依次审批</el-radio>
            <el-radio :label="enumConst.approvalMode.AND">会签（可同时审批，每个人必须同意）</el-radio>
            <el-radio :label="enumConst.approvalMode.OR">或签（有一人同意即可）</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div v-if="props.type === enumConst.approvalType.LEADER_TOP">
        <el-divider></el-divider>
        <el-form-item label="审批终点" prop="text" class="approve-end">
          <el-radio-group v-model="props.endCondition">
            <el-radio :label="enumConst.endCondition.TOP">直到最上层主管</el-radio>
            <el-radio :label="enumConst.endCondition.LEAVE">不超过发起人的</el-radio>
          </el-radio-group>
          <div class="approve-end-leave" v-if="enumConst.endCondition.TOP !== props.endCondition">
            <span>第 </span>
            <el-input-number :min="1" :max="20" :step="1" size="mini"
                             v-model="props.leaderLevel"></el-input-number>
            <span> 级主管</span>
          </div>
        </el-form-item>
      </div>

      <div v-if="showUserEmpty">
        <el-divider></el-divider>
        <el-form-item label="审批人为空时" prop="text" class="approve-mode">
          <el-radio-group v-model="props.userEmpty">
            <el-radio :label="enumConst.userEmpty.TO_PASS">自动通过</el-radio>
            <el-radio :label="enumConst.userEmpty.TO_ADMIN">自动转交管理员</el-radio>
            <el-radio :label="enumConst.userEmpty.TO_USER">转交到指定人员</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

    </el-form>

    <org-picker :show="showUserSelect" :onlyUser="onlySelectUser"
                @close="showUserSelect = false" :selected="select"
                @selectOver="selected"></org-picker>

  </div>
</template>

<script>
  import orgPicker from '@/components/common/organizationPicker'
  import condition from './condition'
  import enumConst from '@/components/common/enumConst'

  export default {
    name: "nodeConfig",
    components: {orgPicker, condition},
    props: {
      node: {
        default: () => {
          return {}
        },
        type: Object
      }
    },
    data() {
      return {
        enumConst: enumConst,
        showUserSelect: false,
        select: [],
        approval: [],
        approvalType: [
          {label: enumConst.approvalType.ASSIGN_USER, text: '指定人员'},
          {label: enumConst.approvalType.SELF_SELECT, text: '发起人自选'},
          {label: enumConst.approvalType.LEADER_TOP, text: '连续多级主管'},
          {label: enumConst.approvalType.LEADER, text: '主管'},
          {label: enumConst.approvalType.ROLE, text: '角色'},
          {label: enumConst.approvalType.SELF, text: '发起人自己'}
        ],
        timeoutEvents: [
          {event: enumConst.timeoutEvent.PASS, name: '自动通过'},
          {event: enumConst.timeoutEvent.REFUSE, name: '自动拒绝'},
          {event: enumConst.timeoutEvent.NOTIFY, name: '发送提醒'},
        ]
      }
    },
    computed: {
      selectedNode() {
        return this.$store.state.selectedNode;
      },
      isRootNode() {
				return this.selectedNode.type === enumConst.nodeType.ROOT
      },
      isTjNode() {
				return this.selectedNode.type === enumConst.nodeType.TJ
      },
      isCsNode() {
				return this.selectedNode.type === enumConst.nodeType.CS
      },
      isSpNode() {
				return this.selectedNode.type === enumConst.nodeType.SP
      },
      onlySelectUser() {
        return this.selectedNode.type === enumConst.nodeType.CS
          || this.selectedNode.type === enumConst.nodeType.SP
          || this.props.type === '1'
      },
      props() {
        return this.$store.state.selectedNode.props;
      },
      showModel() {
        return (this.props.targetObj.objs.length > 1
						&& this.props.type === enumConst.approvalType.ASSIGN_USER)
          || (this.props.type === enumConst.approvalType.SELF_SELECT
								&& this.props.targetObj.multiple)
          || this.props.type === enumConst.approvalType.LEADER
          || (this.props.type === enumConst.approvalType.ROLE
								&& this.props.targetObj.roles.length > 0)
      },
      showUserEmpty() {
        return this.props.type === enumConst.approvalType.LEADER_TOP
						|| this.props.type === enumConst.approvalType.LEADER
      },
      formList() {
        //这个条件有5种类型 user 人员选择、 dept 部门选择、 number 数字、single 单选、 more 多选
        let result = []
        this.$store.state.template.form.forEach(atom => {
          if (atom.valid) {
            if (atom.name === 'jInput' && atom.props.type === 'number') {
              result.push({
                id: atom.id,
                name: atom.text,
                type: 'number'
              })
            } else if (atom.name === 'jSelect') {
              result.push({
                id: atom.id,
                name: atom.text,
                type: atom.props.type,
                options: atom.props.options
              })
            } else if (atom.name === 'orgSelect') {
              result.push({
                id: atom.id,
                name: atom.text,
                type: atom.props.type
              })
            }
          }
        })
        result.unshift({id: this.$store.state.template.process.id, name: '发起人', type: 'org'})
        return result;
      }
    },
    methods: {
      showRoot() {
        return this.selectedNode.type === enumConst.nodeType.ROOT
      },
      selected(select) {
        this.$store.commit('selectedApprover', select.map(s => {
          return {id: s.id, type: s.type, name: s.name}
        }))
        this.showUserSelect = false
      },
      conditionSelect() {
        let condition = []
        this.selectedNode.cids.forEach(cd => {
          for (let key in this.formList) {
            if (this.formList[key].id === cd) {
              condition.push(this.formList[key]);
              break;
            }
          }
        })
        this.$store.commit('setCondition', condition)
      }
    }
  }
</script>

<style lang="less" scoped>
  .node-config {
    padding: 0 20px;
    overflow-y: auto;

    /deep/ .el-form {
      .el-form-item__label {
        padding: 0;
      }

      .el-form-item__label {
        font-size: 14px;
        color: #000;
      }

      .el-form-item {
        margin-bottom: 5px;
      }
    }

  }

  .select-user-type {
    /deep/ .el-radio {
      width: 80px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }

  /deep/ .approve-mode {
    .el-radio {
      float: left;
      width: 100%;
      display: block;
      margin-top: 15px;
    }
  }

  /deep/ .approve-end {
    position: relative;

    .el-radio-group {
      width: 160px;
    }

    .el-radio {
      margin-top: 15px;
      width: 100%;
    }

    .el-radio:last-child {
      margin-top: 15px;
      width: 50px;
    }

    .approve-end-leave {
      position: absolute;
      bottom: -10px;
      right: 20px;
    }
  }

  .select-u {
    width: 100%;
  }
</style>
