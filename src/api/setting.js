import request from '@/api/request.js'


// 查询表单组
export function getTemplateGroups(param) {
  return request({
    url: 'setting/form/group',
    method: 'get',
    params: param
  })
}

// 表单排序
export function groupItemsSort(param) {
  return request({
    url: 'setting/form/group/sort',
    method: 'put',
    data: param
  })
}

// 更新表单组
export function updateGroup(param, method) {
  return request({
    url: 'setting/form/group',
    method: method,
    params: param
  })
}

// 更新表单组
export function updateTemplate(param) {
  return request({
    url: 'setting/form',
    method: 'put',
    params: param
  })
}

// 查询表单详情
export function getFormDetail(param) {
  return request({
    url: 'setting/form/detail',
    method: 'get',
    params: param
  })
}



export default {
  getTemplateGroups, groupItemsSort, getFormDetail, updateGroup, updateTemplate
}
