/**
 * ### UnitPrice
 * @author shisyamo4131
 */

const props = {
  props: {
    itemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    price: { type: Number, default: null, required: false },
    convertWeight: { type: Number, default: null, required: false },
  },
}
export { props }

export default class UnitPrice {
  constructor(context, item) {
    this.itemId = ''
    this.unitId = ''
    this.price = null
    this.convertWeight = null
    this.initialize(item)
    Object.defineProperties(this, {
      id: {
        enumerable: true,
        get() {
          if (this.itemId && this.unitId) return `${this.itemId}-${this.unitId}`
          if (this.itemId && !this.unitId) return this.itemId
          return ''
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
    if (!item) return
    Object.keys(item).forEach((key) => {
      if (key in this) {
        this[key] = JSON.parse(JSON.stringify(item[key]))
      }
    })
  }
}
