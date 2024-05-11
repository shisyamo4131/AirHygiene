<script>
/**
 * ## GInputRoot
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import { props } from '~/models/Root'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextField,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div>
    <g-text-field
      :value="code"
      label="ルートCODE"
      required
      @input="$emit('update:code', $event)"
    />
    <g-text-field
      :value="name"
      label="ルート名"
      required
      @input="$emit('update:name', $event)"
    />
  </div>
</template>

<style></style>
