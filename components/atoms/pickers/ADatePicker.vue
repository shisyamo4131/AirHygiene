<script>
/**
 * ### ADatePicker
 * @author shisyamo4131
 */
export default {
  props: {
    dayFormat: {
      type: Function,
      default: (v) => new Date(v).getDate(),
      required: false,
    },
    locale: { type: String, default: 'ja-jp', required: false },
  },
}
</script>

<template>
  <v-date-picker v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template #default>
      <slot name="default" />
    </template>
  </v-date-picker>
</template>

<style></style>
