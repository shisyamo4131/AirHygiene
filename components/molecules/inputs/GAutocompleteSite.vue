<script>
import GChipSiteStatus from '../chips/GChipSiteStatus.vue'
import GAutocompleteFirestore from './GAutocompleteFirestore.vue'
export default {
  components: { GAutocompleteFirestore, GChipSiteStatus },
  props: {
    // autoSelectFirst: { type: Boolean, default: true, required: false },
    multiple: { type: Boolean, default: false, required: false },
  },
  data() {
    return {
      filter: (item, queryText) => {
        if (item.abbr.includes(queryText)) return true
        if (item.abbrKana.includes(queryText)) return true
      },
    }
  },
}
</script>

<template>
  <g-autocomplete-firestore
    v-bind="{ ...$props, ...$attrs }"
    collection-id="Sites"
    :filter="filter"
    :item-text="(item) => `${item.code}: ${item.abbr}`"
    item-value="docId"
    :belongs="[
      {
        collectionId: 'Customers',
        primaryKey: 'docId',
        foreignKey: 'customerId',
        name: 'customer',
      },
    ]"
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
      <v-list-item v-slot="{ active }" v-bind="attrs" v-on="on">
        <v-list-item-action v-if="multiple">
          <v-checkbox :input-value="active" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ `${item.code}: ${item.abbr}` }}
            <g-chip-site-status class="ml-2" :value="item.status" x-small />
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.customer.abbr }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </g-autocomplete-firestore>
</template>

<style></style>
