<script>
/**
 * ## AIconEdit
 * @author shisyamo4131
 * @create 2024-03-18
 */
export default {
  props: {
    color: { type: String, default: 'green', required: false },
  },
}
</script>

<template>
  <v-icon v-bind="$attrs" :color="color" v-on="$listeners"
    >mdi-pencil-outline</v-icon
  >
</template>

<style></style>
