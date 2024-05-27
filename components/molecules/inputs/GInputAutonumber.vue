<script>
/**
 * ## GInputAutonumber
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GNumeric from './GNumeric.vue'
import GSwitch from './GSwitch.vue'
import { props } from '~/models/Autonumber'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GTextField, GNumeric, GSwitch },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
}
</script>

<template>
  <div v-bind="$attrs" v-on="$listeners">
    <g-text-field
      :value="collectionId"
      label="コレクション名"
      required
      :disabled="editMode !== 'REGIST'"
      @input="$emit('update:collectionId', $event)"
    />
    <g-text-field
      :value="field"
      label="フィールド"
      required
      @input="$emit('update:field', $event)"
    />
    <v-row>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="current"
          label="現在値"
          required
          @input="$emit('update:current', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="length"
          label="桁数"
          required
          @input="$emit('update:length', $event)"
        />
      </v-col>
    </v-row>
    <g-switch
      :input-value="status"
      :label="`状態：${status ? '有効' : '無効'}`"
      required
      @change="$emit('update:status', $event)"
    />
  </div>
</template>

<style></style>
