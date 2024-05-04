<script>
import { orderBy } from 'firebase/firestore'
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputAutonumber from '../molecules/inputs/GInputAutonumber.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    ACollectionController,
    GTemplateIndexPage,
    GDialogEditor,
    GDataTable,
    GInputAutonumber,
    GBtnRegistIcon,
  },
  data() {
    return {
      items: [],
      model: this.$Autonumber(),
      listener: this.$Autonumber(),
      search: null,
    }
  },
  mounted() {
    this.items = this.listener.subscribe(undefined, [orderBy('collectionId')])
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <a-collection-controller
    v-slot="{ dialog, editor, table, pagination }"
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 480 }"
    :items="items"
    label="自動採番"
    :model="model"
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
    <g-template-index-page :pagination="pagination">
      <template #append-search>
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <template #form>
            <g-input-autonumber v-bind="editor.attrs" v-on="editor.on" />
          </template>
        </g-dialog-editor>
      </template>
      <g-data-table v-bind="table.attrs" :search="search" v-on="table.on">
      </g-data-table>
    </g-template-index-page>
  </a-collection-controller>
</template>

<style></style>
