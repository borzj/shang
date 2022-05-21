/**
 * API接口统一管理
 */

import requests from "@/api/request";
import mockRequests from '@/api/requestMock'

export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

export const reqContainerList = () => mockRequests({
    url: '/banner',
    method: 'get'
})

export const reqFloorList = () => mockRequests({
    url: '/floor',
    method: 'get'
})

// 搜索商品
export const reqSearchInfo = data => requests({
    url: '/list',
    method: 'post',
    data
})

// 商品详情
export const reqGoodsDetail = id => requests({
    url: `/item/${id}`,
    method: 'get'
})

export const reqAddShoppingCar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
