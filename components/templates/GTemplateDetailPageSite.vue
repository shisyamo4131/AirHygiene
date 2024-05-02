<script>
import GSiteCard from '../organisms/cards/GSiteCard.vue'
import GSiteRootContractsCard from '../organisms/cards/GSiteRootContractsCard.vue'
import GTemplateDetailPage from './GTemplateDetailPage.vue'
export default {
  components: { GTemplateDetailPage, GSiteCard, GSiteRootContractsCard },
  props: {
    siteId: { type: String, required: true },
  },
}
</script>

<template>
  <g-template-detail-page v-bind="$attrs">
    <v-row>
      <v-col cols="12" md="4">
        <g-site-card :doc-id="siteId" />
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <g-site-root-contracts-card :site-id="siteId" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </g-template-detail-page>
</template>

<style></style>
