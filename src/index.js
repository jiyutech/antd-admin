import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
    console.error(error);
  },
})

// 2. Model
app.model(require('./core/models/app'))
app.model(require('./core/models/layout'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
