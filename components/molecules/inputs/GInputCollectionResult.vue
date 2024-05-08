<script>
/**
 * ## GInputCollectionResult
 * @author shisyamo4131
 */
import GTextarea from './GTextarea.vue'
import GSelect from './GSelect.vue'
import GNumeric from './GNumeric.vue'
import GDate from './GDate.vue'
import GAutocompleteItem from './GAutocompleteItem.vue'
import GAutocompleteUnit from './GAutocompleteUnit.vue'
// import GAutocompleteSite from './GAutocompleteSite.vue'
import GMixinInput from '~/components/mixins/GMixinInput'
import { props } from '~/models/CollectionResult'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextarea,
    GSelect,
    GNumeric,
    GDate,
    GAutocompleteItem,
    GAutocompleteUnit,
    // GAutocompleteSite,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div>
    <!-- <g-autocomplete-site
      :value="siteId"
      label="排出場所"
      required
      @input="$emit('update:siteId', $event)"
    /> -->
    <g-date
      :value="date"
      label="回収日"
      required
      @input="$emit('update:date', $event)"
    />
    <g-select
      :value="resultType"
      label="回収区分"
      :items="$COLLECTION_RESULT_TYPE_ARRAY"
      required
      @input="$emit('update:resultType', $event)"
    />
    <!-- siteId? -->

    <g-autocomplete-item
      :value="itemId"
      label="回収品目"
      required
      @input="$emit('update:itemId', $event)"
    />
    <g-numeric
      :value="amount"
      label="数量"
      :decimal-places="2"
      required
      @input="$emit('update:amount', $event)"
    />
    <g-autocomplete-unit
      :value="unitId"
      label="回収単位"
      required
      @input="$emit('update:unitId', $event)"
    />
    <g-numeric
      :value="unitPrice"
      label="単価"
      required
      @input="$emit('update:unitPrice', $event)"
    />
    <g-numeric
      :value="convertWeight"
      label="換算重量"
      :decimal-places="2"
      required
      @input="$emit('update:convertWeight', $event)"
    />
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
