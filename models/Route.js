import { collection, getDocs, query, where } from 'firebase/firestore'
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
 * ## Route
 *
 * @author shisyamo4131
 */
export default class Route extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = 'Routes'
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

  /**
   * Returns an array of site object specified by id included in siteIds.
   * @returns An array of site object.
   */
  getSites(dayOfWeek = undefined) {
    return new Promise((resolve) => {
      const siteIds = dayOfWeek ? this[dayOfWeek] : this.siteIds
      const chunkedIds = siteIds.flatMap((_, i, a) =>
        i % 30 ? [] : [a.slice(i, i + 30)]
      )
      const colRef = collection(this.firestore, 'Sites')
      const promises = chunkedIds.map((ids) => {
        return new Promise((resolve) => {
          const q = query(colRef, where('docId', 'in', ids))
          getDocs(q).then((querySnapshot) => {
            resolve(querySnapshot.docs.map((doc) => doc.data()))
          })
        })
      })
      Promise.all(promises).then((values) => {
        const result = values.reduce((sum, i) => {
          sum.push(...i)
          return sum
        }, [])
        resolve(result)
      })
    })
  }
}
