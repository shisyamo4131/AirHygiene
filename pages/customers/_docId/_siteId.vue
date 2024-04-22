<script>
import { where } from 'firebase/firestore'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GCollectionControllerMunicipalContracts from '~/components/organisms/GCollectionControllerMunicipalContracts.vue'
import GDocumentControllerSite from '~/components/organisms/GDocumentControllerSite.vue'
export default {
  components: {
    GDocumentControllerSite,
    GCollectionControllerMunicipalContracts,
    GDataTable,
  },
  asyncData({ app, route }) {
    const customerId = route.params.docId
    const siteId = route.params.siteId
    const municipalContractsListener = app.$MunicipalContract(siteId)
    const municipalContracts = municipalContractsListener.subscribe(undefined, [
      where('siteId', '==', siteId),
    ])
    return {
      customerId,
      siteId,
      municipalContractsListener,
      municipalContracts,
    }
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
  destroyed() {
    this.municipalContractsListener.unsubscribe()
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
        <v-col cols="12" md="8">
          <g-collection-controller-municipal-contracts
            :site-id="siteId"
            :default-item="{ siteId: siteId }"
            :items="municipalContracts"
          >
            <template #table="{ attrs, on }">
              <g-data-table v-bind="attrs" v-on="on" />
            </template>
          </g-collection-controller-municipal-contracts>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
