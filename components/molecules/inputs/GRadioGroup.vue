<script>
/**
 * ### GRadioGroup
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * MODEL
   ***************************************************************************/
  model: { prop: 'value', event: 'change' },
}
</script>

<template>
  <v-radio-group class="mt-1 mb-3" v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, scopedSlot) in $scopedSlots" #[scopedSlot]="slotData">
      <slot :name="scopedSlot" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-radio-group>
</template>
<style></style>
