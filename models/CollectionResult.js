import FireModel from './FireModel'

const props = {
  props: {
    date: { type: String, default: '', required: false },
    resultType: {
      type: String,
      default: '',
      validator: (v) => !v || ['root', 'spot'].includes(v),
      required: false,
    },
    siteId: { type: String, default: '', required: false },
    itemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    unitPrice: { type: Number, default: null, required: false },
    convertWeight: { type: Number, default: null, required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## CollectionResult
 *
 * @author shisyamo4131
 */
export default class CollectionResult extends FireModel {
  constructor(context, siteId, item) {
    super(context, item)
    this.collection = `Sites/${siteId}/CollectionResults`
    this.tokenFields = ['abbr', 'abbrKana']
    Object.defineProperties(this, {
      price: {
        enumerable: true,
        get() {
          if (!this.amount || !this.unitPrice) return 0
          return (this.amount * 100 * (this.unitPrice * 100)) / 10000
        },
        set(v) {},
      },
      convertedWeight: {
        enumerable: true,
        get() {
          if (!this.amount || !this.convertWeight) return 0
          return (this.amount * 100 * (this.convertWeight * 100)) / 10000
        },
        set(v) {},
      },
      amountString: {
        enumerable: true,
        get() {
          return (this.amount || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
        set(v) {},
      },
      convertWeightString: {
        enumerable: true,
        get() {
          return (this.convertWeight || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
        set(v) {},
      },
      convertedWeightString: {
        enumerable: true,
        get() {
          return (this.convertedWeight || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
        set(v) {},
      },
      unitPriceString: {
        enumerable: true,
        get() {
          return (this.unitPrice || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
        set(v) {},
      },
      priceString: {
        enumerable: true,
        get() {
          return (this.price || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
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
