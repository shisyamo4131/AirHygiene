<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCustomer from '../molecules/inputs/GInputCustomer.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDialogEditor,
    AIconRegist,
    GDataTable,
    GInputCustomer,
  },
  props: {
    label: { type: String, default: '取引先', required: false },
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
    model-id="Customer"
    :table-props="{
      'disable-sort': true,
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '取引先名', value: 'name' },
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
            <g-input-customer v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <g-data-table v-bind="table.attrs" v-on="table.on">
        <template #[`item.name`]="{ item }">
          <div>{{ item.name1 }}</div>
          <div class="text-caption grey--text text--darken-1">
            {{ item.name2 }}
          </div>
        </template>
      </g-data-table>
    </template>
  </a-collection-controller>
</template>

<style></style>
