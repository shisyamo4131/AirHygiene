<script>
/**
 * ## GInputUnit
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GTextFieldAbbr from './GTextFieldAbbr.vue'
import { props } from '~/models/Unit'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GTextField, GTextFieldAbbr },
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
      maxlength="3"
      :rules="[(v) => !v || [v].length <= 3 || '3桁まで']"
      @input="$emit('update:code', $event)"
    />
    <g-text-field
      :value="name"
      label="単位"
      required
      @input="$emit('update:name', $event)"
      @change="$emit('update:abbr', $event)"
    />
    <g-text-field-abbr
      :value="abbr"
      label="略称"
      required
      counter
      maxlength="3"
      :rules="[(v) => !v || [...v].length <= 3 || '3文字まで']"
      @input="$emit('update:abbr', $event)"
    />
  </div>
</template>

<style></style>
