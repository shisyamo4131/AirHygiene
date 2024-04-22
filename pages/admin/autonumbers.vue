<script>
import { orderBy } from 'firebase/firestore'
import GCollectionControllerAutonumbers from '~/components/molecules/controllers/GCollectionControllerAutonumbers.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
export default {
  components: {
    GCollectionControllerAutonumbers,
    GDataTable,
  },
  asyncData({ app }) {
    const listener = app.$Autonumber()
    const items = listener.subscribe(undefined, [orderBy('collectionId')])
    return { listener, items }
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-collection-controller-autonumbers
    :items="items"
    :actions="['edit', 'delete']"
    :table-props="{
      'disable-sort': true,
      headers: [
        { text: 'コレクション名', value: 'collectionId' },
        { text: 'フィールド', value: 'field' },
        { text: '現在値', value: 'current' },
        { text: '桁数', value: 'length' },
        { text: '状態', value: 'status' },
      ],
    }"
  >
    <template #table="{ attrs, on }">
      <g-data-table v-bind="attrs" v-on="on" />
    </template>
  </g-collection-controller-autonumbers>
</template>

<style></style>
