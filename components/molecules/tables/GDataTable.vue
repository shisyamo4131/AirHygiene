<script>
import AIconDelete from '~/components/atoms/icons/AIconDelete.vue'
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
import AIconDetail from '~/components/atoms/icons/AIconDetail.vue'
/**
 * ## GDataTable
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    ADataTable,
    AIconDelete,
    AIconEdit,
    AIconDetail,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: { type: Array, default: () => [], required: false },
    headers: { type: Array, default: () => [], required: false },
    height: { type: [Number, String], default: undefined, required: false },
    hidePagination: { type: Boolean, default: false, required: false },
    itemsPerPage: { type: Number, default: 10, required: false },
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
    internalHeaders() {
      const actionColumn = {
        text: '',
        value: 'actions',
        sortable: false,
        align: 'right',
      }
      const result = this.headers.map((item) => item)
      if (this.actions.length) result.push(actionColumn)
      return result
    },
    internalHeight() {
      if (!this.height) return undefined
      const result = parseInt(this.height) - this.paginationHeight
      return result <= 0 ? undefined : result
    },
    internalItemsPerPage() {
      if (this.hidePagination) return -1
      return this.itemsPerPage
    },
    paginationHeight() {
      if (this.hidePagination) return 0
      return 76
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    page() {
      this.scrollToTop()
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    scrollToTop() {
      const wrapper = this.$el.querySelector('div.v-data-table__wrapper')
      this.$vuetify.goTo(this, { container: wrapper })
    },
  },
}
</script>

<template>
  <a-data-table
    v-bind="$attrs"
    fixed-header
    :headers="internalHeaders"
    :height="internalHeight"
    hide-default-footer
    :items-per-page="internalItemsPerPage"
    :page.sync="page"
    @page-count="pageCount = $event"
    v-on="$listeners"
  >
    <!-- ### SLOTS ### -->
    <!-- Provides all slots of ADataTable. -->
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <!-- ### ACTIONS COLUMN ### -->
    <template #[`item.actions`]="props">
      <slot name="item.actions" v-bind="props">
        <v-btn
          v-if="actions.includes('edit')"
          icon
          @click="$emit('click:edit', props.item)"
        >
          <a-icon-edit />
        </v-btn>
        <v-btn
          v-if="actions.includes('delete')"
          icon
          @click="$emit('click:delete', props.item)"
        >
          <a-icon-delete />
        </v-btn>
        <v-btn
          v-if="actions.includes('detail')"
          icon
          @click="$emit('click:detail', props.item)"
        >
          <a-icon-detail />
        </v-btn>
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
  </a-data-table>
</template>

<style></style>
