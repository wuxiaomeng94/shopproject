import Vue from 'vue'
import Router from 'vue-router'
/*import HelloWorld from '@/components/HelloWorld'*/

/*import Home from '@/pages/Home/Home'
import Search from '@/pages/Search/Search'
import Person from '@/pages/Person/Person'
import Order from '@/pages/Order/Order'*/
//这样写路由组件的引入，会在进入对应的路由页面的时候才去加载对应的组件
const Home = () => import('@/pages/Home/Home');
const Search = () => import('@/pages/Search/Search');
const Person = () => import('@/pages/Person/Person');
const Order = () => import('@/pages/Order/Order');

import Login from '@/pages/Login/Login'
import UserInfo from '@/pages/UserInfo/UserInfo'
import Shop from '@/pages/Shop/Shop'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '@/pages/Shop/ShopRating/ShopRating'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      children: [
        {
          path: '/shop/shopGoods',
          name: 'ShopGoods',
          component: ShopGoods
        },
        {
          path: '/shop/shopRating',
          name: 'ShopRating',
          component: ShopRating
        },
        {
          path: '/shop/shopInfo',
          name: 'ShopInfo',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/shopGoods'
        }
      ]
    }
  ]
})
