<script>
/**
 * ### GNumeric
 *
 * @author shisyamo4131
 */
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ANumeric },
}
</script>

<template>
  <a-numeric v-bind="$attrs" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-numeric>
</template>
<style></style>
