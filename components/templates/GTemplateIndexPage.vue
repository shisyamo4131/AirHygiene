<script>
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
export default {
  components: { GTextFieldSearch },
  props: {
    search: { type: undefined, default: undefined, required: false },
    lazySearch: { type: undefined, default: undefined, required: false },
  },
}
</script>

<template>
  <div>
    <v-toolbar style="position: sticky; top: 48px; z-index: 2">
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
  </div>
</template>

<style></style>
