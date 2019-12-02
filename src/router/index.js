import Vue from 'vue'
import Router from 'vue-router'
import goodsPage from '@/pages/goodsPage/goodsPage'
import ratingPage from '@/pages/ratingPage/ratingPage'
import sellerPage from '@/pages/sellerPage/sellerPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goodsPage',
      component: goodsPage
    },
    {
      path: '/seller',
      name: 'sellerPage',
      component: sellerPage
    },
    {
      path: '/rating',
      name: 'ratingPage',
      component: ratingPage
    },
    {
      path: '/',
      redirect:"/goods"
    }
  ]
})
