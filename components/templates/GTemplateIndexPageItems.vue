<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputItem from '../molecules/inputs/GInputItem.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    ACollectionController,
    GTemplateIndexPage,
    GDialogEditor,
    GInputItem,
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
    v-slot="{ dialog, model, table }"
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 480 }"
    :items="items"
    label="回収品目"
    model-id="Item"
    :table-props="{
      'hide-pagination': true,
      'group-by': 'group',
      headers: [
        { text: 'CODE', value: 'code', groupable: false },
        { text: '品目名', value: 'name', groupable: false },
        { text: '種別', value: 'group' },
      ],
      'sort-by': 'code',
    }"
  >
    <g-template-index-page
      v-bind="$attrs"
      :search.sync="search"
      v-on="$listeners"
    >
      <template #append-search>
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <template #form>
            <g-input-item v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </template>
      <g-data-table v-bind="table.attrs" :search="search" v-on="table.on">
        <template #[`group.header`]="{ headers, group, toggle, isOpen }">
          <td :colspan="headers.length" class="text-start">
            <v-btn icon small @click="toggle">
              <v-icon>{{ `mdi-chevron-${isOpen ? 'up' : 'down'}` }}</v-icon>
            </v-btn>
            {{ $ITEM_GROUP[group] }}
          </td>
        </template>
        <template #[`item.group`]="{ item }">
          {{ $ITEM_GROUP[item.group] }}
        </template>
      </g-data-table>
    </g-template-index-page>
  </a-collection-controller>
</template>

<style></style>
