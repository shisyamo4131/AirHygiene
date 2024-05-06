<script>
/**
 * ## GInputUnitPrice
 * @author shisyamo4131
 */
import GAutocompleteItem from './GAutocompleteItem.vue'
import GAutocompleteUnit from './GAutocompleteUnit.vue'
import GNumeric from './GNumeric.vue'
import { props } from '~/models/UnitPrice'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GAutocompleteItem, GAutocompleteUnit, GNumeric },
  mixins: [props, GMixinInput],
  props: {
    hidePrice: { type: Boolean, default: false, required: false },
  },
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
    <g-numeric
      v-if="!hidePrice"
      class="right-input"
      :value="price"
      label="単価"
      required
      decimal-places="2"
      suffix="円"
      @input="$emit('update:price', $event)"
    />
    <g-numeric
      class="right-input"
      :value="convertWeight"
      label="換算重量"
      required
      decimal-places="2"
      suffix="kg"
      @input="$emit('update:convertWeight', $event)"
    />
  </div>
</template>

<style></style>
