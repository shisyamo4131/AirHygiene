import { collection, getDocs, query, where } from 'firebase/firestore'
import FireModel from './FireModel'

const props = {
  props: {
    date: { type: String, default: '', required: false },
    resultType: {
      type: String,
      default: '',
      validator: (v) => !v || ['root', 'spot'].includes(v),
      required: false,
    },
    siteId: { type: String, default: '', required: false },
    itemId: { type: String, default: '', required: false },
    unitId: { type: String, default: '', required: false },
    amount: { type: Number, default: null, required: false },
    unitPrice: { type: Number, default: null, required: false },
    convertWeight: { type: Number, default: null, required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## CollectionResult
 *
 * @author shisyamo4131
 */
export default class CollectionResult extends FireModel {
  constructor(context, siteId, item) {
    super(context, item)
    this.collection = `Sites/${siteId}/CollectionResults`
    // this.tokenFields = ['abbr', 'abbrKana']
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
      convertWeightString: {
        enumerable: true,
        get() {
          return (this.convertWeight || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
        set(v) {},
      },
      convertedWeight: {
        enumerable: true,
        get() {
          if (!this.amount || !this.convertWeight) return 0
          return (this.amount * 100 * (this.convertWeight * 100)) / 10000
        },
        set(v) {},
      },
      convertedWeightString: {
        enumerable: true,
        get() {
          return (this.convertedWeight || 0).toLocaleString(undefined, {
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
      price: {
        enumerable: true,
        get() {
          if (!this.amount || !this.unitPrice) return 0
          return (this.amount * 100 * (this.unitPrice * 100)) / 10000
        },
        set(v) {},
      },
      priceString: {
        enumerable: true,
        get() {
          return (this.price || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
        set(v) {},
      },
      unitPriceString: {
        enumerable: true,
        get() {
          return (this.unitPrice || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
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
    if (this.resultType === 'root') {
      const sameRootResult = await this.getSameRootResults()
      if (sameRootResult.length) {
        throw new Error('ルート回収の実績が既に登録されています。')
      }
    }
  }

  async beforeUpdate() {
    if (this.resultType === 'root') {
      const sameRootResult = await this.getSameRootResults()
      const ignoreSelf = sameRootResult.filter(
        ({ docId }) => docId !== this.docId
      )
      if (ignoreSelf.length) {
        throw new Error('ルート回収の実績が既に登録されています。')
      }
    }
  }

  async getSameRootResults() {
    const colRef = collection(this.firestore, this.collection)
    const q = query(
      colRef,
      where('date', '==', this.date),
      where('resultType', '==', 'root'),
      where('itemId', '==', this.itemId),
      where('unitId', '==', this.unitId)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return []
    return querySnapshot.docs.map((doc) => doc.data())
  }
}
