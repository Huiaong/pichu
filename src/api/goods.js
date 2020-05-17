import request from '@/utils/request'

export function getGoodsList(data, query) {
  return request({
    url: `/api/admin/goods/paging?pageNo=${query.pageNo}&pageSize=${query.pageSize}`,
    method: 'get',
    data
  })
}

export const delGoods = (params) => {
  return request({
    url: `/api/admin/goods/paging`,
    method: 'get',
    params
  })
}
