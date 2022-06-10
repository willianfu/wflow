//审批节点默认属性
export const APPROVAL_PROPS = {
  assignedType: "ASSIGN_USER",
  mode: "AND",
  sign: false,
  nobady: {
    handler: "PASS",
    assignedUser:[]
  },
  timeLimit:{
    timeout:{
      unit: "H",
      value: 0
    },
    handler:{
      type: "REFUSE",
      notify:{
        once: true,
        hour: 1
      }
    }
  },
  assignedUser:[],
  selfSelect: {
    multiple: false
  },
  leaderTop: {
    endCondition: "TOP",
    endLevel: 1,
  },
  leader:{
    level: 1
  },
  role:[],
}

//根节点默认属性
export const ROOT_PROPS = {
  assignedUser: []
}

//条件节点默认属性
export const CONDITION_PROPS = {
  groupsType:"OR", //条件组逻辑关系 OR、AND
  groups:[
    {
      name: "A", //组名 A B C D....依次递增
      groupType:"AND", //条件组内条件关系 OR、AND
      //组内子条件
      conditions:[]
    }
  ],
  expression: "" //自定义表达式，灵活构建逻辑关系
}

//抄送节点默认属性
export const CC_PROPS = {
  assignedUser: []
}

//延时节点默认属性
export const DELAY_PROPS = {
  type: "", //延时类型 FIXED:到达当前节点后延时固定时长 、AUTO:延时到 dateTime设置的时间
  time: 0, //延时时间
  unit: "M", //时间单位 D天 H小时 M分钟
  dateTime: "" //如果当天没有超过设置的此时间点，就延时到这个指定的时间，到了就直接跳过不延时
}

export default {
  APPROVAL_PROPS, CC_PROPS, DELAY_PROPS, CONDITION_PROPS, ROOT_PROPS
}
