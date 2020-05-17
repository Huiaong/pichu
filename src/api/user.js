import request from '@/utils/request'

export function userLogin(params) {
  return request({
    url: '/api/admin/user/login',
    method: 'post',
    params
  })
}

export function userInfo(params) {
  return request({
    url: '/api/admin/user/info',
    method: 'get',
    params: params
  })
}

export function userLogout(params) {
  return request({
    url: '/api/admin/user/logout',
    method: 'post',
    params: params
  })
}

