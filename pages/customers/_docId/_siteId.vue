<script>
import GTemplateDetailPageSite from '~/components/templates/GTemplateDetailPageSite.vue'
export default {
  components: {
    GTemplateDetailPageSite,
  },
  asyncData({ route }) {
    const customerId = route.params.docId
    const siteId = route.params.siteId
    return {
      customerId,
      siteId,
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
}
</script>

<template>
  <g-template-detail-page-site :site-id="siteId" :breadcrumbs="breadcrumbs" />
</template>

<style></style>
