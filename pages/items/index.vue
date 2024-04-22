<script>
import GCollectionControllerItems from '~/components/molecules/controllers/GCollectionControllerItems.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
export default {
  components: {
    GCollectionControllerItems,
    GDataTable,
  },
  asyncData({ app }) {
    const listener = app.$Item()
    const items = listener.subscribe()
    return { listener, items }
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-collection-controller-items
    :items="items"
    :actions="['edit', 'delete']"
    :table-props="{
      'hide-pagination': true,
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '品目名', value: 'name' },
        { text: '種別', value: 'type' },
      ],
      'sort-by': 'code',
    }"
  >
    <template #table="{ attrs, on }">
      <g-data-table v-bind="attrs" v-on="on">
        <template #[`item.type`]="{ item }">
          {{ $ITEM_TYPE[item.type] }}
        </template>
      </g-data-table>
    </template>
  </g-collection-controller-items>
</template>

<style></style>
