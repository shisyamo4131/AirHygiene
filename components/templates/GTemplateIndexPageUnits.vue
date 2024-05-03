<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputUnit from '../molecules/inputs/GInputUnit.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    ACollectionController,
    GTemplateIndexPage,
    GDialogEditor,
    GInputUnit,
    GDataTable,
    GBtnRegistIcon,
  },
  props: {
    items: { type: Array, default: () => [], required: false },
  },
  data() {
    return {
      search: null,
    }
  },
}
</script>

<template>
  <a-collection-controller
    v-slot="{ dialog, model, table, pagination }"
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 480 }"
    :items="items"
    label="回収単位"
    :model="$Unit()"
    :table-props="{
      headers: [
        { text: 'CODE', value: 'code', groupable: false },
        { text: '単位', value: 'name', groupable: false },
        { text: '略称', value: 'abbr', groupable: false },
      ],
      'sort-by': 'code',
    }"
  >
    <g-template-index-page :pagination="pagination">
      <template #append-search>
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <template #form>
            <g-input-unit v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </template>
      <g-data-table v-bind="table.attrs" :search="search" v-on="table.on">
      </g-data-table>
    </g-template-index-page>
  </a-collection-controller>
</template>

<style></style>
