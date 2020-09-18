import request from '@/api/request.js'


// 查询组织架构树
export function getOrgTree(param) {
  return request({
    url: 'org/tree',
    method: 'get',
    params: param
  })
}

// 搜索人员
export function getUserByName(param) {
  return request({
    url: 'org/tree/user/search',
    method: 'get',
    params: param
  })
}

export default {
  getOrgTree, getUserByName
}
