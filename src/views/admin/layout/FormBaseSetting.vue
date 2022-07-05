<template>
  <div class="base-setup" @click="showIconSelect = false">
    <el-form label-position="top" label-width="80px">
      <el-form-item label="表单图标">
        <i :class="setup.logo.icon" :style="'background:' + setup.logo.background"></i>
        <span class="change-icon">
					<span>
						<span>选择背景色</span>
						<el-color-picker v-model="setup.logo.background" show-alpha size="small" :predefine="colors"></el-color-picker>
					</span>
					<span>
						<span>选择图标</span>
						<el-popover placement="bottom-start" width="200" trigger="click">
							<div class="icon-select">
								<i :class="i" v-for="(i, id) in icons" :key="id" @click="setup.logo.icon = i"></i>
							</div>
              <i slot="reference" :class="setup.logo.icon"></i>
            </el-popover>
            <!--<i :class="setup.icon" @click.stop="showIconSelect = true"></i>-->
					</span>
				</span>


      </el-form-item>
      <el-form-item label="表单名称">
        <el-input v-model="setup.formName" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="所在分组" class="group">
        <el-select v-model="setup.groupId" placeholder="请选择分组" size="medium">
          <el-option v-for="(op, index) in fromGroup" :key="index" v-show="op.id > 1"
                     :label="op.name" :value="op.id"></el-option>
        </el-select>
        <el-popover placement="bottom-end" title="新建表单分组" width="300" trigger="click">
          <el-input size="medium" v-model="newGroup" placeholder="请输入新的分组名">
            <el-button slot="append" size="medium" type="primary" @click="addGroup">提交</el-button>
          </el-input>
          <el-button icon="el-icon-plus" slot="reference" size="medium" type="primary">新建分组</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="表单说明">
        <el-input placeholder="请输入表单说明" v-model="setup.remark" type="textarea" show-word-limit
                  :autosize="{ minRows: 2, maxRows: 5}" maxlength="500"></el-input>
      </el-form-item>

      <el-form-item label="消息通知方式">
        <el-select v-model="setup.settings.notify.types" value-key="name"
                   placeholder="选择消息通知方式" style="width: 30%;"
                   size="medium" clearable multiple collapse-tags>
          <el-option v-for="(wc, index) in notifyTypes" :label="wc.name" :key="index" :value="wc"></el-option>
        </el-select>
        <el-input size="medium" v-model="setup.settings.notify.title" style="width: 68%; float:right;" placeholder="消息通知标题"></el-input>
      </el-form-item>

      <el-form-item label="谁可以发起提交">
        <el-select v-model="setup.settings.commiter" @click.native="selectUser('commiter')" value-key="name"
                   class="select-u" placeholder="请选择可以发起提交的人员"
                   size="medium" clearable multiple>
          <el-option v-for="(wc, index) in setup.settings.commiter" :label="wc.name" :key="index" :value="wc"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谁可以管理此表单">
        <el-select v-model="setup.settings.admin" @click.native="selectUser('admin')" value-key="name"
                   class="select-u" placeholder="请选择可以管理此表单的人员"
                   size="medium" clearable multiple>
          <el-option v-for="(wc, index) in setup.settings.admin" :label="wc.name" :key="index" :value="wc"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="谁可以查看并导出数据">
        <el-select v-model="setup.whoExport" @click.native="selectUser('whoExport')" value-key="name"
                   class="select-u" placeholder="请选择可以查看并导出数据的人员"
                   size="medium" clearable multiple>
          <el-option v-for="(wc, index) in setup.whoExport" :label="wc.name" :key="index" :value="wc"></el-option>
        </el-select>
      </el-form-item>-->
    </el-form>
    <org-picker :show="showUserSelect" @close="closeSelect" :selected="select" @selectOver="selected"></org-picker>
  </div>
</template>

<script>
import orgPicker from '@/components/common/organizationPicker'
import {getFormGroups, updateGroup} from '@/api/design'

export default {
  name: "FormBaseSetting",
  components: {orgPicker},
  data() {
    return {
      nowUserSelect: null,
      showUserSelect: false,
      showIconSelect: false,
      select: [],
      newGroup: '',
      fromGroup: [],
      notifyTypes:[
        {type:'APP',name:'应用内通知'},
        {type:'EMAIL',name:'邮件通知'},
        {type:'SMS',name:'短信通知'},
        {type:'WX',name:'微信通知'},
        {type:'DING',name:'钉钉通知'},
      ],
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
      return this.$store.state.design;
    }
  },
  mounted(){
    this.getGroups()
  },
  methods: {
    getGroups(){
      getFormGroups().then(rsp => {
        this.fromGroup = rsp.data
      }).catch(err => this.$message.error('获取分组异常'))
    },
    addGroup() {
      if (this.newGroup.trim() !== '') {
        updateGroup({name: this.newGroup.trim()}, 'post').then(rsp => {
          this.$message.success(rsp.data)
          this.getGroups()
        }).catch(err => this.$message.error(err.response.data))
      }
    },
    closeSelect() {
      this.showUserSelect = false
      //this.nowUserSelect = null
    },
    selected(select) {
      console.log(select)
      this.showUserSelect = false
      this.$set(this.setup.settings, this.nowUserSelect, select)
      //this.setup[this.nowUserSelect] = select
    },
    selectUser(key) {
      this.select = this.setup.settings[key]
      this.nowUserSelect = key
      this.showUserSelect = true
    },
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

/deep/ .select-u {
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

/deep/ .group {
  .el-select {
    width: calc(100% - 130px);
  }

  .el-button {
    margin-left: 10px;
    width: 120px;
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
