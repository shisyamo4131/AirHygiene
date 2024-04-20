<template>
  <g-collection-controller-customers
    :items="items"
    :actions="['edit', 'delete']"
  />
</template>

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

<style></style>
