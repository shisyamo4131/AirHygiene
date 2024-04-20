<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: { type: Array, default: () => [], required: false },
    cols: { type: Object, default: () => ({}), required: false },
    colProps: { type: Object, default: () => ({}), required: false },
    hidePagination: { type: Boolean, default: false, required: false },
    hideSearch: { type: Boolean, default: false, required: false },
    itemsPerPage: { type: Number, default: 5, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      page: 1,
      pageCount: 0,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    colOn() {
      return {
        'click:edit': (item) => this.$emit('click:edit', item),
        'click:delete': (item) => this.$emit('click:delete', item),
        'click:detail': (item) => this.$emit('click:detail', item),
      }
    },
  },
}
</script>

<template>
  <v-data-iterator
    v-bind="$attrs"
    hide-default-footer
    :items-per-page="hidePagination ? -1 : itemsPerPage"
    :page.sync="page"
    @page-count="pageCount = $event"
    v-on="$listeners"
  >
    <template #default="props">
      <slot name="default" v-bind="{ ...props, actions }">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item, index) of props.items"
              :key="index"
              v-bind="cols"
            >
              <slot
                name="col"
                v-bind="{ attrs: { item, actions }, on: colOn }"
              />
            </v-col>
          </v-row>
        </v-container>
      </slot>
    </template>
    <!-- ### FOOTER ### -->
    <!-- Show pagination if 'hidePagination' prop is false. -->
    <template v-if="!hidePagination" #footer="props">
      <slot name="footer" v-bind="props">
        <v-container fluid style="height: 76px">
          <v-row justify="center" dense>
            <v-col cols="11">
              <v-pagination v-model="page" :length="pageCount" />
            </v-col>
          </v-row>
        </v-container>
      </slot>
    </template>
  </v-data-iterator>
</template>

<style></style>
