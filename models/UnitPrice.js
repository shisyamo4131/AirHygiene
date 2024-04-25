/**
 * ### UnitPrice
 * @author shisyamo4131
 */
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
        set(v) {
          ;[this.itemId, this.unitId] = v.split('-')
        },
      },
      name: {
        enumerable: false,
        get() {
          if (this.itemId && this.unitId) {
            const item = context.store.getters['Items/get'](this.itemId)
            const unit = context.store.getters['Units/get'](this.unitId)
            return `${item.name}-${unit.name}`
          }
          if (this.itemId && !this.unitId) {
            const item = context.store.getters['Items/get'](this.itemId)
            return item.name
          }
          return ''
        },
      },
    })
  }

  initialize(item) {
    if (!item) return
    this.itemId = item?.itemId || ''
    this.unitId = item?.unitId || ''
    this.price = 'price' in item ? item.price : null
  }
}
