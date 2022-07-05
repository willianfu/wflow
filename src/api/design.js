import request from '@/api/request.js'


// 查询表单组
export function getFormGroups(param) {
  return request({
    url: 'admin/form/group',
    method: 'get',
    params: param
  })
}

// 表单排序
export function groupItemsSort(param) {
  return request({
    url: 'admin/form/group/sort',
    method: 'put',
    data: param
  })
}

// 更新表单组
export function updateGroup(param, method) {
  return request({
    url: 'admin/form/group',
    method: method,
    params: param
  })
}

// 获取表单分组
export function getGroup() {
  return request({
    url: 'admin/form/group/list',
    method: 'get'
  })
}

// 更新表单
export function updateForm(param) {
  return request({
    url: 'admin/form',
    method: 'put',
    params: param
  })
}

export function createForm(param){
  return request({
    url: 'admin/form',
    method: 'post',
    data: param
  })
}

// 查询表单详情
export function getFormDetail(id) {
  return request({
    url: 'admin/form/detail/' + id,
    method: 'get'
  })
}

// 更新表单详情
export function updateFormDetail(param) {
  return request({
    url: 'admin/form/detail',
    method: 'put',
    data: param
  })
}

export default {
  getFormGroups, groupItemsSort, createForm, getFormDetail,
  updateGroup, getGroup, updateForm, updateFormDetail
}
