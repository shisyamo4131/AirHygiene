<script>
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GPagination from '../molecules/paginations/GPagination.vue'
const defaultPagination = {
  attrs: { length: 0, page: 0 },
  on: {},
}
export default {
  components: { GTextFieldSearch, GPagination },
  props: {
    hidePagination: { type: Boolean, default: false, required: false },
    page: { type: Number, default: 1, required: false },
    pageCount: { type: Number, default: 0, required: false },
    pagination: {
      type: Object,
      default: () => defaultPagination,
      required: false,
    },
    search: { type: undefined, default: undefined, required: false },
    lazySearch: { type: undefined, default: undefined, required: false },
  },
}
</script>

<template>
  <div>
    <v-toolbar style="position: sticky; top: 48px; z-index: 2" flat>
      <slot name="search">
        <g-text-field-search
          :value="search"
          @input="$emit('update:search', $event)"
          @update:lazyValue="$emit('update:lazySearch', $event)"
        />
        <slot name="append-search" />
      </slot>
    </v-toolbar>
    <v-container fluid>
      <slot name="default" />
    </v-container>
    <v-footer v-if="!hidePagination" app inset>
      <g-pagination v-bind="pagination.attrs" v-on="pagination.on" />
    </v-footer>
  </div>
</template>

<style></style>
