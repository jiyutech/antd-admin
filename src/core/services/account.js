import { request, localStorage } from 'utils'
import { apiBase } from 'config'
import qs from 'qs'

export function storeLoginInfoLocally (data) {
  let stale = getLoginInfoFromLocal() || {}
  localStorage.set('loginInfo', {
    ...stale,
    ...data
  })
}

export function getLoginInfoFromLocal (data) {
  return localStorage.get('loginInfo')
}

export async function login (data) {
  return request({
    url: `${apiBase.main}/logins`,
    method: 'post',
    data,
  })
}

export async function logout (params) {
  var loginInfo = localStorage.get('loginInfo') || {};
  localStorage.remove('loginInfo')
  return request({
    url: `${apiBase.main}/logins?loginToken=${loginInfo.loginToken}`,
    method: 'delete'
  })
}

export async function getLoginInfo () {
  var loginInfo = localStorage.get('loginInfo');
  if ( !loginInfo || !loginInfo.loginId || !loginInfo.loginToken ) return Promise.reject()
  return request({
    url: `${apiBase.main}/accounts/${loginInfo.loginId}?loginToken=${loginInfo.loginToken}`,
    method: 'get'
  })
}

export async function getAccounts ( params ) {
  var loginInfo = localStorage.get('loginInfo');
  return request({
    url: `${apiBase.main}/accounts?`+ qs.stringify({
      loginToken: loginInfo.loginToken,
      ...params
    }),
    method: 'get'
  })
}
