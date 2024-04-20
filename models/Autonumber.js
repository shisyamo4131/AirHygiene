import FireModel from './FireModel'

const props = {
  props: {
    collectionId: { type: String, default: '', required: false },
    current: { type: Number, default: null, required: false },
    length: { type: Number, default: null, required: false },
    field: { type: String, default: 'code', required: false },
    status: { type: Boolean, default: true, required: false },
  },
}
export { props }

/**
 * ## Autonumber
 *
 * @author shisyamo4131
 */
export default class Autonumber extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = 'Autonumbers'
  }

  initialize(item) {
    Object.keys(props.props).forEach((key) => {
      const propDefault = props.props[key].default
      this[key] =
        typeof propDefault === 'function' ? propDefault() : propDefault
    })
    super.initialize(item)
  }

  async create() {
    await super.create(this.collectionId)
  }
}
