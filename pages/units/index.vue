<script>
import GTemplateIndexPageUnits from '~/components/templates/GTemplateIndexPageUnits.vue'
export default {
  components: {
    GTemplateIndexPageUnits,
  },
  data() {
    return {
      items: this.$store.state.Units.items,
    }
  },
}
</script>

<template>
  <g-template-index-page-units :items="items" />
</template>

<style></style>
