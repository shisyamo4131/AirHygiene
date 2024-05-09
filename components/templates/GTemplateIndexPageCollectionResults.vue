<script>
import { where } from 'firebase/firestore'
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCollectionResult from '../molecules/inputs/GInputCollectionResult.vue'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GAutocompleteSite from '../molecules/inputs/GAutocompleteSite.vue'
import GDate from '../molecules/inputs/GDate.vue'
import GTextField from '../molecules/inputs/GTextField.vue'
import GAutocompleteItem from '../molecules/inputs/GAutocompleteItem.vue'
import GSelect from '../molecules/inputs/GSelect.vue'
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
    GDate,
    GTextField,
    GAutocompleteItem,
    GSelect,
  },
  data() {
    return {
      items: [],
      listener: this.$CollectionResult(),
      model: this.$CollectionResult(),
      search: null,
      searchBox: false,
      searchItemId: null,
      searchResultType: null,
      selectedMonth: this.$dayjs().format('YYYY-MM'),
      selectedSite: null,
    }
  },
  computed: {
    computedItems() {
      return this.items.filter((item) => {
        const resultTypeIsMatch = !this.searchResultType
          ? true
          : item.resultType === this.searchResultType
        const itemIsMatch = !this.searchItemId
          ? true
          : item.itemId === this.searchItemId
        return resultTypeIsMatch && itemIsMatch
      })
    },
  },
  watch: {
    searchBox(v) {
      if (v) return
      this.searchResultType = null
      this.searchItemId = null
    },
    selectedSite: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.subscribe()
      },
    },
    selectedMonth: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.subscribe()
      },
      immediate: true,
    },
  },
  destroyed() {
    this.listener.unsubscribe()
  },
  methods: {
    subscribe() {
      const month = this.selectedMonth
      const siteId = this.selectedSite
      if (!month || !siteId) return
      this.model = this.$CollectionResult(siteId, { siteId })
      this.listener = this.$CollectionResult(siteId)
      this.items = this.listener.subscribe(undefined, [
        where('dateObj.year', '==', parseInt(month.substring(0, 4))),
        where('dateObj.month', '==', parseInt(month.substring(6, 8))),
      ])
    },
  },
}
</script>

<template>
  <a-collection-controller
    v-slot="{ dialog, editor, table, pagination }"
    :actions="['edit', 'delete']"
    :dialog-props="{ maxWidth: 600 }"
    :items="computedItems"
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
        <g-date
          v-model="selectedMonth"
          hide-details
          label="回収年月"
          picker-only
          :picker-props="{ type: 'month' }"
        >
          <template #activator="{ attrs, on }">
            <g-text-field
              v-bind="attrs"
              style="max-width: 132px; min-width: 132px"
              v-on="on"
            >
              <template #prepend-inner>
                <v-icon>mdi-calendar</v-icon>
              </template>
            </g-text-field>
          </template>
        </g-date>
        <v-divider vertical class="mx-3" />
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
        <v-divider vertical class="mx-1" />
        <v-btn icon @click="searchBox = !searchBox">
          <v-icon color="primary">
            {{ `mdi-magnify-${searchBox ? 'minus' : 'plus'}-outline` }}
          </v-icon>
        </v-btn>
      </template>
      <v-expand-transition>
        <v-sheet v-show="searchBox" outlined class="pa-3" rounded>
          <v-row>
            <v-col cols="12" md="6">
              <g-select
                v-model="searchResultType"
                label="回収区分"
                :items="$COLLECTION_RESULT_TYPE_ARRAY"
                hide-details
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <g-autocomplete-item
                v-model="searchItemId"
                label="回収品目"
                hide-details
                clearable
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
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
