<script>
import { where } from 'firebase/firestore'
import ACollectionController from '~/components/atoms/ACollectionController.vue'
import GBtnRegistIcon from '~/components/molecules/btns/GBtnRegistIcon.vue'
import GInputSite from '~/components/molecules/inputs/GInputSite.vue'
import GTextFieldSearch from '~/components/molecules/inputs/GTextFieldSearch.vue'
import GPagination from '~/components/molecules/paginations/GPagination.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GChipSiteStatus from '~/components/molecules/chips/GChipSiteStatus.vue'
import GSwitch from '~/components/molecules/inputs/GSwitch.vue'
import GEditCard from '~/components/molecules/cards/GEditCard.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDataTable,
    GInputSite,
    GBtnRegistIcon,
    GPagination,
    GChipSiteStatus,
    GSwitch,
    GEditCard,
  },
  props: {
    actions: {
      type: Array,
      default: () => ['edit', 'delete', 'detail'],
    },
    customerId: { type: String, required: true },
    dialogProps: {
      type: Object,
      default: () => ({ maxWidth: 600 }),
      required: false,
    },
    tableProps: {
      type: Object,
      default: () => ({
        headers: [
          { text: 'CODE', value: 'code' },
          { text: '名称', value: 'name', sortable: false },
          {
            text: '状態',
            value: 'status',
            sortable: false,
            filterable: false,
            align: 'center',
          },
        ],
        sortBy: 'code',
      }),
    },
  },
  data() {
    return {
      // items: [],
      items: {
        active: [],
        noActive: [],
      },
      model: this.$Site(),
      // listener: this.$Site(),
      listener: {
        active: this.$Site(),
        noActive: this.$Site(),
      },
      onlyActive: true,
      search: null,
    }
  },
  computed: {
    internalItems() {
      const result = this.items.active.concat(this.items.noActive)
      return result
    },
  },
  watch: {
    customerId: {
      handler(v) {
        this.subscribeActive()
        this.subscribeNoActive()
      },
      immediate: true,
    },
    onlyActive(v) {
      // this.subscribeActive()
      this.subscribeNoActive()
    },
  },
  destroyed() {
    // this.listener.unsubscribe()
    this.listener.active.unsubscribe()
    this.listener.noActive.unsubscribe()
  },
  methods: {
    subscribeActive() {
      this.listener.active.unsubscribe()
      if (!this.customerId) return
      const constraints = [
        where('customerId', '==', this.customerId),
        where('status', '==', 'active'),
      ]
      this.items.active = this.listener.active.subscribe(undefined, constraints)
    },
    subscribeNoActive() {
      this.listener.noActive.unsubscribe()
      if (!this.customerId || this.onlyActive) return
      const constraints = [
        where('customerId', '==', this.customerId),
        where('status', '!=', 'active'),
      ]
      this.items.noActive = this.listener.noActive.subscribe(
        undefined,
        constraints
      )
    },
  },
}
</script>

<template>
  <a-collection-controller
    v-slot="{ card, dialog, editor, form, pagination, table }"
    v-bind="{ ...$props, ...$attrs }"
    :default-item="{ customerId }"
    :items="internalItems"
    label="排出場所"
    :model="model"
    v-on="$listeners"
  >
    <v-card>
      <v-card-title
        >排出場所一覧{{ `（全 ${internalItems.length} 件）` }}</v-card-title
      >
      <v-toolbar dense flat>
        <g-text-field-search v-model="search" />
        <v-dialog v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <g-edit-card v-bind="card.attrs" v-on="card.on">
            <v-form v-bind="form.attrs" v-on="form.on">
              <g-input-site v-bind="editor.attrs" v-on="editor.on" />
            </v-form>
          </g-edit-card>
        </v-dialog>
      </v-toolbar>
      <v-toolbar dense flat class="d-flex justify-end">
        <g-switch v-model="onlyActive" label="契約中のみ表示" hide-details />
      </v-toolbar>
      <v-container>
        <g-data-table v-bind="table.attrs" :search="search" v-on="table.on">
          <template #[`item.status`]="{ item }">
            <g-chip-site-status :value="item.status" x-small />
          </template>
        </g-data-table>
      </v-container>
      <g-pagination v-bind="pagination.attrs" v-on="pagination.on" />
    </v-card>
  </a-collection-controller>
</template>

<style></style>
