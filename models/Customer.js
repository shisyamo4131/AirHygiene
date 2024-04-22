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
    deadline: {
      type: String,
      default: '99',
      validator: (v) => ['05', '10', '15', '20', '25', '99'].includes(v),
      required: false,
    },
    rounding: {
      type: String,
      default: 'round',
      validator: (v) => ['floor', 'round', 'ceil'].includes(v),
      required: false,
    },
    depositMonth: { type: Number, default: 1, required: false },
    depositDay: {
      type: String,
      default: '99',
      validator: (v) => ['05', '10', '15', '20', '25', '99'].includes(v),
      required: false,
    },
    hasSendTo: { type: Boolean, default: false, required: false },
    sendToZipcode: { type: String, default: '', required: false },
    sendToPref: { type: String, default: '', required: false },
    sendToCity: { type: String, default: '', required: false },
    sendToAddress1: { type: String, default: '', required: false },
    sendToAddress2: { type: String, default: '', required: false },
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
    this.hasMany = [
      {
        collection: 'Sites',
        field: 'customerId',
        condition: '==',
        type: 'collection',
      },
    ]
    Object.defineProperties(this, {
      fullAddress: {
        enumerable: true,
        get() {
          return this.pref + this.city + this.address1
        },
        set(v) {},
      },
      sendToFullAddress: {
        enumerable: true,
        get() {
          return this.sendToPref + this.sendToCity + this.sendToAddress1
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

  beforeCreate() {
    return new Promise((resolve) => {
      if (!this.hasSendTo) {
        this.sendToZipcode = this.zipcode
        this.sendToPref = this.pref
        this.sendToCity = this.city
        this.sendToAddress1 = this.address1
        this.sendToAddress2 = this.address2
      }
      resolve()
    })
  }

  beforeUpdate() {
    return new Promise((resolve) => {
      if (!this.hasSendTo) {
        this.sendToZipcode = this.zipcode
        this.sendToPref = this.pref
        this.sendToCity = this.city
        this.sendToAddress1 = this.address1
        this.sendToAddress2 = this.address2
      }
      resolve()
    })
  }
}
