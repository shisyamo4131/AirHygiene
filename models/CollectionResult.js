import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    date: { type: String, default: '', required: false },
    resultType: { type: String, default: '', required: false }, // 'root', 'spot', 'fixedCharge', 'minimunCharge'
    siteId: { type: String, default: '', required: false },
    itemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    unitPrice: { type: Number, default: null, required: false },
    convertWeight: { type: Number, default: null, required: false },
  },
}
export { props }

/**
 * ## CollectionResult
 *
 * @author shisyamo4131
 */
export default class CollectionResult extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = 'CollectionResults'
    this.tokenFields = ['abbr', 'abbrKana']
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
