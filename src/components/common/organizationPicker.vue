<template>
	<el-dialog
					:title="title" :destroy-on-close="true"
					:close-on-click-modal="false" :modal="false"
					:visible.sync="show" :before-close="close"
					width="700px" center>
		<div class="picker">
			<div style="float:left;">
				<p>选择</p>
				<div class="box">
					<div>
						<el-input v-if="type !== 'dept'" placeholder="搜索人员" prefix-icon="el-icon-search" size="medium"
						          v-model="search" :maxlength="50" @input="searchUser" clearable>
						</el-input>
						<el-breadcrumb separator-class="el-icon-arrow-right" style="overflow-x: hidden">
							<el-breadcrumb-item>通讯录</el-breadcrumb-item>
							<el-breadcrumb-item style="color:#38adff;" v-for="(node, index) in navNodes" :key="index">
								{{node.name}}
							</el-breadcrumb-item>
						</el-breadcrumb>
						<el-checkbox v-model="checkAll" @change="handleCheckAllChange" v-show="!single">全选</el-checkbox>
						<span style="margin-left: 20px; cursor: pointer; color:#38adff;" @click="beforeNode">上一级</span>
					</div>
					<div style="margin-top: 8px; width: 100%;">
						<div style="margin-top: 8px; overflow-y: auto; height: calc(100% - 90px);">
							<div v-for="(node, index) in (search === '' ? nodes : searchUsers)" :key="index" class="line"
							     :style="node.type === 'user' && type === 'dept' ? 'display: none':''" @click="selectChange(node)">
								<el-checkbox v-model="node.selected" :disabled="disableDept(node)"></el-checkbox>
								<span style="margin-left: 10px">
                    <i class="el-icon-folder-opened" v-if="node.type === 'dept'"></i>
                    <div class="avt" :style="'background: ' + getAvatarColor()" v-else-if="$isEmpty(node.avatar)">
                      {{getShortName(node.name)}}
                    </div>
										<img :src="node.avatar" style="border-radius: 50%; display:inline-block;" width="35" height="35" v-else/>
                    <span style="margin-left: 10px">{{node.name}}</span>
                    <span :class="{'next-dept-disable': node.selected, 'next-dept': !node.selected,}"
                          v-if="node.type === 'dept'" @click.stop="nextNode(node)">
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
					<div style="overflow-x: hidden; overflow-y: auto; height:100%">
						<div v-for="(node, index) in select" :key="index" class="line">
                <span style="margin-left: 10px">
                    <i class="el-icon-folder-opened" v-if="node.type === 'dept'"></i>
                     <div class="avt" :style="'background: ' + getAvatarColor()"
                          v-else-if="$isEmpty(node.avatar)">
                      {{getShortName(node.name)}}
                    </div>
										<img :src="node.avatar" width="35" height="35" v-else/>
                    <span style="margin-left: 10px">{{node.name}}</span>
                    <span style="float: right; color:#a9a9a9 ;cursor: pointer">
                      <i class="el-icon-close" @click="noSelected(index)"></i>
                    </span>
                  </span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" @click="selectOk" size="small">确 定</el-button>
    </span>
	</el-dialog>

</template>

