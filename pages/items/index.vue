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
      'group-by': 'group',
      headers: [
        { text: 'CODE', value: 'code', groupable: false },
        { text: '品目名', value: 'name', groupable: false },
        { text: '種別', value: 'group' },
      ],
      'sort-by': 'code',
    }"
  >
    <template #table="{ attrs, on }">
      <v-container fluid>
        <g-data-table v-bind="attrs" v-on="on">
          <template #[`group.header`]="{ headers, group, toggle, isOpen }">
            <td :colspan="headers.length" class="text-start">
              <v-btn icon small @click="toggle">
                <v-icon>{{ `mdi-chevron-${isOpen ? 'up' : 'down'}` }}</v-icon>
              </v-btn>
              {{ $ITEM_GROUP[group] }}
            </td>
          </template>
          <template #[`item.group`]="{ item }">
            {{ $ITEM_GROUP[item.group] }}
          </template>
        </g-data-table>
      </v-container>
    </template>
  </g-collection-controller-items>
</template>

<style></style>
