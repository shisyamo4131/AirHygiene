import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    name1: { type: String, default: '', required: false },
    name2: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    abbrKana: { type: String, default: '', required: false },
    zipcode: { type: String, default: '', required: false },
    pref: { type: String, default: '', required: false },
    city: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    tel: { type: String, default: '', required: false },
    fax: { type: String, default: '', required: false },
    deadline: { type: String, default: '99', required: false },
    depositMonth: { type: Number, default: 1, required: false },
    depositDay: { type: String, default: '99', required: false },
    status: { type: String, default: 'active', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## Customer
 *
 * @author shisyamo4131
 */
export default class Customer extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = 'Customers'
    this.tokenFields = ['abbr', 'abbrKana']
    Object.defineProperties(this, {
      fullAddress: {
        enumerable: true,
        get() {
          return this.pref + this.city + this.address1
        },
        set(v) {},
      },
    })
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
