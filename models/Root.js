import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    sun: { type: Array, default: () => [], required: false },
    mon: { type: Array, default: () => [], required: false },
    tue: { type: Array, default: () => [], required: false },
    wed: { type: Array, default: () => [], required: false },
    thu: { type: Array, default: () => [], required: false },
    fri: { type: Array, default: () => [], required: false },
    sat: { type: Array, default: () => [], required: false },
  },
}
export { props }

/**
 * ## Root
 *
 * @author shisyamo4131
 */
export default class Root extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = 'Roots'
    this.tokenFields = ['name']
    // this.hasMany = [
    //   {
    //     collection: 'Sites',
    //     field: 'customerId',
    //     condition: '==',
    //     type: 'collection',
    //   },
    // ]
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
