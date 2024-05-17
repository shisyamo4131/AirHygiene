import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    customerId: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    abbrKana: { type: String, default: '', required: false },
    zipcode: { type: String, default: '', required: false },
    pref: { type: String, default: '', required: false },
    city: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    tel: { type: String, default: '', required: false },
    fax: { type: String, default: '', required: false },
    status: { type: String, default: 'active', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## Site
 *
 * @author shisyamo4131
 */
export default class Site extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = `Sites`
    this.tokenFields = ['abbr', 'abbrKana']
    this.hasMany = [
      {
        collection: `Sites/${this.docId}/CollectionResults`,
        field: 'siteId',
        condition: '==',
        type: 'collection',
      },
      {
        collection: `Routes`,
        field: 'siteIds',
        condition: 'array-contains',
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
