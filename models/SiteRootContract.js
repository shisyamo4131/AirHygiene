import FireModel from './FireModel'

const props = {
  props: {
    siteId: { type: String, default: '', required: false },
    startAt: { type: String, default: '', required: false },
    claimMinimumCharge: { type: Boolean, default: false, required: false },
    minimumCharge: { type: Number, default: null, required: false },
    minimumChargeFirst: { type: Number, default: null, required: false },
    claimFixedCharge: { type: Boolean, default: false, required: false },
    fixedCharge: { type: Number, default: null, required: false },
    fixedChargeFirst: { type: Number, default: null, required: false },
    unitPrices: { type: Array, default: () => [], required: false },
  },
}
export { props }

/**
 * ## SiteRootContract
 *
 * @author shisyamo4131
 */
export default class SiteRootContract extends FireModel {
  constructor(context, siteId, item) {
    super(context, item)
    this.collection = `Sites/${siteId}/SiteRootContracts`
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
