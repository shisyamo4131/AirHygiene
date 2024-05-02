<script>
import GTemplateIndexPageItems from '~/components/templates/GTemplateIndexPageItems.vue'
export default {
  components: {
    GTemplateIndexPageItems,
  },
  data() {
    return {
      items: this.$store.state.Items.items,
    }
  },
}
</script>

<template>
  <g-template-index-page-items :items="items" />
</template>

<style></style>
