<script>
/**
 * ## GInputItem
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GSelect from './GSelect.vue'
import { props } from '~/models/Item'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GTextField, GSelect },
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
      :rules="[(v) => !v || [v].length <= 4 || '4桁まで']"
      @input="$emit('update:code', $event)"
    />
    <g-text-field
      :value="name"
      label="品目名"
      required
      @input="$emit('update:name', $event)"
      @change="$emit('update:abbr', $event)"
    />
    <g-text-field
      :value="abbr"
      label="略称"
      required
      counter
      maxlength="4"
      :rules="[(v) => !v || [...v].length <= 4 || '4文字まで']"
      hint="検索に使用されます"
      ignore-surrogate-pair
      @input="$emit('update:abbr', $event)"
    />
    <g-select
      :value="group"
      label="種別"
      :items="$ITEM_GROUP_ARRAY"
      required
      @input="$emit('update:group', $event)"
    />
  </div>
</template>

<style></style>
