<script>
/**
 * ### ADate
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    errorMessage: {
      type: String,
      default: '無効な日付です。',
      required: false,
    },
    requiredError: { type: String, default: '必須入力', required: false },
  },
}
</script>

<template>
  <air-date v-bind="{ ...$props, ...$attrs }" dense outlined v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </air-date>
</template>

<style></style>
