<script>
import GTemplateDetailPageRoute from '~/components/templates/GTemplateDetailPageRoute.vue'
export default {
  components: {
    GTemplateDetailPageRoute,
  },
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'TOP', to: '/' },
        { text: 'ルート', to: '/routes', exact: true },
        { text: 'ルート詳細', to: `/routes/${this.docId}` },
      ]
    },
  },
}
</script>

<template>
  <g-template-detail-page-route :route-id="docId" :breadcrumbs="breadcrumbs" />
</template>

<style></style>
