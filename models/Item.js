import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    type: {
      type: String,
      default: 'else',
      validator: (v) => ['municipal', 'industrial', 'else'].includes(v),
      required: false,
    },
  },
}
export { props }

/**
 * ## Item
 *
 * @author shisyamo4131
 */
export default class Item extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = `Items`
    this.tokenFields = ['abbr']
  }

  initialize(item) {
    Object.keys(props.props).forEach((key) => {
      const propDefault = props.props[key].default
      this[key] =
        typeof propDefault === 'function' ? propDefault() : propDefault
    })
    super.initialize(item)
  }
}
