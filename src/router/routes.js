import Detail from "@/pages/Detail";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

export default [
    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
            {
                path: 'event',
                component: () => import('@/pages/Communication/EventTest/EventTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'model',
                component: () => import('@/pages/Communication/ModelTest/ModelTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'sync',
                component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'attrs-listeners',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'children-parent',
                component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'scope-slot',
                component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                meta: {
                    isHideFooter: true
                },
            }
        ],
    },

    {
        name: 'center',
        path: '/center',
        component: () => import("@/pages/Center"), // 路由懒加载, 在使用组件时加载js
        meta: {
            show: true
        },
        children: [
            {
                path: 'my-order',
                component: MyOrder
            },
            {
                path: 'group-order',
                component: GroupOrder
            }
        ],
        redirect: '/center/my-order'
    },
    {
        name: 'pay-success',
        path: '/pay-success',
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path !== '/trade') {
                return next(false)
            }
            next()
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path !== '/shop-car') {
                return next(false)
            }
            next()
        }
    },
    {
        name: 'shop-car',
        path: '/shop-car',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        name: 'add-car-success',
        path: '/add-car-success',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            show: true
        }
    },
    {
        name: 'search',
        // ?指定 指定params可传可不传
        path: '/search/:keyword',
        component: Search,
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },

    // 重定向，访问/时跳转到Home
    {
        path: '*',
        redirect: '/home'
    }
]
