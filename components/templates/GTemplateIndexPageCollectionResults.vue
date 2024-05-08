<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCollectionResult from '../molecules/inputs/GInputCollectionResult.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GAutocompleteSite from '../molecules/inputs/GAutocompleteSite.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    ACollectionController,
    GTemplateIndexPage,
    GDialogEditor,
    GInputCollectionResult,
    GBtnRegistIcon,
    GDataTable,
    GAutocompleteSite,
  },
  data() {
    return {
      items: [],
      listener: this.$CollectionResult(),
      model: this.$CollectionResult(),
      search: null,
      selectedSite: null,
    }
  },
  watch: {
    selectedSite: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.listener.unsubscribe()
        if (!newVal) return
        this.model = this.$CollectionResult(newVal, { siteId: newVal })
        this.listener = this.$CollectionResult(newVal)
        this.items = this.listener.subscribe()
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
    v-slot="{ dialog, editor, table, pagination }"
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 600 }"
    :items="items"
    label="回収実績"
    :model="model"
    :table-props="{
      headers: [
        { text: '回収日', value: 'date' },
        { text: '回収区分', value: 'resultType' },
        { text: '回収品目', value: 'itemId' },
        { text: '数量', value: 'amountString' },
        {
          text: '単価',
          value: 'unitPriceString',
          sortable: false,
          align: 'right',
        },
        { text: '金額', value: 'priceString', sortable: false, align: 'right' },
        {
          text: '重量',
          value: 'convertedWeightString',
          sortable: false,
          align: 'right',
        },
      ],
      sortBy: 'date',
      sortDesc: true,
    }"
  >
    <g-template-index-page :search.sync="search" :pagination="pagination">
      <template #search>
        <g-autocomplete-site
          v-model="selectedSite"
          label="排出場所"
          hide-details
        />
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon
              v-bind="attrs"
              :disabled="!selectedSite"
              v-on="on"
            />
          </template>
          <template #form>
            <g-input-collection-result v-bind="editor.attrs" v-on="editor.on" />
          </template>
        </g-dialog-editor>
      </template>
      <g-data-table v-bind="table.attrs" v-on="table.on">
        <template #[`item.resultType`]="{ item }">
          {{ $COLLECTION_RESULT_TYPE[item.resultType] }}
        </template>
        <template #[`item.itemId`]="{ item }">
          {{ $store.getters['Items/get'](item.itemId).abbr }}
        </template>
        <template #[`item.amountString`]="{ item }">
          {{ item.amountString }}
          {{ $store.getters['Units/get'](item.unitId).abbr }}
        </template>
        <template #[`item.unitPriceString`]="{ item }">
          {{ `${item.unitPriceString} 円` }}
        </template>
        <template #[`item.priceString`]="{ item }">
          {{ `${item.priceString} 円` }}
        </template>
        <template #[`item.convertedWeightString`]="{ item }">
          {{ `${item.convertedWeightString} kg` }}
        </template>
      </g-data-table>
    </g-template-index-page>
  </a-collection-controller>
</template>

<style></style>
