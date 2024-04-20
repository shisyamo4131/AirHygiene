<script>
import { orderBy } from 'firebase/firestore'
import GCollectionControllerAutonumbers from '~/components/organisms/GCollectionControllerAutonumbers.vue'
export default {
  components: {
    GCollectionControllerAutonumbers,
  },
  asyncData({ app }) {
    const listener = app.$Autonumber()
    const items = listener.subscribe(undefined, [orderBy('collectionId')])
    return { listener, items }
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <g-collection-controller-autonumbers
    :items="items"
    :actions="['edit', 'delete']"
  />
</template>

<style></style>
