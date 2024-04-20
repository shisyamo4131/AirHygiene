<script>
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
/**
 * ### GSwitch
 *
 * @author shisyamo4131
 */
import ALabelInput from '~/components/atoms/labels/ALabelInput.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ALabelInput, ASwitch },
  /***************************************************************************
   * MODEL
   ***************************************************************************/
  model: { prop: 'input-value', event: 'change' },
}
</script>

<template>
  <a-label-input v-bind="$attrs" v-on="$listeners">
    <template #default="{ attrs, on }">
      <a-switch class="mt-1 mb-3" v-bind="attrs" v-on="on">
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
  </a-label-input>
</template>
<style></style>
