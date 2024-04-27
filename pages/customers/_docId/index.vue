<script>
import { where } from 'firebase/firestore'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GDocumentControllerCustomer from '~/components/molecules/controllers/GDocumentControllerCustomer.vue'
import GCollectionControllerSites from '~/components/molecules/controllers/GCollectionControllerSites.vue'
import GActionCardDetailCustomer from '~/components/molecules/cards/GActionCardDetailCustomer.vue'
export default {
  components: {
    GDataTable,
    GDocumentControllerCustomer,
    GCollectionControllerSites,
    GActionCardDetailCustomer,
  },
  asyncData({ app, route }) {
    const docId = route.params.docId
    const sitesListener = app.$Site()
    const sites = sitesListener.subscribe(undefined, [
      where('customerId', '==', docId),
    ])
    return { docId, sitesListener, sites }
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
  methods: {
    siteSubmitComplete({ mode, model }) {
      if (mode === 'REGIST' || mode === 'UPDATE') {
        this.$router.push(`/customers/${this.docId}/${model.docId}`)
      }
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
          <g-document-controller-customer
            :doc-id="docId"
            :dialog-props="{ 'max-width': 600 }"
            :actions="['edit', 'delete']"
            @submit:delete="$router.replace('/customers')"
          >
            <template #card="{ attrs, on }">
              <g-action-card-detail-customer v-bind="attrs" v-on="on" />
            </template>
          </g-document-controller-customer>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>排出場所一覧</v-card-title>
            <v-container>
              <g-collection-controller-sites
                :default-item="{ customerId: docId }"
                :items="sites"
                :actions="['edit', 'delete', 'detail']"
                :table-props="{
                  headers: [
                    { text: 'CODE', value: 'code' },
                    { text: '名称', value: 'name' },
                  ],
                  'sort-by': 'code',
                }"
                @click:detail="
                  $router.push(`/customers/${docId}/${$event.docId}`)
                "
                @submit:complete="siteSubmitComplete"
              >
                <template #table="{ attrs, on }">
                  <g-data-table v-bind="attrs" v-on="on" />
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
