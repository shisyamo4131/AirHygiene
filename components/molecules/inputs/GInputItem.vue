<script>
/**
 * ## GInputItem
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GTextFieldAbbr from './GTextFieldAbbr.vue'
import GSelect from './GSelect.vue'
import { props } from '~/models/Item'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GTextField, GTextFieldAbbr, GSelect },
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div>
    <g-text-field
      :value="code"
      label="CODE"
      required
      counter
      maxlength="4"
      @input="$emit('update:code', $event)"
    />
    <g-text-field
      :value="name"
      label="品目名"
      required
      @input="$emit('update:name', $event)"
      @change="$emit('update:abbr', $event)"
    />
    <g-text-field-abbr
      :value="abbr"
      label="略称"
      required
      counter
      maxlength="4"
      @input="$emit('update:abbr', $event)"
    />
    <g-select
      :value="type"
      label="種別"
      :items="$ITEM_TYPE_ARRAY"
      required
      @input="$emit('update:type', $event)"
    />
  </div>
</template>

<style></style>
