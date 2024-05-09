<script>
/**
 * ### ASelect
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    dense: { type: Boolean, default: true, required: false },
    label: { type: String, default: undefined, required: false },
    menuProps: {
      type: Object,
      default: () => ({ offsetY: true }),
      required: false,
    },
    outlined: { type: Boolean, default: true, required: false },
    required: { type: Boolean, default: false, required: false },
    requiredError: { type: String, default: '必須入力', required: false },
  },
}
</script>

<template>
  <air-select v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template #label>
      <slot name="label">
        {{ label }}
        <span v-if="required" style="color: red">*</span>
      </slot>
    </template>
    <template v-for="(_, scopedSlot) in $scopedSlots" #[scopedSlot]="slotData">
      <slot :name="scopedSlot" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </air-select>
</template>

<style></style>
