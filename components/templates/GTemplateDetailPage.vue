<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    breadcrumbs: { type: Array, default: () => [], required: false },
    deductHeight: {
      type: [String, Number],
      default: undefined,
      required: false,
    },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    height() {
      const vMain = this.$vuetify.breakpoint.height
      // get height of application parts.
      const appParts = [
        this.$vuetify.application.top,
        this.$vuetify.application.bar,
        this.$vuetify.application.footer,
        this.$vuetify.application.bottom,
      ]
      // get height of template parts.
      const toolbar = this.$vuetify.breakpoint.sm ? 56 : 64
      const padding = 24
      const deduct = this.deductHeight ? parseInt(this.deductHeight) : 0
      const tempParts = [padding, toolbar, deduct]
      const result = [...appParts, ...tempParts].reduce(
        (sum, i) => (sum -= i),
        vMain
      )
      return result
    },
  },
}
</script>

<template>
  <div>
    <v-toolbar flat style="position: sticky; top: 48px; z-index: 2">
      <v-breadcrumbs :items="breadcrumbs" />
    </v-toolbar>
    <v-container fluid>
      <slot name="default" v-bind="{ height }" />
    </v-container>
  </div>
</template>

<style></style>
