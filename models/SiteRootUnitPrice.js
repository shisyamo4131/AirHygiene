import FireModel from './FireModel'

const props = {
  props: {
    siteId: { type: String, default: '', required: false },
    startAt: { type: String, default: '', required: false },
    claimFixedCharge: { type: Boolean, default: false, required: false },
    fixedCharge: { type: Number, default: null, required: false },
    fixedChargeFirst: { type: Number, default: null, required: false },
    unitPrices: { type: Array, default: () => [], required: false },
  },
}
export { props }

/**
 * ## SiteRootUnitPrices
 *
 * @author shisyamo4131
 */
export default class SiteRootUnitPrices extends FireModel {
  constructor(context, siteId, item) {
    super(context, item)
    this.collection = `Sites/${siteId}/SiteRootUnitPrices`
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
