<script>
import GDataTable from './GDataTable.vue'
export default {
  components: { GDataTable },
  props: {
    hidePrice: { type: Boolean, default: false, required: false },
    editKey: { type: String, default: '', required: false },
  },
  computed: {
    headers() {
      const result = [
        { text: '回収品目', value: 'itemId' },
        { text: '単位', value: 'unitId', align: 'right', sortable: false },
        { text: '単価', value: 'price', align: 'right', sortable: false },
        {
          text: '換算重量',
          value: 'convertWeight',
          align: 'right',
          sortable: false,
        },
      ]
      if (this.hidePrice) {
        result.splice(
          result.findIndex(({ value }) => value === 'price'),
          1
        )
      }
      return result
    },
  },
}
</script>

<template>
  <g-data-table v-bind="$attrs" :headers="headers" v-on="$listeners">
    <template #[`item.itemId`]="{ item }">
      <v-icon v-if="item.id === editKey" small color="primary"
        >mdi-check</v-icon
      >
      {{ $store.getters[`Items/get`](item.itemId).abbr }}
    </template>
    <template #[`item.unitId`]="{ item }">
      {{ $store.getters[`Units/get`](item.unitId).abbr }}
    </template>
    <template #[`item.price`]="{ item }">
      {{ `${(item.price || 0).toFixed(2)} 円` }}
    </template>
    <template #[`item.convertWeight`]="{ item }">
      {{ `${(item.convertWeight || 0).toFixed(2)} kg` }}
    </template>
  </g-data-table>
</template>

<style></style>
