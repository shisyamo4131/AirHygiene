<script>
import { where } from 'firebase/firestore'
import ACollectionController from '../atoms/ACollectionController.vue'
import GBtnRegistIcon from '../molecules/btns/GBtnRegistIcon.vue'
import GActionCardSimpleCustomer from '../molecules/cards/GActionCardSimpleCustomer.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCustomer from '../molecules/inputs/GInputCustomer.vue'
import GDataIterator from '../molecules/tables/GDataIterator.vue'
import GTemplateIndexPage from './GTemplateIndexPage.vue'
export default {
  components: {
    ACollectionController,
    GTemplateIndexPage,
    GDialogEditor,
    GInputCustomer,
    GDataIterator,
    GActionCardSimpleCustomer,
    GBtnRegistIcon,
  },
  data() {
    return {
      items: [],
      lazySearch: null,
      listener: this.$Customer(),
      model: this.$Customer(),
      search: null,
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
  <a-collection-controller
    v-slot="{ dialog, editor, table, pagination }"
    :actions="['edit', 'delete', 'detail']"
    :dialog-props="{ maxWidth: 600 }"
    :items="items"
    label="取引先"
    :model="model"
    :table-props="{
      cols: { cols: 12, md: 6, lg: 4, xl: 3 },
      sortBy: 'code',
    }"
    @click:detail="$router.push(`/customers/${$event.docId}`)"
  >
    <g-template-index-page
      :search.sync="search"
      :pagination="pagination"
      :lazy-search.sync="lazySearch"
    >
      <template #append-search>
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <template #form>
            <g-input-customer v-bind="editor.attrs" v-on="editor.on" />
          </template>
        </g-dialog-editor>
      </template>
      <g-data-iterator
        :no-data-text="noDataText"
        v-bind="table.attrs"
        v-on="table.on"
      >
        <template #col="{ attrs, on }">
          <g-action-card-simple-customer v-bind="attrs" outlined v-on="on" />
        </template>
      </g-data-iterator>
    </g-template-index-page>
  </a-collection-controller>
</template>

<style></style>
