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

// 添加购物车
export const reqAddShoppingCar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// 获取购物车列表
export const reqGetShopCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车
export const reqDeleteShopInCart = skuId => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 切换购物车选中状态
export const reqCheckCart = (skuID, isChecked) => requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: 'get'
})

// 获取验证码
export const reqGetCode = phone => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 注册
export const reqRegister = data => requests({
    url: '/user/passport/register',
    method: 'post',
    data
})

// 登录
export const reqLogin = data => requests({
    url: '/user/passport/login',
    method: 'post',
    data
})

export const getUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

export const logout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

