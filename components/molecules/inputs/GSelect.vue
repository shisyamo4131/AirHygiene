<script>
/**
 * ### GSelect
 *
 * @author shisyamo4131
 */
import ASelect from '~/components/atoms/inputs/ASelect.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ASelect },
}
</script>

<template>
  <a-select v-bind="$attrs" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-select>
</template>
<style></style>