<script>
  import {getOrgTree, getUserByName} from '@/api/org'

  export default {
    name: "organizationPicker",
    props: {
      //是否展示
      show: {
        default: false,
        type: Boolean
      },
      //标题
      title: {
        default: '请选择',
        type: String
      },
      //选择哪种类型  user=人和部门  dept=只能选部门
      type: {
        default: 'user',
        type: String
      },
	    //是否单选
	    single:{
        default: false,
        type: Boolean
	    },
      //已经选中的
      selected: {
        default: ()=>{return[]},
        type: Array
      },
	    onlyUser:{
        default: false,
        type: Boolean
	    }
    },
    data() {
      return {
        checkAll: false,
        nowDeptId: null,
        isIndeterminate: false,
        navNodes: [],
        navNodePointer: null,
        searchUsers: [],
        nodes: [],
        select: [],
        search: '',
        avatarColor: [
          '#1e90ff',
          '#ff4500',
          '#ffc10a',
          '#d2b100',
          '#76c376',
          '#00ced1',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsl(181, 100%, 37%)',
        ]
      }
    },
    mounted() {
    },
	  computed:{

	  },
    methods: {
      disableDept(node){
        return this.onlyUser && 'dept' === node.type
      },
      getOrgList() {
        getOrgTree({deptId: this.nowDeptId, type: this.type}).then(rsp => {
          this.nodes = rsp.data
          this.selectToLeft()
        }).catch(err => this.$message.error(err.response.data))
      },
      getShortName(name){
        if (name){
          return name.length > 2 ? name.substring(1, 3) : name;
        }
        return '**'
      },
      searchUser() {
        let userName = this.search.trim()
        this.searchUsers = []
        getUserByName({userName: userName}).then(rsp => {
          this.searchUsers = rsp.data
          this.selectToLeft()
        }).catch(err => this.$message.error("接口异常"))
      },
      selectToLeft() {
        let nodes = this.search.trim() === '' ? this.nodes : this.searchUsers;
        nodes.forEach(node => {
          for (let i = 0; i < this.select.length; i++) {
            if (this.select[i].id === node.id) {
              node.selected = true;
              break;
            } else {
              node.selected = false;
            }
          }
        })
      },
      selectChange(node) {
        if (node.selected) {
          this.checkAll = false;
          for (let i = 0; i < this.select.length; i++) {
            if (this.select[i].id === node.id) {
              this.select.splice(i, 1);
              break;
            }
          }
          node.selected = false;
        } else if(!this.disableDept(node)){
          node.selected = true
          let nodes = this.search.trim() === '' ? this.nodes : this.searchUsers;
	        if (this.single){
            nodes.forEach(nd => {
              if (node.id !== nd.id){
                nd.selected = false
              }
            })
	        }
          if (node.type === 'dept') {
            if (this.single){
              this.select = [node]
            }else{
              this.select.unshift(node);
            }
          } else {
            if (this.single){
              this.select = [node]
            }else {
              this.select.push(node);
            }
          }
        }
      },
      noSelected(index) {
        let nodes = this.nodes;
        for (let f = 0; f < 2; f++) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === this.select[index].id) {
              nodes[i].selected = false;
              this.checkAll = false;
              break;
            }
          }
          nodes = this.searchUsers;
        }
        this.select.splice(index, 1)
      },
      handleCheckAllChange() {
        this.nodes.forEach(node => {
          if (this.checkAll) {
            if (!node.selected && !this.disableDept(node)) {
              node.selected = true
              this.select.push(node)
            }
          } else {
            node.selected = false;
            for (let i = 0; i < this.select.length; i++) {
              if (this.select[i].id === node.id) {
                this.select.splice(i, 1);
                break;
              }
            }
          }
        })
      },
      getAvatarColor() {
        Math.floor(Math.random() * 10);
        return this.avatarColor[0]
      },
      nextNode(node) {
        this.nowDeptId = node.id
        this.navNodes.push(node)
        this.getOrgList()
      },
      beforeNode() {
        if (this.navNodes.length === 0) {
          this.$message.warning("已经是最上一级喽");
          return;
        }
        if (this.navNodes.length < 2) {
          this.nowDeptId = null
        } else {
          this.nowDeptId = this.navNodes[this.navNodes.length - 2].id
        }
        this.navNodes.splice(this.navNodes.length - 1, 1);
        this.getOrgList()
      },
      recover() {
        this.select = []
        this.nodes.forEach(nd => nd.selected = false)
      },
      selectOk() {
        this.$emit('selectOver', Object.assign([], this.select))
        this.recover()
      },
      close() {
        this.$emit('close')
        this.recover()
      },
      init() {
        this.checkAll = false;
        this.nowDeptId = null;
        this.navNodes = [];
        this.navNodePointer = null;
        this.select = Object.assign([], this.selected)
        this.selectToLeft()
      }
    },
    watch: {
      show() {
        if (this.show) {
          this.init()
          this.getOrgList()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
	/deep/ .el-dialog {
		z-index: 99999;
		border-radius: 13px;
		overflow: hidden;

		.el-dialog__header {
			background: #f7f7f7;
		}

		.el-dialog__body {
			padding-top: 0;
		}

		.el-dialog__footer {
			margin-top: 450px;
		}
	}

	.line {
		width: 290px;
		height: 35px;
		line-height: 35px;

		&:hover {
			background: #e9e9ea;
		}

		.avt {
			width: 33px;
			height: 33px;
			text-align: center;
			display: inline-block;
			font-size: 5px;
			border-radius: 50%;
			color: #ffffff;
		}

		i:first-child {
			font-size: large;
		}

		.next-dept {
			cursor: pointer;
			float: right;
			color: #38adff;
		}

		.next-dept-disable {
			//pointer-events: none;
			cursor: not-allowed;
			float: right;
			color: #cccccd;
		}
	}

	.picker {
		p {
			font-size: larger;
		}

		/deep/ .box {
			overflow-y: auto;
			overflow-x: hidden;
			padding: 10px;
			height: 400px;
			width: 290px;
			border-radius: 5px;
			border: 1px solid #d4d4d5;
			background: #f7f7f7;

			.el-breadcrumb {
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
