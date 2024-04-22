import FireModel from './FireModel'

const props = {
  props: {
    siteId: { type: String, default: '', required: false },
    startAt: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## MunicipalContract
 *
 * @author shisyamo4131
 */
export default class MunicipalContract extends FireModel {
  constructor(context, siteId, item) {
    super(context, item)
    this.collection = `Sites/${siteId}/MunicipalContracts`
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
