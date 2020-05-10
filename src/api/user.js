import http from './public'

export const userInfo = (params) => {
  return http.fetchGet('/api/admin/user/info', params)
}

export const userLogin = (params) => {
  return http.fetchPost('/api/admin/user/login', params)
}

export const userRegister = (params) => {
  return http.fetchPost('/api/admin/user/register', params)
}

export const userLogout = (params) => {
  return http.fetchPost('/api/admin/user/logout', params)
}

