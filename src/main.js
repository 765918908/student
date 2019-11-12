import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//import Mock from './mock'
//Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import './styles/main.css'
import mixin from './mixin/global.js'
import infiniteScroll from 'vue-infinite-scroll'


// Vue.directive('loadmore', {
//   bind(el, binding) {
//     const selectWrap = el.querySelector('.el-table__body-wrapper')
//     selectWrap.addEventListener('scroll', function () {
//       let sign = 0
//       const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
//       if (scrollDistance <= sign) {
//         binding.value()
//       }
//     })
//   }
// })


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.mixin(mixin)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

const myVue = new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

//暴露到控制台
window.myVue = myVue;
