<script>
/**
 * ### GAutocomplete
 *
 * @author shisyamo4131
 */
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AAutocomplete },
}
</script>

<template>
  <a-autocomplete v-bind="$attrs" v-on="$listeners">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </a-autocomplete>
</template>
<style></style>
