/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Layout } from '../components/Layout/index.js'
import Loader from '../components/Loader'
import { classnames, config } from 'utils'
import '../themes/index.less'
import './app.less'


// 顶部Loading条
let lastHref
function checkNavLoadingBarState( globalLoading ){
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    if (!globalLoading) {
      NProgress.done()
      lastHref = href
    }
  }
}

const App = ({ children, dispatch, app, layout, loading, location }) => {

  checkNavLoadingBarState( loading.global );

  const layoutProps = {
    children,
    loading,
    loginInfo: app.loginInfo,
    menuTree: layout.menuTree,
    currentMenuItem: layout.currentMenuItem,
    currentMenuStack: layout.currentMenuStack,
    isMobileNavbarMode: layout.isMobileNavbarMode,
    isSiderCollapsed: layout.isSiderCollapsed,
    isSiderThemeDark: layout.isSiderThemeDark,
    isMobileMenuPopoverVisible: layout.isMobileMenuPopoverVisible,
    onSideMenuItemSelected() {
      dispatch({ type: 'layout/refreshMenu' })
    },
    onToggleFoldSider() {
      dispatch({ type: 'layout/toggleFoldSider' })
    },
    onToggleMobileMenuPopoverVisible() {
      dispatch({ type: 'layout/toggleMobileMenuPopoverVisible' })
    },
    onLogout(){
      dispatch({ type: 'app/logout' })
    }
  }


  return (<div>
    <Layout {...layoutProps}/>
  </div>)
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  layout: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading, layout }) => ({ app, loading, layout }))(App)
