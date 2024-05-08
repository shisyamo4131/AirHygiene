<script>
import GAutocomplete from './GAutocomplete.vue'
import ALazyFetchDocs from '~/components/atoms/ALazyFetchDocs.vue'
export default {
  components: { ALazyFetchDocs, GAutocomplete },
}
</script>

<template>
  <a-lazy-fetch-docs
    v-slot="{ autocomplete }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <g-autocomplete v-bind="autocomplete.attrs" v-on="autocomplete.on">
      <template
        v-for="(_, scopedSlotName) in $scopedSlots"
        #[scopedSlotName]="slotData"
      >
        <slot :name="scopedSlotName" v-bind="slotData" />
      </template>
      <template v-for="(_, slotName) in $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </g-autocomplete>
  </a-lazy-fetch-docs>
</template>

<style></style>
