export interface ISettings {
  title: string
  showSettings: string
  showTagsView: string
  fixedHeader: string
  showSidebarLogo: string
  errorLog: Array<string>
  sidebarTextTheme: string
  [propName: string]: any
}

//默认配置
export const settings: ISettings = {
  title: 'vue-admin',
  showSettings: '1',
  showTagsView: '1',
  fixedHeader: '0',
  showSidebarLogo: '1',
  errorLog: ['production'],
  sidebarTextTheme: '1'
}

// export default settings
