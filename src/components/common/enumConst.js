/**
 * 审批类型
 * @type {{ROLE: string, LEADER: string, ASSIGN_USER: string, SELF_SELECT: string, SELF: string, LEADER_TOP: string}}
 */
export const approvalType = {
  ASSIGN_USER: 'ASSIGN_USER',
  SELF_SELECT: 'SELF_SELECT',
  LEADER_TOP: 'LEADER_TOP',
  LEADER: 'LEADER',
  ROLE: 'ROLE',
  SELF: 'SELF'
}

/**
 * 流程节点类型
 * @type {{CS: string, ROOT: string, TJ: string, CONDITION: string, SP: string, EMPTY: string}}
 */
export const nodeType = {
  SP: 'SP',
  CS: 'CS',
  TJ: 'TJ',
  ROOT: 'ROOT',
  EMPTY: 'EMPTY',
  CONDITION: 'CONDITION',
}

/**
 * 审批模式
 * @type {{OR: string, AND: string, NEXT: string}}
 */
export const approvalMode = {
  AND: 'AND',
  OR: 'OR',
  NEXT: 'NEXT'
}

export const logicType = {
  AND: 'AND',
  OR: 'OR'
}

/**
 * 超时事件
 * @type {{NOTIFY: string, PASS: string, REFUSE: string}}
 */
export const timeoutEvent = {
  PASS: 'PASS',
  REFUSE: 'REFUSE',
  NOTIFY: 'NOTIFY'
}

/**
 * 审批超时时间单位
 * @type {{HOUR: string, DAY: string}}
 */
export const timeLimitType = {
  DAY: 'DAY',
  HOUR: 'HOUR'
}

/**
 * 审批人为空时如何操作
 * @type {{TO_USER: string, TO_ADMIN: string, TO_PASS: string}}
 */
export const userEmpty = {
  TO_PASS: 'TO_PASS',
  TO_ADMIN: 'TO_ADMIN',
  TO_USER: 'TO_USER'
}

/**
 * 连续多级主管审批时的终点
 * @type {{TOP: string, LEAVE: string}}
 */
export const endCondition = {
  TOP: 'TOP', LEAVE: 'LEAVE'
}

/**
 * 条件节点类型
 * @type {{MORE: string, NUMBER: string, ORG: string, ONE: string, DEPT: string, USER: string}}
 */
export const conditionType = {
  NUMBER: 'number', ONE: 'one', MORE: 'more',
  DEPT: 'dept', USER: 'user', ORG: 'org'
}


export function getDefaultNodeProps(){
  return {
    //审批人选项类型
    type: approvalType.ASSIGN_USER,
    //审批模式 会签/或签/依次
    mode: approvalMode.AND,
    //审批时限
    timeLimit:{
      //时限单位
      type: timeLimitType.HOUR,
      limit: 0, //时限值
      event: {
        type: timeoutEvent.PASS, //触发超时执行事件
        loop: false, //循环触发
        loopTime: 0 //循环频率
      }
    },
    sign: false, //是否需要签字
    //如果审批人为空该如何做
    userEmpty: userEmpty.TO_PASS,
    //主管级别
    leaderLevel: 1,
    //结束条件
    endCondition: endCondition.TOP,
    //目标对象 人员/部门/角色
    targetObj: {
      //是否多选
      multiple: false,
      //角色
      roles:[],
      //用户或部门
      objs: [],
    }
  }
}

export default {
  nodeType, approvalMode, timeoutEvent, timeLimitType,
  userEmpty, endCondition, conditionType, approvalType,
  logicType, getDefaultNodeProps
}


