/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout } from 'services/app'
import pathToRegexp from 'path-to-regexp'
import lodash from 'lodash'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {
      roleTypeCode: '',
      permissionUnits: [],
    },
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
    },

  },
  effects: {

    * query ({
      payload,
    }, { call, put }) {
      const { success, user } = yield call(query, payload)
      if (success && user) {
        yield put({
          type: 'updateState',
          payload: {
            user,
          },
        })
        yield put({ type: 'layout/refreshMenu', payload: {
          roleTypeCode: user.roleTypeCode,
          permissionUnits: user.permissionUnits
        } })
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
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
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
