const enums = require('./enums')
const { EnumRoleType } = enums

// Example:
// {
//   "name": "Dashboard",   // 标题
//   "route": "/dashboard", // URL
//   "icon": "laptop",      // icon
//   "includePermissions": [ "GOODS_VIEW", "GOODS_EDIT" ], // 用户只要具备其中一个权限，就可以看到此菜单
//   "whitelistRoles": [ "SYS" ], // 只有某些角色可以看到此菜单
//   "blacklistRoles": [ "SYS" ], // 只有某些角色看不到此菜单，建议`whitelistRoles`和`blacklistRoles`针对某个菜单同时只使用一个
//   "subitems": [], // 子菜单列表
// }

var menuTree = [{
  "name": "Dashboard",
  "route": "/dashboard",
  "icon": "laptop"
}, {
  "name": "Users",
  "route": "/user",
  "icon": "user"
}, {
  "name": "Posts",
  "route": "/post",
  "icon": "shopping-cart"
}, {
  "name": "Request",
  "route": "/request",
  "icon": "api"
}, {
  "name": "UI Element",
  "icon": "camera-o",
  "subitems": [{
    "name": "IconFont",
    "route": "/UIElement/iconfont",
    "icon": "heart-o"
  }, {
    "name": "DataTable",
    "route": "/UIElement/dataTable",
    "icon": "database"
  }, {
    "name": "DropOption",
    "route": "/UIElement/dropOption",
    "icon": "bars"
  }, {
    "name": "Search",
    "route": "/UIElement/search",
    "icon": "search"
  }, {
    "name": "Editor",
    "route": "/UIElement/editor",
    "icon": "edit"
  }, {
    "name": "layer (Function)",
    "route": "/UIElement/layer",
    "icon": "credit-card"
  }]
}, {
  "name": "Recharts",
  "icon": "code-o",
  "subitems": [{
    "name": "LineChart",
    "route": "/chart/lineChart",
    "icon": "line-chart"
  }, {
    "name": "BarChart",
    "route": "/chart/barChart",
    "icon": "bar-chart"
  }, {
    "name": "AreaChart",
    "route": "/chart/areaChart",
    "icon": "area-chart"
  }]
}, {
  "name": "Test Navigation",
  "icon": "setting",
  "subitems": [{
    "name": "Test Navigation1",
    "route": "/navigation/navigation1"
  }, {
    "name": "Test Navigation2",
    "route": "/navigation/navigation2",
    "subitems": [
      {
        "name": "Test Navigation21",
        "route": "/navigation/navigation2/navigation1"
      }, {
        "name": "Test Navigation22",
        "route": "/navigation/navigation2/navigation2"
      }
    ]
  }]
}, {
  "name": "账号管理",
  "route": "/account",
  "icon": "lock",
  "whitelistRoles": [ EnumRoleType.SYS, EnumRoleType.ADMIN ]
}]

var idCounter = 0
function identify(item){
  item.id = ++idCounter +'';
  if ( item.subitems ) item.subitems.map(identify)
  return item;
}

module.exports = menuTree.map(identify)
