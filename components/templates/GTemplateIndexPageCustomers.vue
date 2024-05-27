<script>
import { where } from 'firebase/firestore'
import GInputCustomer from '../molecules/inputs/GInputCustomer.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  /***************************************************************************
   * COMPONETS
   ***************************************************************************/
  components: {
    GTemplateIndexPage,
    GInputCustomer,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [],
      lazySearch: null,
      loading: false,
      model: this.$Customer(),
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    noDataText() {
      if (this.lazySearch) {
        return '該当するデータがありません。'
      } else {
        return 'お気に入りに登録されているデータがありません。'
      }
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    lazySearch: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) this.fetchDocs()
      },
      immediate: true,
    },
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {},
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async fetchDocs() {
      this.items.splice(0)
      try {
        this.loading = true
        if (!this.lazySearch) {
          this.items = await this.model.fetchDocs(undefined, [
            where('favorite', '==', true),
          ])
        } else {
          this.items = await this.model.fetchDocs(this.lazySearch)
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    onSubmit(mode) {
      this.$router.push(`/customers/${this.model.docId}`)
    },
  },
}
</script>

<template>
  <g-template-index-page
    :alert="!lazySearch ? 'お気に入りを表示しています。' : null"
    :dialog-props="{ maxWidth: 600 }"
    :items="items"
    label="取引先"
    :lazy-search.sync="lazySearch"
    :model="model"
    :table-props="{
      headers: [
        { text: 'CODE', value: 'code' },
        { text: '取引先名', value: 'abbr' },
      ],
      loading,
      noDataText,
    }"
    @submit:complete="onSubmit"
    @click:detail="$router.push(`/customers/${$event.docId}`)"
  >
    <template #form="{ attrs, on }">
      <g-input-customer v-bind="attrs" v-on="on" />
    </template>
  </g-template-index-page>
</template>

<style></style>
