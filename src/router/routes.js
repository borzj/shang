import Detail from "@/pages/Detail";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";

export default [
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: {
            show: true
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
