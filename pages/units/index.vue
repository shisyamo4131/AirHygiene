<script>
import GCollectionControllerUnits from '~/components/molecules/controllers/GCollectionControllerUnits.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
export default {
  components: {
    GCollectionControllerUnits,
    GDataTable,
  },
  asyncData({ app }) {
    const listener = app.$Unit()
    const items = listener.subscribe()
    return { listener, items }
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-collection-controller-units
    :items="items"
    :actions="['edit', 'delete']"
    :table-props="{
      'hide-pagination': true,
      headers: [
        { text: 'CODE', value: 'code', groupable: false },
        { text: '単位', value: 'name', groupable: false },
        { text: '略称', value: 'abbr', groupable: false },
      ],
      'sort-by': 'code',
    }"
  >
    <template #table="{ attrs, on }">
      <v-container fluid>
        <g-data-table v-bind="attrs" v-on="on"> </g-data-table>
      </v-container>
    </template>
  </g-collection-controller-units>
</template>

<style></style>
