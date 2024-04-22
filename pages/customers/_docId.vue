<script>
import { where } from 'firebase/firestore'
import GCollectionControllerSites from '~/components/organisms/GCollectionControllerSites.vue'
import GDocumentControllerCustomer from '~/components/organisms/GDocumentControllerCustomer.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
export default {
  components: {
    GDocumentControllerCustomer,
    GCollectionControllerSites,
    GDataTable,
  },
  asyncData({ app, route }) {
    const docId = route.params.docId
    const sitesListener = app.$Site()
    const sites = sitesListener.subscribe(undefined, [
      where('customerId', '==', docId),
    ])
    return { docId, sitesListener, sites }
  },
  data() {
    return {
      sitesHeaders: [{ text: '名称', value: 'name' }],
    }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'TOP', to: '/' },
        { text: '取引先', to: '/customers', exact: true },
        { text: '取引先詳細', to: `/customers/${this.docId}` },
      ]
    },
  },
  destroyed() {
    this.sitesListener.unsubscribe()
  },
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <g-document-controller-customer
            :doc-id="docId"
            :dialog-props="{ 'max-width': 600 }"
            :actions="['edit', 'delete']"
            @submit:delete="$router.replace('/customers')"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>排出場所一覧</v-card-title>
            <v-container>
              <g-collection-controller-sites
                :default-item="{ customerId: docId }"
                :items="sites"
                :actions="['edit', 'delete']"
              >
                <template #table="{ attrs, on }">
                  <g-data-table
                    v-bind="attrs"
                    :headers="sitesHeaders"
                    v-on="on"
                  />
                </template>
              </g-collection-controller-sites>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
