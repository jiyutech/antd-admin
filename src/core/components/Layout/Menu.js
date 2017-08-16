/* global location */
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Tooltip } from 'antd'
import { Link } from 'dva/router'
import { arrayToTree, queryArray } from 'utils'
import pathToRegexp from 'path-to-regexp'


class Menus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.props.currentMenuStack ? this.props.currentMenuStack.map(item => item.id) : []
    };
  }

  handleMenuOpen = (openKeys) => {
    this.setState({
      openKeys: this.props.isSiderCollapsed ? [] : openKeys
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ( this.props.currentMenuStack.map(item => item.id).join('-') != prevProps.currentMenuStack.map(item => item.id).join('-') ) {
      this.setState({
        openKeys: this.props.isSiderCollapsed ? [] : this.props.currentMenuStack.map(item => item.id)
      });
    }
  }

  render() {

    const {
      menuTree,
      currentMenuItem,
      currentMenuStack,
      isSiderCollapsed,
      isSiderThemeDark,
      isMobileNavbarMode,
      onSideMenuItemSelected
    } = this.props

    const isInlineCollapsed = isMobileNavbarMode ? false : isSiderCollapsed;

    // 递归生成菜单
    const getMenus = (menuTreeN, isInlineCollapsed, menuParent) => {
      return menuTreeN.map((item) => {
        if (item.subitems) {
          return (
            <Menu.SubMenu
              key={item.id}
              title={<span>
                {item.icon && <Icon type={item.icon} />}
                {(isInlineCollapsed && !menuParent) ? '' : item.name}
              </span>}
            >
              {getMenus(item.subitems, isInlineCollapsed, item)}
            </Menu.SubMenu>
          )
        }

        return (
          <Menu.Item key={item.id}>
            <Link to={item.route}>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
      })
    }

    const menuItems = getMenus(menuTree, isInlineCollapsed)
    let currentMenuIdStack = currentMenuStack.map(item => item.id)

    const responsiveProps = isSiderCollapsed ? {
    } : {
      defaultOpenKeys: this.state.openKeys,
    }

    return (
      <Menu
        {...responsiveProps}
        mode={'inline'}
        theme={isSiderThemeDark ? 'dark' : 'light'}
        onOpenChange={this.handleMenuOpen}
        defaultSelectedKeys={currentMenuIdStack}
        onSelect={onSideMenuItemSelected}
        inlineCollapsed={isInlineCollapsed}
      >
        {menuItems}
      </Menu>
    )
  }
}


Menus.propTypes = {
  menuTree: PropTypes.array,
  // menu item {
  //   "name": "Dashboard",   // 标题
  //   "route": "/dashboard", // URL
  //   "icon": "laptop",      // icon
  //   "includePermissions": [ "GOODS_VIEW", "GOODS_EDIT" ], // 用户只要具备其中一个权限，就可以看到此菜单
  //   "whitelistRoles": [ "SYS" ], // 只有某些角色可以看到此菜单
  //   "blacklistRoles": [ "SYS" ], // 只有某些角色看不到此菜单，建议`whitelistRoles`和`blacklistRoles`针对某个菜单同时只使用一个
  //   "subitems": [], // 子菜单列表
  // }
  currentMenuItem: PropTypes.object,
  currentMenuStack: PropTypes.array,
  isSiderCollapsed: PropTypes.bool,
  isSiderThemeDark: PropTypes.bool,
  isMobileNavbarMode: PropTypes.bool,
  onSideMenuItemSelected: PropTypes.func,
}

export default Menus
