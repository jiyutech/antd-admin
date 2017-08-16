import * as accountService from 'services/account'

export default {

  namespace: 'account',

  state: {
    // 列表页数据
    list: {
      currentPage: null,
      pageSize: null,
      resultSet: null,
      statistics: null,
      totalPages: null,
      totalRecords: null,
    },
    // 创建/编辑 详情弹框数据
    detail: {
      id: null, // 在创建时不具备id属性
      roleTypeCode: null,
      username: null,
      password: null,
      name: null
    },

    // 创建/编辑 详情弹框展示控制
    DetailModalVisible: false

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetchList' })
    },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {  // eslint-disable-line
      let {success, data, errorMessage} = yield call(accountService.getAccounts)
      if ( success ) {
        yield put({ type: 'updateList', payload: { list: data } });
      }
      else {
        throw errorMessage
      }
    },

    * createOrUpdate ({ payload }, { select, call, put }) {
      const { success, data: detail, errorMessage } = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideDetailModal' })
        yield put({ type: 'fetchList' })
      } else {
        throw data
      }
    },
  },

  reducers: {

    updateState (state, action) {
      return { ...state, ...action.payload }
    },

    updateList (state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload.list
        }
      }
    },

    showDetailModal (state, { payload }) {
      console.error(1);
      return {
        ...state,
        detail: payload,
        DetailModalVisible: true
      }
    },

    hideDetailModal (state) {
      return {
        ...state,
        DetailModalVisible: false
      }
    }

  },

};
