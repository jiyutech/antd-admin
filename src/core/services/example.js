import { request, localStorage } from 'utils'
import { apiBase } from 'config'
import qs from 'qs'

export function storeSomethingLocally (data) {
  let stale = getLoginInfoFromLocal() || {}
  localStorage.set('something', {
    ...stale,
    ...data
  })
}

export function getSomethingFromLocal (data) {
  return localStorage.get('something')
}

export function removeSomethingLocally () {
  localStorage.remove('something')
}

export async function create (data) {
  return request({
    url: `${apiBase.main}/somethings?`+ qs.stringify({
      loginToken: loginInfo.loginToken,
    }),
    method: 'post',
    data,
  })
}

export async function update (data) {
  let loginInfo = localStorage.get('loginInfo') || {};
  return request({
    url: `${apiBase.main}/somethings?`+ qs.stringify({
      loginToken: loginInfo.loginToken,
    }),
    method: 'patch',
    data,
  })
}

export async function getList ( query ) {
  let loginInfo = localStorage.get('loginInfo') || {};
  return request({
    url: `${apiBase.main}/somethings?`+ qs.stringify({
      loginToken: loginInfo.loginToken,
      ...query
    }),
    method: 'get'
  })
}

export async function getSingle ( id ) {
  let loginInfo = localStorage.get('loginInfo') || {};
  return request({
    url: `${apiBase.main}/somethings/${id}?`+ qs.stringify({
      loginToken: loginInfo.loginToken
    }),
    method: 'get'
  })
}

export async function deleteSingle ( id ) {
  let loginInfo = localStorage.get('loginInfo') || {};
  return request({
    url: `${apiBase.main}/somethings/${id}?`+ qs.stringify({
      loginToken: loginInfo.loginToken
    }),
    method: 'delete'
  })
}
