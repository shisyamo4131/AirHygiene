<script>
/**
 * ## GInputItemUnit
 * @author shisyamo4131
 */
import GAutocompleteItem from './GAutocompleteItem.vue'
import GAutocompleteUnit from './GAutocompleteUnit.vue'
import { props } from '~/models/ItemUnit'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GAutocompleteItem, GAutocompleteUnit },
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div>
    <g-autocomplete-item
      :value="itemId"
      label="回収品目"
      required
      @input="$emit('update:itemId', $event)"
    />
    <g-autocomplete-unit
      :value="unitId"
      label="単位"
      required
      @input="$emit('update:unitId', $event)"
    />
  </div>
</template>

<style></style>
