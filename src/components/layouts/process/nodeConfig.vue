<template>
	<div class="node-config">
		<el-form label-position="top" label-width="80px">
			<div v-if="selectedNode.type === 'root' || selectedNode.type === 'cs'">
				<el-form-item :label="selectedNode.type === 'root' ? '谁可以发起此审批' : '选择要抄送的人员'" prop="text">
					<el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 15px"
					           round @click="showUserSelect = true, select = props.approval.user.users">选择人员/部门
					</el-button>
					<div style="color: #38adff; font-size: x-small" v-show="props.approval.user.users.length === 0">
						不指定则默认所有人都可发起此审批
					</div>
					<div>
						<el-tag :type="'dept' === user.type? 'info': 'primary'" v-for="(user, index) in props.approval.user.users"
						        size="mini"
						        style="margin: 5px 10px 5px 0"
						        @close="props.approval.user.users.splice(index, 1)" closable>{{user.name}}
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
			
			<div v-if="selectedNode.type === 'tj'">
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
              <el-checkbox :label="condition.id" v-for="condition in formList" :key="condition.id">{{condition.name}}</el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" slot="reference" size="mini" icon="el-icon-plus" round @click="">选择条件</el-button>
          </el-popover>
          <span style="font-size: small; color: #7a7a7a; margin-left: 20px">只有必填选项才能作为审批条件</span>
				</el-form-item>
			</div>
			
			<div v-if="selectedNode.type === 'sp'">
				<el-form-item label="选择审批人" prop="text" class="select-user-type">
					<el-radio-group v-model="props.approval.type">
						<el-radio label="1">指定人员</el-radio>
						<el-radio label="2">发起人自选</el-radio>
						<el-radio label="3">连续多级主管</el-radio>
						<el-radio label="4">主管</el-radio>
						<el-radio label="5">角色</el-radio>
						<el-radio label="6">发起人自己</el-radio>
					</el-radio-group>
				</el-form-item>
				<div>
					<div v-if="props.approval.type === '1'">
						<el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 15px"
						           round @click="showUserSelect = true, select = props.approval.user.users">选择人员
						</el-button>
						<div>
							<el-tag :type="'dept' === user.type? 'info': 'primary'" v-for="(user, index) in props.approval.user.users"
							        size="mini" style="margin: 5px 10px 5px 0"
							        @close="props.approval.user.users.splice(index, 1)" closable>{{user.name}}
							</el-tag>
						</div>
					</div>
					
					<div v-if="props.approval.type === '5'">
						<el-button type="primary" slot="reference" size="mini" icon="el-icon-plus" round @click="">选择角色</el-button>
						<el-tag type="primary" size="mini" style="margin: 5px 10px 5px 20px" v-if="props.approval.user.role !== ''">
							{{props.approval.user.role.name}}
						</el-tag>
					</div>
					
					<div v-if="props.approval.type === '6'">
						<p style="font-size: 15px; color:#8c8c8c;">发起人自己作为审批人进行审批</p>
					</div>
					
					<div v-if="props.approval.type === '2'">
						<el-select size="small" v-model="props.approval.user.select" placeholder="选择人数">
							<el-option :value="'one'" label="自选一个人"></el-option>
							<el-option :value="'more'" label="自选多个人"></el-option>
						</el-select>
					</div>
				</div>
				
				<el-divider></el-divider>
				<el-form-item label="审批同意时是否需要手写签字">
					<el-switch inactive-text="不用" active-text="需要"
					           v-model="props.approval.sign"
					           :disable="$store.state.template.baseSetup.sign"></el-switch>
					<el-tooltip class="item" effect="dark" content="如果全局设置了需要签字，则此处不生效" placement="top-start">
						<i class="el-icon-question" style="margin-left: 10px; font-size: medium; color: #b0b0b1"></i>
					</el-tooltip>
				</el-form-item>
				<el-form-item label="审批期限（为 0 则不生效）" prop="timeLimit">
					<el-select v-model="props.approval.timeLimitType" size="mini" placeholder="维度 天 / 小时" style="width:100px">
						<el-option :value="'hour'" label="小时"></el-option>
						<el-option :value="'day'" label="天"></el-option>
					</el-select>
					<span style="margin: 0 10px">时长:</span>
					<el-input-number :min="0" :max="100" :step="1" size="mini" v-model="props.approval.timeLimitVal"></el-input-number>
					<span> {{props.approval.timeLimitType === 'hour' ? '小时':'天'}}</span>
				</el-form-item>
				
				<el-form-item label="审批期限超时后执行" prop="level" v-if="props.approval.timeLimitVal > 0">
					<el-radio-group v-model="props.approval.timeoutEvent.event">
						<el-radio v-for="ev in timeoutEvents" :label="ev.event" :key="ev.event">{{ev.name}}</el-radio>
					</el-radio-group>
					<!--<div>
						<span style="color:#4987ff; font-size: small">提醒 </span>
						<el-select v-model="props.approval.timeoutEvent.userType" size="mini" placeholder="提醒谁" style="width:100px">
							<el-option :value="'sender'" label="发起人"></el-option>
							<el-option :value="'select'" label="指定成员"></el-option>
						</el-select>
					</div>-->
					<div v-if="props.approval.timeoutEvent.event === 'notify'">
						<div style="color:#409EEF; font-size: small">默认提醒当前审批人</div>
						<el-switch inactive-text="一次" active-text="循环" v-model="props.approval.timeoutEvent.loop"></el-switch>
						<span style="margin-left: 20px" v-if="props.approval.timeoutEvent.loop">
							每隔
							<el-input-number :min="0" :max="10000" :step="1" size="mini" v-model="props.approval.timeoutEvent.loopTime"></el-input-number>
							天
						</span>
					</div>
				</el-form-item>
			</div>
			
			<div v-if="props.approval.type === '4'">
				<el-divider></el-divider>
				<el-form-item label="指定主管" prop="text" style="color:#606266;">
					<span>发起人的第 </span>
					<el-input-number :min="1" :max="20" :step="1" size="mini"
					                 v-model="props.approval.leaderLevel"></el-input-number>
					<span> 级主管</span>
					<div style="color: #409EFF; font-size: small;">👉 直接主管为 第 1 级主管</div>
				</el-form-item>
			</div>
			
			<div v-if="showModel">
				<el-divider></el-divider>
				<el-form-item label="多人审批时审批方式" prop="text" class="approve-mode">
					<el-radio-group v-model="props.approval.mode">
						<el-radio label="next">按选择顺序依次审批</el-radio>
						<el-radio label="and">会签（可同时审批，每个人必须同意）</el-radio>
						<el-radio label="or">或签（有一人同意即可）</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>
			
			<div v-if="props.approval.type === '3'">
				<el-divider></el-divider>
				<el-form-item label="审批终点" prop="text" class="approve-end">
					<el-radio-group v-model="props.approval.endCondition">
						<el-radio label="top">直到最上层主管</el-radio>
						<el-radio label="level">不超过发起人的</el-radio>
					</el-radio-group>
					<div class="approve-end-leave" v-if="'top' !== props.approval.endCondition">
						<span>第 </span>
						<el-input-number :min="1" :max="20" :step="1" size="mini"
						                 v-model="props.approval.leaderLevel"></el-input-number>
						<span> 级主管</span>
					</div>
				</el-form-item>
			</div>
			
			<div v-if="showUserEmpty">
				<el-divider></el-divider>
				<el-form-item label="审批人为空时" prop="text" class="approve-mode">
					<el-radio-group v-model="props.approval.userEmpty">
						<el-radio label="toPass">自动通过</el-radio>
						<el-radio label="toAdmin">自动转交管理员</el-radio>
						<el-radio label="toUser">转交到指定人员</el-radio>
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
        showUserSelect: false,
        select: [],
        approval: [],
	      timeoutEvents:[
		      {event:'pass', name:'自动通过'},
          {event:'refuse', name:'自动拒绝'},
          {event:'notify', name:'发送提醒'},
	      ]
      }
    },
    computed: {
      selectedNode() {
        return this.$store.state.selectedNode;
      },
      onlySelectUser() {
        return this.selectedNode.type === 'cs' || this.selectedNode.type === 'sp' || this.props.type === '1'
      },
      props() {
        return this.$store.state.selectedNode.props;
      },
      showModel() {
        return (this.props.approval.user.users.length > 1 && this.props.approval.type === '1')
          || (this.props.approval.type === '2' && this.props.approval.user.select === 'more')
          || this.props.approval.type === '4'
          || (this.props.approval.type === '5' && this.props.approval.user.role !== '')
      },
      showUserEmpty() {
        return this.props.approval.type === '3' || this.props.approval.type === '4'
      },
      formList(){
        //这个条件有5种类型 user 人员选择、 dept 部门选择、 number 数字、single 单选、 more 多选
        let result = []
	      this.$store.state.template.form.forEach(atom => {
          if (atom.valid){
            if (atom.name === 'jInput'&& atom.props.type === 'number'){
              result.push({
                id: atom.id,
                name: atom.text,
                type: 'number'
              })
            }else if(atom.name === 'jSelect'){
              result.push({
                id: atom.id,
                name: atom.text,
                type: atom.props.type,
                options:atom.props.options
              })
            }else if(atom.name === 'orgSelect'){
              result.push({
                id: atom.id,
                name: atom.text,
                type: atom.props.type
              })
            }
          }
        })
        result.unshift({id: this.$store.state.template.process.id, name:'发起人', type:'org'})
        return result;
      }
    },
    methods: {
      showRoot() {
        return this.selectedNode.type === 'root'
      },
      selected(select) {
        this.$store.commit('selectedApprover', select.map(s => {
          return {id: s.id, type: s.type, name: s.name}
        }))
        this.showUserSelect = false
      },
      conditionSelect(){
        let condition = []
				this.selectedNode.cids.forEach(cd => {
					for (let key in this.formList) {
						if (this.formList[key].id === cd){
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
