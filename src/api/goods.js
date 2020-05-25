import request from '@/utils/request'

export function getGoodsList(data) {
  return request({
    url: `/api/admin/goods/paging`,
    method: 'get',
    params: data
  })
}

export const delGoods = (params) => {
  return request({
    url: `/api/admin/goods/paging`,
    method: 'get',
    params
  })
}

export const findById = (id) => {
  return request({
    url: `/api/admin/goods/${id}`,
    method: 'get'
  })
}

export const updateGoods = (data) => {
  return request({
    url: `/api/admin/goods/update`,
    method: 'put',
    data
  })
}
