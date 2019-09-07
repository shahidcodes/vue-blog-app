import Vue from 'vue'
import Router from 'vue-router'
import Posts from 'components/Posts'
import SinglePost from 'components/SinglePost'
import Search from 'components/Search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/page/:num',
      name: 'Pagination',
      component: Posts
    },
    {
      path: '/search/:query',
      component: Search
    },
    {
      path: '/labels/:query',
      component: Search
    },
    {
      path: '/p/:post_title',
      name: 'Single',
      component: SinglePost
    }
  ]
})
