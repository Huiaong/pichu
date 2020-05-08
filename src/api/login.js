import http from './public'

export const userInfo = (params) => {
    return http.fetchGet('/api/admin/user/info', params)
}