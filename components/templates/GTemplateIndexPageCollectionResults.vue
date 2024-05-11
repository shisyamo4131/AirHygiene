<script>
import { where } from 'firebase/firestore'
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
    GTemplateIndexPage,
    GInputCollectionResult,
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
  <g-template-index-page
    :actions="['edit', 'delete']"
    :deduct-height="!searchBox ? 0 : $vuetify.breakpoint.sm ? 56 : 64"
    :dialog-props="{ maxWidth: 600 }"
    :disable-regist="!selectedSite"
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
    :search.sync="search"
  >
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
        style="max-width: 360px; width: 360px"
        label="排出場所"
        hide-details
      />
    </template>
    <template #append-search>
      <v-divider vertical class="mx-1" />
      <v-btn icon @click="searchBox = !searchBox">
        <v-icon color="primary">
          {{ `mdi-magnify-${searchBox ? 'minus' : 'plus'}-outline` }}
        </v-icon>
      </v-btn>
    </template>
    <template #form="{ attrs, on }">
      <g-input-collection-result v-bind="attrs" v-on="on" />
    </template>
    <template #append-search-bar>
      <v-expand-transition>
        <v-toolbar v-show="searchBox" flat>
          <v-row>
            <v-col cols="6">
              <g-select
                v-model="searchResultType"
                label="回収区分"
                :items="$COLLECTION_RESULT_TYPE_ARRAY"
                hide-details
                clearable
              />
            </v-col>
            <v-col cols="6">
              <g-autocomplete-item
                v-model="searchItemId"
                label="回収品目"
                hide-details
                clearable
              />
            </v-col>
          </v-row>
        </v-toolbar>
      </v-expand-transition>
    </template>
    <template #table="{ attrs, on }">
      <g-data-table v-bind="attrs" v-on="on">
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
    </template>
  </g-template-index-page>
</template>

<style></style>
