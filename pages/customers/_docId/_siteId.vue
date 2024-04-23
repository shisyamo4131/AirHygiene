<script>
import { where } from 'firebase/firestore'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GCollectionControllerMunicipalContracts from '~/components/molecules/controllers/GCollectionControllerMunicipalContracts.vue'
import GDocumentControllerSite from '~/components/molecules/controllers/GDocumentControllerSite.vue'
import GActionCardDetailSite from '~/components/molecules/cards/GActionCardDetailSite.vue'
import GCollectionControllerIndustrialContracts from '~/components/molecules/controllers/GCollectionControllerIndustrialContracts.vue'
import GCollectionControllerSiteUnitPrices from '~/components/molecules/controllers/GCollectionControllerSiteUnitPrices.vue'
export default {
  components: {
    GDocumentControllerSite,
    GCollectionControllerMunicipalContracts,
    GDataTable,
    GActionCardDetailSite,
    GCollectionControllerIndustrialContracts,
    GCollectionControllerSiteUnitPrices,
  },
  asyncData({ app, route }) {
    const customerId = route.params.docId
    const siteId = route.params.siteId
    const municipalContractsListener = app.$MunicipalContract(siteId)
    const municipalContracts = municipalContractsListener.subscribe(undefined, [
      where('siteId', '==', siteId),
    ])
    const industrialContractsListener = app.$IndustrialContract(siteId)
    const industrialContracts = industrialContractsListener.subscribe(
      undefined,
      [where('siteId', '==', siteId)]
    )
    return {
      customerId,
      siteId,
      municipalContractsListener,
      municipalContracts,
      industrialContractsListener,
      industrialContracts,
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
    this.industrialContractsListener.unsubscribe()
  },
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <g-document-controller-site :doc-id="siteId">
            <template #card="{ attrs, on }">
              <g-action-card-detail-site v-bind="attrs" v-on="on" />
            </template>
          </g-document-controller-site>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>回収単価</v-card-title>
                <v-container fluid>
                  <g-collection-controller-site-unit-prices
                    :site-id="siteId"
                    :default-item="{ siteId: siteId }"
                    :items="[]"
                    :table-props="{
                      headers: [{ text: '適用開始日', value: 'startAt' }],
                      'sort-by': 'startAt',
                      'sort-desc': true,
                    }"
                  >
                    <template #table="{ attrs, on }">
                      <g-data-table v-bind="attrs" v-on="on" />
                    </template>
                  </g-collection-controller-site-unit-prices>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-title>一般廃棄物契約</v-card-title>
                <v-container fluid>
                  <g-collection-controller-municipal-contracts
                    :site-id="siteId"
                    :default-item="{ siteId: siteId }"
                    :items="municipalContracts"
                    :table-props="{
                      headers: [{ text: '契約日', value: 'startAt' }],
                      'sort-by': 'startAt',
                      'sort-desc': true,
                    }"
                  >
                    <template #table="{ attrs, on }">
                      <g-data-table v-bind="attrs" v-on="on" />
                    </template>
                  </g-collection-controller-municipal-contracts>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-title>産業廃棄物契約</v-card-title>
                <v-container fluid>
                  <g-collection-controller-industrial-contracts
                    :site-id="siteId"
                    :default-item="{ siteId: siteId }"
                    :items="industrialContracts"
                    :table-props="{
                      headers: [{ text: '契約日', value: 'startAt' }],
                      'sort-by': 'startAt',
                      'sort-desc': true,
                    }"
                  >
                    <template #table="{ attrs, on }">
                      <g-data-table v-bind="attrs" v-on="on" />
                    </template>
                  </g-collection-controller-industrial-contracts>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
