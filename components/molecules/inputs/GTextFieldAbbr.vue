<script>
import GTextField from './GTextField.vue'
/**
 * ### GTextFieldAbbr
 * @author shisyamo4131
 */
export default {
  components: { GTextField },
}
</script>

<template>
  <g-text-field
    v-bind="$attrs"
    hint="検索に使用されます"
    ignore-surrogate-pair
    v-on="$listeners"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </g-text-field>
</template>

<style></style>
