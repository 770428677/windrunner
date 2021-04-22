import Vue from 'vue'
import Router from 'vue-router'
import programRouter from './program'
import gameRouter from './game'
import musicRouter from './music'
import homeRouter from './home'
import articleRouter from './article'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'windrunner',
  routes: [
    {
      path: '*',
      redirect: './home'
    },
    programRouter,
    gameRouter,
    musicRouter,
    homeRouter,
    articleRouter
  ]
})
