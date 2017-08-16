const EnumRoleType = {
  SYS: 'sys',
  ADMIN: 'it',
  MANAGER: 'm',
  DEFAULT: 'op',
}

const EnumRoleTypeTextMap = {
  [EnumRoleType.SYS]: '系统管理员',
  [EnumRoleType.ADMIN]: 'IT人员',
  [EnumRoleType.MANAGER]: '管理者',
  [EnumRoleType.DEFAULT]: '运营人员',
}

module.exports = {
  EnumRoleType,
  EnumRoleTypeTextMap,
}
