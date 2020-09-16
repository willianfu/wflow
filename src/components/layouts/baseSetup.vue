<template>
	<div class="base-setup" @click="showIconSelect = false">
		<el-form label-position="top" label-width="80px">
			<el-form-item label="表单图标">
				<i :class="setup.icon" :style="'background:' + setup.background"></i>
				<span class="change-icon">
					<span>
						<span>选择背景色</span>
						<el-color-picker v-model="setup.background" show-alpha size="small" :predefine="colors"></el-color-picker>
					</span>
					<span>
						<span>选择图标</span>
						<el-popover placement="bottom-start" width="200" trigger="click">
							<div class="icon-select">
								<i :class="i" v-for="(i, id) in icons" :key="id" @click="setup.icon = i"></i>
							</div>
              <i slot="reference" :class="setup.icon"></i>
            </el-popover>
						<!--<i :class="setup.icon" @click.stop="showIconSelect = true"></i>-->
					</span>
				</span>
			
			
			</el-form-item>
			<el-form-item label="表单名称">
				<el-input v-model="setup.name" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="所在分组">
				<el-select v-model="setup.group" placeholder="请选择分组" size="medium"></el-select>
			</el-form-item>
			<el-form-item label="表单说明">
				<el-input placeholder="请输入表单说明" v-model="setup.remark" type="textarea" show-word-limit :autosize="{ minRows: 2, maxRows: 5}" maxlength="500"
				></el-input>
			</el-form-item>
			<el-form-item label="谁可以发起提交">
				<el-select v-model="setup.whoCommit" @click.native="whoCommit"
				           class="select-u" placeholder="请选择可以发起提交的人员"
				           size="medium" clearable multiple>
					<el-option v-for="wc in setup.whoCommit" :label="wc.name" :value="wc"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="谁可以编辑此表单模板">
				<el-select v-model="setup.whoEdit" @click.native="whoEdit"
				           class="select-u" placeholder="请选择可以编辑此表单模板的人员"
				           size="medium" clearable multiple></el-select>
			</el-form-item>
			<el-form-item label="谁可以查看并导出数据">
				<el-select v-model="setup.whoViewData" @click.native="whoViewData"
				           class="select-u" placeholder="请选择可以查看并导出数据的人员"
				           size="medium" clearable multiple></el-select>
			</el-form-item>
		</el-form>
		<org-picker :show="showUserSelect" @close="closeSelect" @selected="selected"></org-picker>
	</div>
</template>

<script>
	import orgPicker from '@/components/common/organizationPicker'

  export default {
    name: "baseSetup",
		components:{orgPicker},
    data() {
      return {
        nowUserSelect: null,
        showUserSelect: false,
        showIconSelect: false,
        colors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
        icons: [
          'el-icon-eleme',
          'el-icon-delete-solid',
          'el-icon-s-tools',
          'el-icon-phone',
          'el-icon-s-goods',
          'el-icon-warning',
          'el-icon-circle-plus',
          'el-icon-s-help',
          'el-icon-camera-solid',
          'el-icon-s-promotion',
          'el-icon-s-cooperation',
          'el-icon-s-platform',
          'el-icon-s-custom',
          'el-icon-s-data',
          'el-icon-s-check',
          'el-icon-s-claim',
          'el-icon-location'
        ]
      }
    },
    computed: {
      setup() {
        return this.$store.state.baseSetup;
      }
    },
	  methods:{
      closeSelect(){
        this.showUserSelect = false
        //this.nowUserSelect = null
      },
      selected(select){
        this.showUserSelect = false
        this.setup[this.nowUserSelect] = select
      },
      whoCommit(){
        this.nowUserSelect = 'whoCommit'
        this.showUserSelect = true
      },
      whoEdit(){
        this.nowUserSelect = 'whoEdit'
        this.showUserSelect = true
      },
      whoViewData(){
        this.nowUserSelect = 'whoViewData'
        this.showUserSelect = true
      }
	  }
  }
</script>

<style lang="less" scoped>
	/deep/ .el-select-dropdown {
		display: none;
	}
	
	.icon-select {
		i {
			cursor: pointer;
			font-size: large;
			padding: 10px;
			
			&:hover {
				box-shadow: 0 0 10px 2px #C2C2C2;
			}
		}
	}
	/deep/ .select-u{
		width: 100%;
	}
	
	.base-setup {
		overflow: auto;
		margin: 0 auto;
		width: 600px;
		height: calc(100vh - 105px);
		background: #ffffff;
		margin-top: 10px;
		padding: 15px 20px;
		
		i:first-child {
			position: relative;
			cursor: pointer;
			font-size: xx-large;
			color: #ffffff;
			border-radius: 10px;
			padding: 10px;
		}
		
		.change-icon {
			margin-left: 20px;
			
			span {
				font-size: small;
				color: #7a7a7a;
				margin-right: 15px;
			}
			
			i {
				cursor: pointer;
				color: #7a7a7a;
				font-size: x-large;
			}
		}
		
		/deep/ .el-form-item__label {
			padding: 0;
			font-weight: bold;
		}
		
		/deep/ .el-form-item {
			margin-bottom: 5px;
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
