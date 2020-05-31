// export * from './waves'
import { DirectiveOptions } from 'vue'

const context = require.context('./', true, /[^(.).*]\/index\.ts$/)

interface IDirectives {
  [propsName: string]: DirectiveOptions
}

const directives = context.keys().reduce((previousValue: IDirectives, currentValue: string) => {
  const fileName = currentValue.split('/')[1] || ''
  if (fileName && context(currentValue)[fileName]) previousValue[fileName] = context(currentValue)[fileName]
  return previousValue
}, {})

export default directives
