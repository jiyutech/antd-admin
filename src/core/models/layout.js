import config from 'config'
const { menus, prefix, openPages } = config
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import * as accountService from 'services/account'

// 深度优先遍历菜单树
function dfTravelMenu(items, dealWith, parentItem){
  items.forEach(function(item){
    if ( item.subitems ) dfTravelMenu(item.subitems, dealWith, item)
    dealWith( item, parentItem )
  })
}
// 广度优先遍历菜单树
function bfTravelMenu(items, dealWith, parentItem){
  items.forEach(function(item){
    dealWith( item, parentItem )
    if ( item.subitems ) bfTravelMenu(item.subitems, dealWith, item)
  })
}

export default {

  namespace: 'layout',

  state: {
    // 菜单数据
    menuTree: lodash.cloneDeep(menus),        // 经过权限筛选后的菜单树
    currentMenuItem: null,                    // 当前所在页面所属菜单项
    currentMenuStack: [],                     // 当前所在页面所属菜单的栈
    // 是否切换到了手机导航样式
    isMobileNavbarMode: document.body.clientWidth < 769,
    // 侧边栏是否已收起
    isSiderCollapsed: window.localStorage.getItem(`${prefix}isSiderCollapsed`) === 'true',
    // 侧边栏是否使用暗色主题
    isSiderThemeDark: true,
    // 移动设备下，当前是否显示菜单浮层
    isMobileMenuPopoverVisible: false,

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'updateState' });
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isMobileNavbarMode = document.body.clientWidth < 769
      if (isMobileNavbarMode !== app.isMobileNavbarMode) {
        yield put({ type: 'handleNavbarMobileModeChange', payload: isMobileNavbarMode })
      }
    },

  },

  reducers: {

    updateState (state, action) {
      return { ...state, ...action.payload }
    },

    toggleFoldSider (state) {
      window.localStorage.setItem(`${prefix}isSiderCollapsed`, !state.isSiderCollapsed)
      return {
        ...state,
        isSiderCollapsed: !state.isSiderCollapsed,
      }
    },

    toggleMobileMenuPopoverVisible (state) {
      return {
        ...state,
        isMobileMenuPopoverVisible: !state.isMobileMenuPopoverVisible,
      }
    },

    handleNavbarMobileModeChange (state, { payload }) {
      return {
        ...state,
        isMobileNavbarMode: payload,
      }
    },

    refreshMenu (state, payload) {
      const { roleTypeCode, permissionUnits } = accountService.getLoginInfoFromLocal()
      let menuTree = lodash.cloneDeep(menus)
      let currentMenuItem
      let currentMenuStack = []

      // 权限过滤
      // 标记无权限节点
      dfTravelMenu( menuTree, (item, parentItem)=>{
        var noPermission = false;
        // 白名单角色处理
        if ( item.whitelistRoles && item.whitelistRoles.indexOf(roleTypeCode) == -1 ) item.noPermission = true;
        // 黑名单角色处理
        else if ( item.blacklistRoles && item.blacklistRoles.indexOf(roleTypeCode) != -1 ) item.noPermission = true;
        // 权限包检查
        else if ( item.includePermissions && !lodash.pull( item.includePermissions, permissionUnits ).length ) item.noPermission = true;
        // 标记无权限的有子节点（子节点都没有权限的话，父节点也要删除）
        if ( item.subitems && !item.subitems.filter( item => !item.noPermission).length ) item.noPermission = true;
      } )
      // 删除无权限菜单项
      menuTree = menuTree.filter( item => !item.noPermission)
      bfTravelMenu(menuTree, (item, parentItem)=>{
        if ( item.subitems ) item.subitems = item.subitems.filter( item => !item.noPermission)
      })

      // 寻找选中路由
      dfTravelMenu( menuTree, (item, parentItem)=>{
        if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
          currentMenuItem = item
          currentMenuStack = parentItem ? [parentItem, item] : [item]
        }
        // 把选中路由整条路径上的节点加入stack
        else if ( currentMenuItem && currentMenuStack.indexOf(item) != -1 && parentItem ) {
          currentMenuStack.unshift( parentItem )
        }
      } )

      return {
        ...state,
        menuTree,
        currentMenuItem,
        currentMenuStack
      }
    }

  },

};
