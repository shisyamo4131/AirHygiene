<script>
/**
 * ## GInputRouteCollectionResult
 * @author shisyamo4131
 */
import GTextarea from './GTextarea.vue'
import GNumeric from './GNumeric.vue'
import GDate from './GDate.vue'
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
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
  props: {
    hideDate: { type: Boolean, default: false, required: false },
    regulatedItemId: { type: String, required: true },
    regulatedItemizationUnitIds: {
      type: Array,
      required: true,
    },
    additionalItemUnits: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  computed: {
    itemIds() {
      return [
        this.regulatedItemId,
        ...this.additionalItemUnits.map(({ itemId }) => itemId),
      ]
    },
    unitIds() {
      return [
        ...this.regulatedItemizationUnitIds,
        ...this.additionalItemUnits.map(({ unitId }) => unitId),
      ]
    },
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
    <g-numeric
      v-for="(unitId, index) of regulatedItemizationUnitIds"
      :key="index"
      :label="$store.getters['Items/get'](regulatedItemId).abbr"
      :suffix="$store.getters['Units/get'](unitId).abbr"
    />
    <g-numeric
      :label="$store.getters['Items/get'](regulatedItemId).abbr"
      suffix="kg"
    />
    <div>
      <g-numeric
        v-for="(itemUnit, index) of additionalItemUnits"
        :key="index"
        :label="$store.getters['Items/get'](itemUnit.itemId).abbr"
        :suffix="$store.getters['Units/get'](itemUnit.unitId).abbr"
      />
    </div>
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
