<script>
/**
 * ### GTextarea
 *
 * @author shisyamo4131
 */
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ATextarea },
}
</script>

<template>
  <a-textarea v-bind="$attrs" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-textarea>
</template>
<style></style>
