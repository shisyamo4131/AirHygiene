<script>
import { orderBy } from 'firebase/firestore'
import GInputAutonumber from '../molecules/inputs/GInputAutonumber.vue'
import GDataTableAutonumber from '../molecules/tables/GDataTableAutonumber.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  /***************************************************************************
   * COMPONETS
   ***************************************************************************/
  components: {
    GTemplateIndexPage,
    GInputAutonumber,
    GDataTableAutonumber,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [],
      model: this.$Autonumber(),
      listener: this.$Autonumber(),
      search: null,
    }
  },
  /***************************************************************************
   * MOUNTED
   ***************************************************************************/
  mounted() {
    this.items = this.listener.subscribe(undefined, [orderBy('collectionId')])
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
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
    :table-props="{ search: search }"
  >
    <template #form="{ ref }">
      <g-input-autonumber :ref="ref" />
    </template>
    <template #table="{ attrs, on }">
      <g-data-table-autonumber v-bind="attrs" v-on="on" />
    </template>
  </g-template-index-page>
</template>

<style></style>
