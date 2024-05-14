<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GPagination from '../molecules/paginations/GPagination.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextFieldSearch,
    GPagination,
    ACollectionController,
    GDialogEditor,
    GBtnRegistIcon,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    deductHeight: {
      type: [String, Number],
      default: undefined,
      required: false,
    },
    disableRegist: { type: Boolean, default: false, required: false },
    hidePagination: { type: Boolean, default: false, required: false },
    hideRegist: { type: Boolean, default: false, required: false },
    hideSearch: { type: Boolean, default: false, required: false },
    lazySearch: { type: undefined, default: undefined, required: false },
    page: { type: Number, default: 1, required: false },
    pageCount: { type: Number, default: 0, required: false },
    search: { type: undefined, default: undefined, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      internalSearch: null,
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
    searchAttrs() {
      return {
        value: this.internalSearch,
      }
    },
    searchOn() {
      return {
        input: ($event) => (this.internalSearch = $event),
        'update:lazyValule': ($event) =>
          this.$emit('update:lazySearch', $event),
      }
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    internalSearch: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.$emit('update:search', newVal)
      },
      immediate: true,
    },
    search: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.internalSearch = newVal
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <a-collection-controller
    v-slot="{ dialog, editor, table, pagination }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="prepend-search-bar" />
    <slot name="search-bar">
      <v-toolbar
        v-if="!hideSearch"
        style="position: sticky; top: 48px; z-index: 3"
        flat
      >
        <slot name="prepend-search" />
        <slot name="search" v-bind="{ attrs: searchAttrs, on: searchOn }">
          <g-text-field-search
            v-model="internalSearch"
            @update:lazyValue="$emit('update:lazySearch', $event)"
          />
        </slot>
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon
              v-show="!hideRegist"
              v-bind="attrs"
              :disabled="disableRegist"
              v-on="on"
            />
          </template>
          <template #form>
            <slot name="form" v-bind="{ attrs: editor.attrs, on: editor.on }" />
          </template>
        </g-dialog-editor>
        <slot name="append-search" />
      </v-toolbar>
    </slot>
    <slot name="append-search-bar" />
    <v-container fluid>
      <slot
        name="table"
        v-bind="{ attrs: { ...table.attrs, height }, on: table.on }"
      />
      <slot name="append-table" />
    </v-container>
    <v-footer v-if="!hidePagination" app inset>
      <g-pagination v-bind="pagination.attrs" v-on="pagination.on" />
    </v-footer>
  </a-collection-controller>
</template>

<style></style>
