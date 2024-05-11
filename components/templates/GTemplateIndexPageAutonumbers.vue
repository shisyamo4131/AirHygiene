<script>
import { orderBy } from 'firebase/firestore'
import GInputAutonumber from '../molecules/inputs/GInputAutonumber.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    GTemplateIndexPage,
    GDataTable,
    GInputAutonumber,
  },
  data() {
    return {
      items: [],
      model: this.$Autonumber(),
      listener: this.$Autonumber(),
      search: null,
    }
  },
  mounted() {
    this.items = this.listener.subscribe(undefined, [orderBy('collectionId')])
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-template-index-page
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 480 }"
    :items="items"
    label="自動採番"
    :model="model"
    :search.sync="search"
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
    <template #form="{ attrs, on }">
      <g-input-autonumber v-bind="attrs" v-on="on" />
    </template>
    <template #table="{ attrs, on }">
      <g-data-table v-bind="attrs" :search="search" v-on="on" />
    </template>
  </g-template-index-page>
</template>

<style></style>
