<script>
import { doc, getDoc } from 'firebase/firestore'
import GAutocompleteFirestore from './GAutocompleteFirestore.vue'
export default {
  components: { GAutocompleteFirestore },
  props: {
    autoSelectFirst: { type: Boolean, default: true, required: false },
    itemValue: { type: String, default: 'docId', required: false },
  },
  data() {
    return {
      filter: (item, queryText) => {
        return (
          item.abbr.includes(queryText) || item.abbrKana.includes(queryText)
        )
      },
    }
  },
  methods: {
    async customer(docId) {
      const docRef = doc(this.$firestore, `Customers/${docId}`)
      const docSnapshot = await getDoc(docRef)
      return docSnapshot.data()
    },
  },
}
</script>

<template>
  <g-autocomplete-firestore
    v-bind="{ ...$props, ...$attrs }"
    collection-id="Sites"
    :filter="filter"
    v-on="$listeners"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ item.abbr }}</v-list-item-title>
          <v-list-item-subtitle>{{
            customer(item.customerId)
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </g-autocomplete-firestore>
</template>

<style></style>
