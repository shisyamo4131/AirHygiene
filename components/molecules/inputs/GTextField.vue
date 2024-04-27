<script>
/**
 * ### GTextField
 *
 * @author shisyamo4131
 */
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ATextField },
}
</script>

<template>
  <a-text-field v-bind="$attrs" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-text-field>
</template>
<style></style>
