<script>
/**
 * ### ATextFieldSearch
 * A component for search text input.
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    clearable: { type: Boolean, default: true, required: false },
    dense: { type: Boolean, default: true, required: false },
    flat: { type: Boolean, default: true, required: false },
    hideDetails: { type: Boolean, default: true, required: false },
    placeholder: { type: String, default: 'SEARCH', required: false },
    prependInnerIcon: { type: String, default: 'mdi-magnify', required: false },
    soloInverted: { type: Boolean, default: true, required: false },
  },
}
</script>

<template>
  <v-text-field v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template v-for="(_, scopedSlot) in $scopedSlots" #[scopedSlot]="slotData">
      <slot :name="scopedSlot" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-text-field>
</template>

<style></style>
