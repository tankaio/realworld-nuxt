import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7036dc8f = () => interopDefault(import('..\\pages\\editor.vue' /* webpackChunkName: "pages_editor" */))
const _9ed39592 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _562bc445 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _4860dc76 = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "pages_settings" */))
const _7611dff6 = () => interopDefault(import('..\\pages\\article\\_slug.vue' /* webpackChunkName: "pages_article__slug" */))
const _90f7f3e4 = () => interopDefault(import('..\\pages\\profile\\_username.vue' /* webpackChunkName: "pages_profile__username" */))
const _56aee355 = () => interopDefault(import('..\\pages\\profile\\username\\index.vue' /* webpackChunkName: "pages_profile_username_index" */))
const _2f7fa805 = () => interopDefault(import('..\\pages\\profile\\username\\favoarticle.vue' /* webpackChunkName: "pages_profile_username_favoarticle" */))
const _3222dbc0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/editor",
    component: _7036dc8f,
    name: "editor"
  }, {
    path: "/login",
    component: _9ed39592,
    name: "login"
  }, {
    path: "/register",
    component: _562bc445,
    name: "register"
  }, {
    path: "/settings",
    component: _4860dc76,
    name: "settings"
  }, {
    path: "/article/:slug?",
    component: _7611dff6,
    name: "article-slug"
  }, {
    path: "/profile/:username?",
    component: _90f7f3e4,
    children: [{
      path: "",
      component: _56aee355,
      name: "profile-username"
    }, {
      path: "favoarticle",
      component: _2f7fa805,
      name: "profile-username-favoarticle"
    }]
  }, {
    path: "/",
    component: _3222dbc0,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
