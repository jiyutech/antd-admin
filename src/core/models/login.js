import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import * as accountService from 'services/account'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    * login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const { success, data, errorMessage, errorCode } = yield call(accountService.login, {
        username: payload.username,
        password: payload.password
      })
      yield put({ type: 'hideLoginLoading' })
      if (success) {
        accountService.storeLoginInfoLocally( data )
        const from = queryURL('from')
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw errorMessage
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
