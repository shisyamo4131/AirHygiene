<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputAutonumber from '../molecules/inputs/GInputAutonumber.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDialogEditor,
    AIconRegist,
    GInputAutonumber,
    GDataTable,
  },
  props: {
    label: { type: String, default: '自動採番', required: false },
    dialogProps: {
      type: Object,
      default: () => ({ 'max-width': 600 }),
      required: false,
    },
  },
}
</script>

<template>
  <a-collection-controller
    v-bind="{ ...$attrs, ...$props }"
    model-id="Autonumber"
    :table-props="{
      'disable-sort': true,
      headers: [
        { text: 'コレクション名', value: 'collectionId' },
        { text: 'フィールド', value: 'field' },
        { text: '現在値', value: 'current' },
        { text: '桁数', value: 'length' },
        { text: '状態', value: 'status' },
      ],
    }"
  >
    <template #default="{ dialog, table, model, search }">
      <v-toolbar dense flat>
        <g-text-field-search v-bind="search.attrs" v-on="search.on" />
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" icon v-on="on">
              <a-icon-regist />
            </v-btn>
          </template>
          <template #form>
            <g-input-autonumber v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <g-data-table v-bind="table.attrs" v-on="table.on" />
    </template>
  </a-collection-controller>
</template>

<style></style>
