import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import FireModel from './FireModel'

const props = {
  props: {
    siteId: { type: String, default: '', required: false },
    startAt: { type: String, default: '', required: false },
    claimMinimumCharge: { type: Boolean, default: false, required: false },
    minimumChargePrice: { type: Number, default: null, required: false },
    minimumChargeFirst: { type: Number, default: null, required: false },
    claimFixedCharge: { type: Boolean, default: false, required: false },
    fixedChargePrice: { type: Number, default: null, required: false },
    fixedChargeFirst: { type: Number, default: null, required: false },
    unitPrices: { type: Array, default: () => [], required: false },
  },
}
export { props }

/**
 * ## SiteRouteContract
 *
 * @author shisyamo4131
 */
export default class SiteRouteContract extends FireModel {
  constructor(context, siteId, item) {
    super(context, item)
    this.collection = `Sites/${siteId}/SiteRouteContracts`
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
    const colRef = collection(this.firestore, this.collection)
    const q = query(colRef, where('startAt', '==', this.startAt))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      throw new Error(
        '指定された日付を適用開始とするルート回収契約が既に登録されています。'
      )
    }
    if (this.claimFixedCharge) {
      this.unitPrices.forEach(({ price }) => (price = 0))
    }
  }

  async beforeUpdate() {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('startAt', '==', this.startAt),
      where('docId', '!=', this.docId)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      throw new Error(
        '指定された日付を適用開始とするルート回収契約が既に登録されています。'
      )
    }
    if (this.claimFixedCharge) {
      this.unitPrices.forEach(({ price }) => (price = 0))
    }
  }

  async fetchUnitPrice({ date, itemId, unitId }) {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('startAt', '<=', date),
      orderBy('startAt', 'desc'),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return undefined
    const unitPrices = querySnapshot.docs[0].data().unitPrices
    const unitPrice = unitPrices.find(
      (item) => item.itemId === itemId && item.unitId === unitId
    )
    return unitPrice
  }
}
