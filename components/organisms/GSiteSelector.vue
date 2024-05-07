<template>
  <v-card>
    <v-container>
      <g-text-field-search :lazy-value.sync="lazySearch" />
      <g-data-table
        :headers="headers"
        :items="items"
        show-select
        single-select
      />
    </v-container>
  </v-card>
</template>

<script>
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
export default {
  components: { GDataTable, GTextFieldSearch },
  data() {
    return {
      headers: [{ text: 'CODE', value: 'code' }],
      items: [],
      lazySearch: null,
      listener: this.$Site(),
    }
  },
  watch: {
    lazySearch: {
      handler(v) {
        if (v) {
          this.items = this.listener.subscribe(v)
        } else {
          this.listener.unsubscribe()
        }
      },
      immediate: true,
    },
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<style></style>
