<script>
import { where } from 'firebase/firestore'
import GActionCardSimpleCustomer from '../molecules/cards/GActionCardSimpleCustomer.vue'
import GDataIterator from '../molecules/tables/GDataIterator.vue'
import GInputCustomer from '../molecules/inputs/GInputCustomer.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    GTemplateIndexPage,
    GDataIterator,
    GActionCardSimpleCustomer,
    GInputCustomer,
  },
  data() {
    return {
      items: [],
      lazySearch: null,
      listener: this.$Customer(),
      model: this.$Customer(),
    }
  },
  computed: {
    noDataText() {
      if (this.lazySearch) {
        return '該当するデータがありません。'
      } else {
        return 'お気に入りに登録されているデータがありません。'
      }
    },
  },
  watch: {
    lazySearch: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) this.subscribe()
      },
      immediate: true,
    },
  },
  destroyed() {
    this.listener.unsubscribe()
  },
  methods: {
    subscribe() {
      if (!this.lazySearch) {
        this.items = this.listener.subscribe(undefined, [
          where('favorite', '==', true),
        ])
      } else {
        this.items = this.listener.subscribe(this.lazySearch)
      }
    },
  },
}
</script>

<template>
  <g-template-index-page
    :dialog-props="{ maxWidth: 600 }"
    :items="items"
    label="取引先"
    :model="model"
    :table-props="{
      cols: { cols: 12, md: 6, lg: 4, xl: 3 },
      sortBy: 'code',
    }"
    :lazy-search.sync="lazySearch"
    @click:detail="$router.push(`/customers/${$event.docId}`)"
  >
    <template #form="{ attrs, on }">
      <g-input-customer v-bind="attrs" v-on="on" />
    </template>
    <template #table="{ attrs, on }">
      <g-data-iterator :no-data-text="noDataText" v-bind="attrs" v-on="on">
        <template #col="colProps">
          <g-action-card-simple-customer
            v-bind="colProps.attrs"
            outlined
            v-on="colProps.on"
          />
        </template>
      </g-data-iterator>
    </template>
  </g-template-index-page>
</template>

<style></style>
