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
    deductHeight: {
      type: [String, Number],
      default: undefined,
      required: false,
    },
    hidePagination: { type: Boolean, default: false, required: false },
    lazySearch: { type: undefined, default: undefined, required: false },
    page: { type: Number, default: 1, required: false },
    pageCount: { type: Number, default: 0, required: false },
    pagination: {
      type: Object,
      default: () => defaultPagination,
      required: false,
    },
    search: { type: undefined, default: undefined, required: false },
  },
  computed: {
    height() {
      const vMain = this.$vuetify.breakpoint.height
      // get height of application parts.
      const appParts = [
        this.$vuetify.application.top,
        this.$vuetify.application.bar,
        this.$vuetify.application.footer,
        this.$vuetify.application.bottom,
      ]
      // get height of template parts.
      const toolbar = this.$vuetify.breakpoint.mobile ? 56 : 64
      const pagination = 56
      const padding = 24
      const deduct = this.deductHeight ? parseInt(this.deductHeight) : 0
      const tempParts = [padding, toolbar, pagination, deduct]
      const result = [...appParts, ...tempParts].reduce(
        (sum, i) => (sum -= i),
        vMain
      )
      return result
    },
  },
}
</script>

<template>
  <div>
    <v-toolbar style="position: sticky; top: 48px; z-index: 3" flat>
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
      <slot name="default" v-bind="{ height }" />
    </v-container>
    <v-footer v-if="!hidePagination" app inset>
      <g-pagination v-bind="pagination.attrs" v-on="pagination.on" />
    </v-footer>
  </div>
</template>

<style></style>
