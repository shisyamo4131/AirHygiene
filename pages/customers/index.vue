<script>
import GTemplateIndexPageCustomers from '~/components/templates/GTemplateIndexPageCustomers.vue'
export default {
  components: { GTemplateIndexPageCustomers },
  asyncData({ app }) {
    const listener = app.$Customer()
    const items = listener.subscribe()
    return { listener, items }
  },
  data() {
    return {
      lazySearch: null,
      search: null,
    }
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-template-index-page-customers
    :search.sync="search"
    :items="items"
    :lazy-search.sync="lazySearch"
  />
</template>

<style></style>
