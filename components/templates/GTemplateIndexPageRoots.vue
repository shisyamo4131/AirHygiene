<script>
import GInputRoot from '../molecules/inputs/GInputRoot.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    GTemplateIndexPage,
    GDataTable,
    GInputRoot,
  },
  data() {
    return {
      items: [],
      model: this.$Root(),
      listener: this.$Root(),
      search: null,
    }
  },
  mounted() {
    this.items = this.listener.subscribe()
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-template-index-page
    :actions="['edit', 'delete', 'detail']"
    :dialog-props="{ maxWidth: 480 }"
    :items="items"
    label="ルート"
    :model="model"
    :search.sync="search"
    :table-props="{
      headers: [
        { text: 'CODE', value: 'code' },
        { text: 'ルート名', value: 'name', sortable: false },
        {
          text: '日',
          value: 'sun.length',
          align: 'right',
          sortable: false,
        },
        {
          text: '月',
          value: 'mon.length',
          align: 'right',
          sortable: false,
        },
        {
          text: '火',
          value: 'tue.length',
          align: 'right',
          sortable: false,
        },
        {
          text: '水',
          value: 'wed.length',
          align: 'right',
          sortable: false,
        },
        {
          text: '木',
          value: 'thu.length',
          align: 'right',
          sortable: false,
        },
        {
          text: '金',
          value: 'fri.length',
          align: 'right',
          sortable: false,
        },
        {
          text: '土',
          value: 'sat.length',
          align: 'right',
          sortable: false,
        },
      ],
      sortBy: 'code',
    }"
    @click:detail="$router.push(`/roots/${$event.docId}`)"
  >
    <template #form="{ attrs, on }">
      <g-input-root v-bind="attrs" v-on="on" />
    </template>
    <template #table="{ attrs, on }">
      <g-data-table v-bind="attrs" :search="search" v-on="on" />
    </template>
  </g-template-index-page>
</template>

<style></style>
