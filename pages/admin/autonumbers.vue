<script>
import { orderBy } from 'firebase/firestore'
import GTemplateIndexPageAutonumbers from '~/components/templates/GTemplateIndexPageAutonumbers.vue'
export default {
  components: {
    GTemplateIndexPageAutonumbers,
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
  <g-template-index-page-autonumbers :items="items" />
</template>

<style></style>
