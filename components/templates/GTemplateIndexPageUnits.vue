<script>
import GInputUnit from '../molecules/inputs/GInputUnit.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    GTemplateIndexPage,
    GInputUnit,
    GDataTable,
  },
  data() {
    return {
      items: this.$store.state.Units.items,
      model: this.$Unit(),
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
    label="回収単位"
    :model="model"
    :table-props="{
      headers: [
        { text: 'CODE', value: 'code', groupable: false },
        { text: '単位', value: 'name', groupable: false },
        { text: '略称', value: 'abbr', groupable: false },
      ],
      'sort-by': 'code',
    }"
  >
    <template #form="{ attrs, on }">
      <g-input-unit v-bind="attrs" v-on="on" />
    </template>
    <template #table="{ attrs, on }">
      <g-data-table v-bind="attrs" :search="search" v-on="on" />
    </template>
  </g-template-index-page>
</template>

<style></style>
