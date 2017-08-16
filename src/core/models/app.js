/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import * as accountService from 'services/account'
import pathToRegexp from 'path-to-regexp'
import lodash from 'lodash'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    loginInfo: {
      roleTypeCode: '',
      permissionUnits: [],
    },
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'checkLogin' })
    },

  },
  effects: {

    * checkLogin ({
      payload,
    }, { call, put }) {
      let res
      try {
        res = yield call(accountService.getLoginInfo)
      } catch(e) { res = {} }
      const { success, data: loginInfo, errorMessage } = res
      if (success && loginInfo) {
        accountService.storeLoginInfoLocally( loginInfo )
        let loginInfo = accountService.getLoginInfoFromLocal()
        yield put({
          type: 'updateState',
          payload: { loginInfo, },
        })
        yield put({ type: 'layout/refreshMenu'})
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
        let from = location.pathname
        window.location = `${location.origin}/login?from=${from}`
      }
    },

    * logout ({
      payload,
    }, { call, put }) {
      const {success, errorMessage } = yield call(accountService.logout, parse(payload))
      if (success) {
        yield put({ type: 'checkLogin' })
      } else {
        throw errorMessage
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
