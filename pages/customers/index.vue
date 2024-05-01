<script>
import GActionCardSimpleCustomer from '~/components/molecules/cards/GActionCardSimpleCustomer.vue'
import GCollectionControllerCustomers from '~/components/molecules/controllers/GCollectionControllerCustomers.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  components: {
    GCollectionControllerCustomers,
    GActionCardSimpleCustomer,
    GDataIterator,
  },
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
      sortBy: 'code',
    }"
    @click:detail="$router.push(`/customers/${$event.docId}`)"
  >
    <template #table="{ attrs, on }">
      <g-data-iterator v-bind="attrs" v-on="on">
        <template #col="colProps">
          <g-action-card-simple-customer
            v-bind="colProps.attrs"
            outlined
            v-on="colProps.on"
          />
        </template>
      </g-data-iterator>
    </template>
  </g-collection-controller-customers>
</template>

<style></style>
