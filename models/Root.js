import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    sun: { type: Array, default: () => [], required: false },
    mon: { type: Array, default: () => [], required: false },
    tue: { type: Array, default: () => [], required: false },
    wed: { type: Array, default: () => [], required: false },
    thu: { type: Array, default: () => [], required: false },
    fri: { type: Array, default: () => [], required: false },
    sat: { type: Array, default: () => [], required: false },
  },
}
export { props }

/**
 * ## Root
 *
 * @author shisyamo4131
 */
export default class Root extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = 'Roots'
    this.tokenFields = ['name']
    Object.defineProperties(this, {
      /**
       * Returns an array of siteId stored on all days of the week,
       * excluding duplicates.
       * This is useful to see if a particular site is registered for a route.
       */
      siteIds: {
        enumerable: true,
        get() {
          return [
            ...new Set(
              this.sun.concat(
                this.mon,
                this.tue,
                this.wed,
                this.thu,
                this.fri,
                this.sat
              )
            ),
          ]
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
