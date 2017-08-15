
export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'updateState' });
    },
  },

  reducers: {

    updateState (state, action) {
      return { ...state, ...action.payload }
    },

  },

};
