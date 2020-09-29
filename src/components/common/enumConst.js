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
  TOP:'TOP', LEAVE:'LEAVE'
}

/**
 * 条件节点类型
 * @type {{MORE: string, NUMBER: string, ORG: string, ONE: string, DEPT: string, USER: string}}
 */
export const conditionType = {
  NUMBER:'NUMBER', ONE:'ONE', MORE:'MORE',
  DEPT:'DEPT', USER:'USER', ORG:'ORG'
}

export default {
  nodeType, approvalMode, timeoutEvent, timeLimitType,
  userEmpty, endCondition, conditionType
}


