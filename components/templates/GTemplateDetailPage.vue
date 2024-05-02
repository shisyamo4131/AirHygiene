<script>
export default {
  props: {
    breadcrumbs: { type: Array, default: () => [], required: false },
  },
}
</script>

<template>
  <div>
    <v-toolbar flat style="position: sticky; top: 48px; z-index: 2">
      <v-breadcrumbs :items="breadcrumbs" />
    </v-toolbar>
    <v-container fluid>
      <slot name="default" />
    </v-container>
  </div>
</template>

<style></style>
