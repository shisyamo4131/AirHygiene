<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
/**
 * ### AirLazyFetchDocs
 * @author shisyamo4131
 */
export default {
  /****************************************************************************
   * PROPS
   ****************************************************************************/
  props: {
    belongs: { type: Array, default: () => [], required: false },
    collectionId: { type: String, required: true },
    constraints: { type: Array, default: () => [], required: false },
    delay: { type: [String, Number], default: 500, required: false },
    itemKey: {
      type: [String, Array, Function],
      default: 'docId',
      required: false,
    },
    sortBy: { type: String, default: 'code', required: false },
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
    '$attrs.search': {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.searchInput = newVal
      },
      immediate: true,
    },
    searchInput: {
      handler(newVal, oldVal) {
        this.loading = true
        clearTimeout(this.timerId)
        if (newVal === oldVal || !newVal) {
          this.loading = false
        } else {
          const delay = newVal ? Number(this.delay) : 0
          this.timerId = setTimeout(async () => {
            await this.fetchDocs(newVal)
            this.loading = false
          }, delay)
        }
        this.$emit('update:search', newVal)
      },
      immediate: true,
    },
    '$attrs.value': {
      async handler(newVal, oldVal) {
        try {
          if (newVal === oldVal || !newVal) return
          this.loading = true
          const ids = []
          if (typeof newVal === 'object' && Array.isArray(newVal)) {
            ids.push(...newVal.map((item) => item?.[this.itemKey] || item))
          } else if (typeof newVal === 'object') {
            const id = this.$attrs.value?.[this.itemKey] || undefined
            if (id) ids.push(id)
          } else {
            const id = this.$attrs.value || undefined
            if (id) ids.push(id)
          }
          const newIds = ids.filter(
            (id) => !this.items.some((item) => item[this.itemKey] === id)
          )
          const chunkedIds = newIds.flatMap((_, i, a) =>
            i % 30 ? [] : [a.slice(i, i + 30)]
          )
          const colRef = collection(this.$firestore, this.collectionId)
          for (const ids of chunkedIds) {
            const q = query(colRef, where(this.itemKey, 'in', ids))
            const querySnapshot = await getDocs(q)
            const newDocs = querySnapshot.docs.map((doc) => doc)
            const fetchedBelongs = await this.fetchBelongs(newDocs)
            newDocs.forEach((doc) => {
              const belongsResult = this.belongs.reduce((sum, belong) => {
                sum[belong.name] = fetchedBelongs[belong.collectionId].find(
                  (item) =>
                    item[belong.primaryKey] === doc.data()[belong.foreignKey]
                )
                return sum
              }, {})
              this.items.push({ ...doc.data(), ...belongsResult })
            })
          }
        } catch (err) {
          // eslint-disable-next-line
          console.err(err)
          alert(err.message)
        } finally {
          this.loading = false
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
      const newDocs = querySnapshot.docs.filter((docSnapshot) => {
        const id = docSnapshot.data()[this.itemKey]
        return !this.items.some((item) => item[this.itemKey] === id)
      })
      const fetchedBelongs = await this.fetchBelongs(newDocs)
      newDocs.forEach((doc) => {
        const belongsResult = this.belongs.reduce((sum, belong) => {
          sum[belong.name] = fetchedBelongs[belong.collectionId].find(
            (item) => item[belong.primaryKey] === doc.data()[belong.foreignKey]
          )
          return sum
        }, {})
        this.items.push({ ...doc.data(), ...belongsResult })
      })
    },
    async fetchBelongs(newDocs) {
      const result = {}
      for (const belong of this.belongs) {
        const fetchedDocs = []
        const chunkedIds = [
          ...new Set(newDocs.map((doc) => doc.data()[belong.foreignKey])),
        ].flatMap((_, i, a) => (i % 30 ? [] : [a.slice(i, i + 30)]))
        const colRef = collection(this.$firestore, belong.collectionId)
        for (const ids of chunkedIds) {
          const q = query(colRef, where(belong.primaryKey, 'in', ids))
          const querySnapshot = await getDocs(q)
          fetchedDocs.push(...querySnapshot.docs.map((doc) => doc.data()))
        }
        result[belong.collectionId] = fetchedDocs
      }
      return result
    },
  },
  /****************************************************************************
   * RENDER
   ****************************************************************************/
  render() {
    return this.$scopedSlots.default({
      autocomplete: {
        attrs: {
          cacheItems: true,
          items: this.items,
          itemValue: this.itemKey,
          loading: this.loading,
          searchInput: this.searchInput,
          ...this.$attrs,
        },
        on: {
          'update:search-input': ($event) => (this.searchInput = $event),
          ...this.$listeners,
        },
      },
    })
  },
}
</script>

<style></style>
