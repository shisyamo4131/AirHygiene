<script>
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GCardEditor from '../molecules/cards/GCardEditor.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GPagination from '../molecules/paginations/GPagination.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextFieldSearch,
    GPagination,
    GBtnRegistIcon,
    GCardEditor,
    GDataTable,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: {
      type: Array,
      default: () => ['detail'],
      validator: (v) =>
        v.every((i) => ['edit', 'delete', 'detail'].includes(i)),
      required: false,
    },
    alert: { type: String, default: undefined, required: false },
    deductHeight: {
      type: [String, Number],
      default: undefined,
      required: false,
    },
    dialogProps: {
      type: Object,
      default: () => ({}),
      required: false,
    },
    disableRegist: { type: Boolean, default: false, required: false },
    hidePagination: { type: Boolean, default: false, required: false },
    hideRegist: { type: Boolean, default: false, required: false },
    hideSearch: { type: Boolean, default: false, required: false },
    items: { type: Array, default: () => [], required: false },
    itemsPerPage: { type: Number, default: 10, required: false },
    label: { type: String, default: '', required: false },
    lazySearch: { type: undefined, default: undefined, required: false },
    model: { type: Object, required: true },
    search: { type: undefined, default: undefined, required: false },
    tableProps: { type: Object, default: () => ({}), required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      dialog: false,
      loading: false,
      internalSearch: null,
      page: 1,
      pageCount: 0,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
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
      const toolbar = this.hideSearch
        ? 0
        : this.$vuetify.breakpoint.sm
        ? 56
        : 64
      const alert = this.alert ? 58 : 0
      const pagination = 56
      const padding = 24
      const deduct = this.deductHeight ? parseInt(this.deductHeight) : 0
      const tempParts = [toolbar, alert, pagination, padding, deduct]
      const result = [...appParts, ...tempParts].reduce(
        (sum, i) => (sum -= i),
        vMain
      )
      return result
    },
    computedSearch: {
      get() {
        return this.internalSearch
      },
      set(v) {
        this.internalSearch = v
        this.$emit('update:search', v)
      },
    },
    formSlot() {
      return {
        attrs: {
          ...structuredClone(this.model),
          editMode: this.editMode,
        },
        on: Object.keys(this.model).reduce((sum, i) => {
          sum[`update:${i}`] = (event) =>
            this.model.initialize({
              ...structuredClone(this.model),
              [i]: event,
            })
          return sum
        }, {}),
      }
    },
    searchSlot() {
      return {
        attrs: {
          value: this.internalSearch,
        },
        on: {
          input: ($event) => (this.computedSearch = $event),
          'update:lazyValue': ($event) =>
            this.$emit('update:lazySearch', $event),
        },
      }
    },
    tableSlot() {
      return {
        attrs: {
          actions: this.actions,
          height: this.height,
          items: this.items,
          page: this.page,
          ...this.tableProps,
        },
        on: {
          'click:edit': this.onClickEdit,
          'click:delete': this.onClickDelete,
          'click:detail': ($event) => {
            this.$emit('click:detail', $event)
          },
          'page-count': ($event) => {
            this.pageCount = $event
          },
          'update:page': ($event) => {
            this.page = $event
          },
        },
      }
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    dialog(v) {
      if (!v) {
        this.model.initialize()
        this.$refs.card.resetValidation()
        this.$refs.card.scrollTo()
        this.editMode = 'REGIST'
      }
    },
    search: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.internalSearch = newVal
      },
      immediate: true,
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    onClickEdit(item) {
      this.model.initialize(item)
      this.editMode = 'UPDATE'
      this.dialog = true
    },
    onClickDelete(item) {
      this.model.initialize(item)
      this.editMode = 'DELETE'
      this.dialog = true
    },
    async onClickSubmit() {
      try {
        this.loading = true
        if (this.editMode === 'REGIST') await this.model.create()
        if (this.editMode === 'UPDATE') await this.model.update()
        if (this.editMode === 'DELETE') await this.model.delete()
        this.dialog = false
        this.$emit('submit:complete', this.editMode)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
        this.$emit('submit:error', this.editMode)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div>
    <v-toolbar
      v-if="!hideSearch"
      style="position: sticky; top: 48px; z-index: 3"
      flat
    >
      <slot name="prepend-search" />
      <slot name="search" v-bind="searchSlot">
        <g-text-field-search v-bind="searchSlot.attrs" v-on="searchSlot.on" />
      </slot>
      <v-dialog
        v-model="dialog"
        v-bind="{ persistent: true, scrollable: true, ...dialogProps }"
      >
        <template #activator="{ attrs, on }">
          <g-btn-regist-icon
            v-show="!hideRegist"
            v-bind="attrs"
            :disabled="disableRegist"
            v-on="on"
          />
        </template>
        <g-card-editor
          ref="card"
          :form-props="{
            disabled: editMode === 'DELETE' || loading,
          }"
          :label="label"
          :loading="loading"
          @click:cancel="dialog = false"
          @click:submit="onClickSubmit"
        >
          <template #default="{ ref }">
            <slot name="form" v-bind="{ ref }" />
          </template>
        </g-card-editor>
      </v-dialog>
      <slot name="append-search" />
    </v-toolbar>
    <v-container fluid>
      <v-expand-transition>
        <v-alert v-show="alert" text type="info" dense outlined>
          {{ alert }}
        </v-alert>
      </v-expand-transition>
      <slot name="table" v-bind="tableSlot">
        <g-data-table v-bind="tableSlot.attrs" v-on="tableSlot.on" />
      </slot>
    </v-container>
    <v-footer v-if="!hidePagination" app inset>
      <g-pagination v-model="page" :length="pageCount" />
    </v-footer>
  </div>
</template>

<style></style>
