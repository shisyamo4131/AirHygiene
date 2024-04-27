<script>
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
/**
 * ### GSwitch
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ASwitch },
  /***************************************************************************
   * MODEL
   ***************************************************************************/
  model: { prop: 'input-value', event: 'change' },
}
</script>

<template>
  <a-switch class="mt-1 mb-3" v-bind="$attrs" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-switch>
</template>
<style></style>
