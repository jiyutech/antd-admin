import React from 'react';
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { classnames } from 'utils'
import config from 'config'

import Header from './Header'
import Menu from './Menu'
import Bread from './Bread'
import Sider from './Sider'
import Footer from './Footer'
import styles from './Layout.less'
import Error from '../Error'
import Loader from '../Loader'

const { prefix, openPages } = config
const { iconFontJS, iconFontCSS, logo } = config


const Layout = ( layoutProps ) => {

  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`

  const {
    children,
    loading,
    isMobileNavbarMode,
    isSiderCollapsed,
    isSiderThemeDark,
  } = layoutProps

  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  return (<div>
    <Helmet>
      <title>ANTD ADMIN</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href={logo} type="image/x-icon" />
      {iconFontJS && <script src={iconFontJS} />}
      {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
    </Helmet>
    <div className={classnames(styles.layout, { [styles.fold]: isMobileNavbarMode ? false : isSiderCollapsed }, { [styles.withnavbar]: isMobileNavbarMode })}>
      {!isMobileNavbarMode ? <aside className={classnames(styles.sider, { [styles.light]: !isSiderThemeDark })}>
        <Sider {...layoutProps} />
      </aside> : ''}
      <div className={styles.main}>
        <Header {...layoutProps} />
        <Bread {...layoutProps} />
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>);
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  loginInfo: PropTypes.object,
  loading: PropTypes.object,
  menuTree: PropTypes.array,
  currentMenuItem: PropTypes.object,
  currentMenuStack: PropTypes.array,
  isMobileNavbarMode: PropTypes.bool,
  isSiderCollapsed: PropTypes.bool,
  isSiderThemeDark: PropTypes.bool,
  isMobileMenuPopoverVisible: PropTypes.bool,
  onSideMenuItemSelected: PropTypes.func,
  onToggleFoldSider: PropTypes.func,
  onToggleMobileMenuPopoverVisible: PropTypes.func,
  onLogout: PropTypes.func,
};

export default Layout
