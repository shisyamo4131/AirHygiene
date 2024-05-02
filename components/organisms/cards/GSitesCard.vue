<script>
import ACollectionController from '~/components/atoms/ACollectionController.vue'
import GBtnRegistIcon from '~/components/molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputSite from '~/components/molecules/inputs/GInputSite.vue'
import GTextFieldSearch from '~/components/molecules/inputs/GTextFieldSearch.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDataTable,
    GDialogEditor,
    GInputSite,
    GBtnRegistIcon,
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
          { text: '名称', value: 'name' },
        ],
        sortBy: 'code',
      }),
    },
  },
  data() {
    return {
      items: [],
      listener: this.$Site(),
      search: null,
    }
  },
  watch: {
    customerId: {
      handler(v) {
        if (v) {
          this.listener = this.$Site()
          this.items = this.listener.subscribe()
        }
        if (!v) this.listener.unsubscribe()
      },
      immediate: true,
    },
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <a-collection-controller
    v-slot="{ dialog, model, table }"
    v-bind="{ ...$props, ...$attrs }"
    :default-item="{ customerId }"
    :items="items"
    label="排出場所"
    model-id="Site"
    v-on="$listeners"
  >
    <v-card>
      <v-card-title>排出場所一覧</v-card-title>
      <v-toolbar dense flat>
        <g-text-field-search v-model="search" />
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <template #form>
            <g-input-site v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <v-container>
        <g-data-table v-bind="table.attrs" :search="search" v-on="table.on" />
      </v-container>
    </v-card>
  </a-collection-controller>
</template>

<style></style>
