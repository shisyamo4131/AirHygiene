<script>
/**
 * ## GInputSiteUnitPrice
 * @author shisyamo4131
 */
import GDate from './GDate.vue'
import GSelect from './GSelect.vue'
import GNumeric from './GNumeric.vue'
import { props } from '~/models/SiteUnitPrice'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GDate, GSelect, GNumeric },
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div>
    <g-date
      :value="startAt"
      label="適用開始日"
      required
      @input="$emit('update:startAt', $event)"
    />
    <g-select
      :value="itemId"
      label="回収品目"
      required
      @input="$emit('update:itemId', $event)"
    />
    <g-select
      :value="unitId"
      label="回収単位"
      required
      @input="$emit('update:unitId', $event)"
    />
    <g-numeric
      class="right-input"
      :value="price"
      label="回収単価"
      required
      @input="$emit('update:price', $event)"
    />
  </div>
</template>

<style></style>
