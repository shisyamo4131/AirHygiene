<script>
import GDocumentControllerCustomer from '~/components/organisms/GDocumentControllerCustomer.vue'
export default {
  components: { GDocumentControllerCustomer },
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
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
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
