<script>
/**
 * ## GInputRouteCollectionResult
 * @author shisyamo4131
 */
import GTextarea from './GTextarea.vue'
import GNumeric from './GNumeric.vue'
import GDate from './GDate.vue'
import GAutocompleteItem from './GAutocompleteItem.vue'
import GAutocompleteUnit from './GAutocompleteUnit.vue'
import GMixinInput from '~/components/mixins/GMixinInput'
import { props } from '~/models/RouteCollectionResult'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextarea,
    GNumeric,
    GDate,
    GAutocompleteItem,
    GAutocompleteUnit,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
  props: {
    hideDate: { type: Boolean, default: false, required: false },
  },
}
</script>

<template>
  <div>
    <g-date
      v-if="!hideDate"
      :value="date"
      label="回収日"
      required
      picker-only
      @input="$emit('update:date', $event)"
    />
    <g-autocomplete-item
      :value="itemId"
      label="回収品目"
      required
      @input="$emit('update:itemId', $event)"
    />
    <v-row dense>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="amount"
          label="数量"
          :decimal-places="2"
          required
          @input="$emit('update:amount', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-autocomplete-unit
          :value="unitId"
          label="回収単位"
          required
          @input="$emit('update:unitId', $event)"
        />
      </v-col>
    </v-row>
    <g-textarea
      :value="remarks"
      label="備考"
      :rows="2"
      hide-details
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
