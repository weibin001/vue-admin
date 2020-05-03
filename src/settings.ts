interface ISettings {
  title: string
  themeColor: string
  showSettings: boolean
  showTagsView: boolean
  fixedHeader: boolean
  showSidebarLogo: boolean
  errorLog: Array<string>
  sidebarTextTheme: boolean
}

//默认配置
const settings: ISettings = {
  title: 'vue-admin',
  themeColor: '#409eff',
  showSettings: false,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  errorLog: ['production'],
  sidebarTextTheme: true
}

export default settings
