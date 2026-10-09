import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const keptCookies = ['size', 'theme', 'sidebarStatus', 'username', 'password', 'rememberMe']

export function clearAuth(commit) {
  commit('SET_USER', {})
  commit('SET_ROLES', [])
  commit('SET_LOAD_MENUS', false)
  commit('SET_ROUTERS', [])
  commit('SET_SIDEBAR_ROUTERS', [])
  commit('tagsView/DEL_ALL_VISITED_VIEWS')
  commit('tagsView/DEL_ALL_CACHED_VIEWS')
  removeToken()
  Object.keys(Cookies.get()).forEach(name => {
    if (keptCookies.indexOf(name) === -1) {
      Cookies.remove(name)
    }
  })
}
