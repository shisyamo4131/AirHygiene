<script>
import GInputItem from '../molecules/inputs/GInputItem.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTemplateIndexPage,
    GInputItem,
    GDataTable,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: this.$store.state.Items.items,
      model: this.$Item(),
      search: null,
    }
  },
}
</script>

<template>
  <g-template-index-page
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 480 }"
    :items="items"
    label="回収品目"
    :model="model"
    :search.sync="search"
    :table-props="{
      'group-by': 'group',
      headers: [
        { text: 'CODE', value: 'code', groupable: false },
        { text: '品目名', value: 'name', groupable: false },
        { text: '種別', value: 'group' },
      ],
      search,
      'sort-by': 'code',
    }"
  >
    <template #form>
      <g-input-item v-bind.sync="model" />
    </template>
    <template #table="{ attrs, on }">
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
    </template>
  </g-template-index-page>
</template>

<style></style>
