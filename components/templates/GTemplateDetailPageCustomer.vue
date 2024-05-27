<script>
import GCustomerCard from '../organisms/cards/GCustomerCard.vue'
import GSitesCard from '../organisms/cards/GSitesCard.vue'
import GTemplateDetailPage from './GTemplateDetailPage.vue'
export default {
  components: { GTemplateDetailPage, GCustomerCard, GSitesCard },
  props: {
    customerId: { type: String, required: true },
  },
}
</script>

<template>
  <g-template-detail-page v-bind="$attrs">
    <v-row>
      <v-col cols="12" md="5">
        <g-customer-card
          :doc-id="customerId"
          @submit:delete="$router.replace(`/customers`)"
        />
      </v-col>
      <v-col cols="12" md="7">
        <g-sites-card
          :customer-id="customerId"
          @click:detail="$router.push(`${$route.path}/${$event.docId}`)"
          @submit:regist="$router.push(`${$route.path}/${$event.docId}`)"
          @submit:update="$router.push(`${$route.path}/${$event.docId}`)"
        />
      </v-col>
    </v-row>
  </g-template-detail-page>
</template>

<style></style>
