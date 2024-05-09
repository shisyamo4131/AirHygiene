<script>
/**
 * ### ASwitch
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * MODEL
   ***************************************************************************/
  model: { prop: 'input-value', event: 'change' },
}
</script>

<template>
  <v-switch v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, scopedSlot) in $scopedSlots" #[scopedSlot]="slotData">
      <slot :name="scopedSlot" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-switch>
</template>

<style></style>
