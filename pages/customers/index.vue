<script>
import GCollectionControllerCustomers from '~/components/organisms/GCollectionControllerCustomers.vue'
export default {
  components: { GCollectionControllerCustomers },
  asyncData({ app }) {
    const listener = app.$Customer()
    const items = listener.subscribe()
    return { listener, items }
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-collection-controller-customers
    :items="items"
    :actions="['edit', 'delete', 'detail']"
    :table-props="{
      'hide-pagination': true,
      cols: { cols: 12, md: 6, lg: 4, xl: 3 },
    }"
    @click:detail="$router.push(`/customers/${$event.docId}`)"
  >
  </g-collection-controller-customers>
</template>

<style></style>
