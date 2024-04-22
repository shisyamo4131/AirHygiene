<script>
import GDocumentControllerSite from '~/components/organisms/GDocumentControllerSite.vue'
export default {
  components: { GDocumentControllerSite },
  asyncData({ app, route }) {
    const customerId = route.params.docId
    const siteId = route.params.siteId
    return { customerId, siteId }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'TOP', to: '/' },
        { text: '取引先', to: '/customers', exact: true },
        {
          text: '取引先詳細',
          to: `/customers/${this.customerId}`,
          exact: true,
        },
        {
          text: '排出場所詳細',
          to: `/customers/${this.customerId}/${this.siteId}`,
        },
      ]
    },
  },
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <g-document-controller-site :doc-id="siteId" />
        </v-col>
        <v-col cols="12" md="8"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
