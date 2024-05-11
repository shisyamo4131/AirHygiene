<script>
import GTemplateDetailPageRoot from '~/components/templates/GTemplateDetailPageRoot.vue'
export default {
  components: {
    GTemplateDetailPageRoot,
  },
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'TOP', to: '/' },
        { text: 'ルート', to: '/roots', exact: true },
        { text: 'ルート詳細', to: `/roots/${this.docId}` },
      ]
    },
  },
}
</script>

<template>
  <g-template-detail-page-root :root-id="docId" :breadcrumbs="breadcrumbs" />
</template>

<style></style>
