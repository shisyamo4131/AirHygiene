<script>
import GTemplateDetailPageCustomer from '~/components/templates/GTemplateDetailPageCustomer.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTemplateDetailPageCustomer,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = {
      customer: app.$Customer(),
    }
    await model.customer.fetch(docId)
    const listener = {
      customer: app.$Customer(),
    }
    listener.customer.subscribeDoc(docId)
    return { docId, model, listener }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    breadcrumbs() {
      return [
        { text: 'TOP', to: '/' },
        { text: '取引先', to: '/customers', exact: true },
        { text: '取引先詳細', to: `/customers/${this.docId}` },
      ]
    },
  },
}
</script>

<template>
  <g-template-detail-page-customer
    :customer-id="docId"
    :breadcrumbs="breadcrumbs"
  />
</template>

<style></style>
