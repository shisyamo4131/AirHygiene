<script>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
/**
 * ### AirLazyFetchDocs
 * Wrapper component that provides v-autocomplete with API integration with Firestore.
 * @author shisyamo4131
 */
export default {
  /****************************************************************************
   * PROPS
   ****************************************************************************/
  props: {
    collectionId: { type: String, required: true },
    constraints: { type: Array, default: () => [], required: false },
    delay: { type: [String, Number], default: 500, required: false },
    itemValue: {
      type: [String, Array, Function],
      default: 'docId',
      required: false,
    },
    tokenField: { type: String, default: 'tokenMap', required: false },
  },
  /****************************************************************************
   * DATA
   ****************************************************************************/
  data() {
    return {
      items: [],
      loading: false,
      searchInput: null,
      timerId: null,
    }
  },
  /****************************************************************************
   * WATCH
   ****************************************************************************/
  watch: {
    searchInput: {
      handler(v) {
        this.loading = true
        clearTimeout(this.timerId)
        if (!v) {
          this.loading = false
          return
        }
        const delay = v ? Number(this.delay) : 0
        this.timerId = setTimeout(async () => {
          await this.fetchDocs(v)
          this.loading = false
        }, delay)
      },
    },
    '$attrs.value': {
      handler(newVal, oldVal) {
        if (newVal === oldVal || !newVal) return
        const ids = []
        if (typeof newVal === 'object' && Array.isArray(newVal)) {
          ids.push(...newVal.map((item) => item?.[this.itemValue] || item))
        } else if (typeof newVal === 'object') {
          const id = this.$attrs.value?.[this.itemValue] || undefined
          if (id) ids.push(id)
        } else {
          const id = this.$attrs.value || undefined
          if (id) ids.push(id)
        }
        for (const id of ids) {
          if (!this.items.some((item) => item[this.itemValue] === id)) {
            const docRef = doc(this.$firestore, `${this.collectionId}/${id}`)
            getDoc(docRef).then((docSnapshot) => {
              if (docSnapshot.exists()) this.items.push(docSnapshot.data())
            })
          }
        }
      },
      immediate: true,
    },
  },
  /****************************************************************************
   * METHODS
   ****************************************************************************/
  methods: {
    /**
     * Devides a string taken as an argument and returns if as an array for NGram.
     */
    convertStringToGrams(v) {
      // Return empty array if the value is null, undefined or not string.
      if (!v || typeof v !== 'string') return []
      // Divides the value as array.
      const target = v.replace(
        /[\uD800-\uDBFF]|[\uDC00-\uDFFF]|~|\*|\[|\]|\s+/g,
        ''
      )
      const length = target.length === 1 ? 1 : 2
      const divided = Array.from(target).reduce((sum, _, index) => {
        if (index > target.length - length) return sum
        sum.push(target.substring(index, index + length))
        return sum
      }, [])
      // Delete duplicated element.
      const result = [...new Set(divided)]
      return result
    },
    /**
     * Fetch documents from specified collection.
     */
    async fetchDocs(queryString) {
      const grams = this.convertStringToGrams(queryString)
      const colRef = collection(this.$firestore, this.collectionId)
      const wheres = grams.map((gram) =>
        where(`${this.tokenField}.${gram}`, '==', true)
      )
      const q = query(colRef, ...this.constraints, ...wheres)
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) return
      querySnapshot.docs.forEach((doc) => {
        const isExist = this.items.some((item) => {
          return item[this.itemValue] === doc.data()[this.itemValue]
        })
        if (!isExist) this.items.push(doc.data())
      })
    },
  },
  /****************************************************************************
   * RENDER
   ****************************************************************************/
  render(createElement) {
    return createElement('div', {}, [
      this.$scopedSlots.default({
        attrs: {
          cacheItems: true,
          items: this.items,
          itemValue: this.itemValue,
          loading: this.loading,
          searchInput: this.searchInput,
          ...this.$attrs,
        },
        on: {
          'update:search-input': ($event) => (this.searchInput = $event),
          ...this.$listeners,
        },
      }),
    ])
  },
}
</script>

<style></style>
