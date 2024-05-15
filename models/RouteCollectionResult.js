import { collection, getDocs, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

const props = {
  props: {
    date: { type: String, default: '', required: false },
    siteId: { type: String, default: '', required: false },
    itemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## RouteCollectionResult
 *
 * @author shisyamo4131
 */
export default class RouteCollectionResult extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = `RouteCollectionResults`
    Object.defineProperties(this, {
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
      dateObj: {
        enumerable: true,
        get() {
          if (!this.date) return null
          const date = new Date(this.date)
          const year = date.getFullYear()
          const month = date.getMonth() + 1
          const day = date.getDate()
          const dayOfWeek = date.getDay()
          return { year, month, day, dayOfWeek }
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

  async beforeCreate() {
    const sameRouteResult = await this.getSameRouteResults()
    if (sameRouteResult.length) {
      throw new Error('同一品目・単位の実績が既に登録されています。')
    }
  }

  async beforeUpdate() {
    const sameRouteResult = await this.getSameRouteResults()
    const ignoreSelf = sameRouteResult.filter(
      ({ docId }) => docId !== this.docId
    )
    if (ignoreSelf.length) {
      throw new Error('同一品目・単位の実績が既に登録されています。')
    }
  }

  async getSameRouteResults() {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '==', this.date),
      where('siteId', '==', this.siteId),
      where('itemId', '==', this.itemId),
      where('unitId', '==', this.unitId)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return []
    return querySnapshot.docs.map((doc) => doc.data())
  }
}
