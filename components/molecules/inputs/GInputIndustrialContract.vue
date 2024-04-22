<script>
/**
 * ## GInputIndustrialContract
 * @author shisyamo4131
 */
import GDate from './GDate.vue'
import { props } from '~/models/IndustrialContract'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GDate },
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div>
    <g-date
      :value="startAt"
      label="契約日"
      required
      @input="$emit('update:startAt', $event)"
    />
  </div>
</template>

<style></style>
