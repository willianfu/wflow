export const ValueType = {
  string: 'String',
  object: 'Object',
  array: 'Array',
  number: 'Number',
  date: 'Date',
  user: 'User',
  dept: 'Dept',
  dateRange: 'DateRange'
}
//导出所有组件及配置
export default [
  {
    title: '单行文本输入',
    name: 'TextInput',
    icon: 'el-icon-edit',
    value: '',
    valueType: ValueType.string,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '数字输入框',
    name: 'NumberInput',
    icon: 'el-icon-edit-outline',
    value: '',
    valueType: ValueType.number,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '多行文本输入',
    name: 'TextareaInput',
    icon: 'el-icon-more-outline',
    value: '',
    valueType: ValueType.string,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '单选框',
    name: 'SelectInput',
    icon: 'el-icon-menu',
    value: '',
    valueType: ValueType.string,
    props: {
      required: false,
      enablePrint: true,
      options:['选项1', '选项2']
    }
  },
  {
    title: '多选框',
    name: 'SelectsInput',
    icon: 'el-icon-menu',
    value: [],
    valueType: ValueType.array,
    props: {
      required: false,
      enablePrint: true,
      options:['选项1', '选项2']
    }
  },
  {
    title: '日期时间点',
    name: 'DateTime',
    icon: 'el-icon-date',
    value: '',
    valueType: ValueType.date,
    props: {
      required: false,
      enablePrint: true,
      format: 'yyyy-MM-dd HH:mm',
    }
  },
  {
    title: '日期时间区间',
    name: 'DateTimeRange',
    icon: 'el-icon-c-scale-to-original',
    valueType: ValueType.dateRange,
    props: {
      required: false,
      enablePrint: true,
      placeholder:['开始时间','结束时间'],
      format: 'yyyy-MM-dd HH:mm'
    }
  },
  {
    title: '上传图片',
    name: 'ImageUpload',
    icon: 'el-icon-picture-outline',
    value: [],
    valueType: ValueType.array,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '上传附件',
    name: 'FileUpload',
    icon: 'el-icon-upload',
    value: [],
    valueType: ValueType.array,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '人员选择',
    name: 'OrgPicker',
    icon: 'el-icon-user',
    value: [],
    valueType: ValueType.user,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '部门选择',
    name: 'OrgPicker',
    icon: 'el-icon-takeaway-box',
    value: [],
    valueType: ValueType.dept,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '说明文字',
    name: 'Description',
    icon: 'el-icon-warning-outline',
    value: '',
    valueType: ValueType.string,
    props: {
      required: false,
      enablePrint: true
    }
  },
  {
    title: '金额',
    name: 'MoneyInput',
    icon: 'el-icon-coin',
    value: '',
    valueType: ValueType.number,
    props: {
      required: false,
      enablePrint: true
    }
  },
]
