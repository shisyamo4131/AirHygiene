<script>
/**
 * ## GInputCustomer
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GTextarea from './GTextarea.vue'
import ARenderlessZipcode from '~/components/atoms/renderless/ARenderlessZipcode.vue'
import { props } from '~/models/Customer'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextField,
    ARenderlessZipcode,
    GTextarea,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    loaded(e) {
      this.$emit('update:pref', e.pref)
      this.$emit('update:city', e.city)
      this.$emit('update:address1', e.addr)
    },
  },
}
</script>

<template>
  <div>
    <g-text-field
      :value="name"
      label="会社名"
      required
      @input="$emit('update:name', $event)"
    />
    <g-text-field
      :value="abbr"
      label="略称"
      required
      hint="検索に使用されます"
      ignore-surrogate-pair
      @input="$emit('update:abbr', $event)"
    />
    <g-text-field
      :value="abbrKana"
      label="略称カナ"
      required
      hint="検索に使用されます"
      ignore-surrogate-pair
      input-type="katakana"
      @input="$emit('update:abbrKana', $event)"
    />
    <a-renderless-zipcode
      :value="zipcode"
      @input="$emit('update:zipcode', $event)"
      @loaded="loaded"
    >
      <template #default="{ attrs, on }">
        <g-text-field v-bind="attrs" label="郵便番号" v-on="on" />
      </template>
    </a-renderless-zipcode>
    <g-text-field
      :value="pref"
      label="都道府県"
      required
      @input="$emit('update:pref', $event)"
    />
    <g-text-field
      :value="city"
      label="市区町村"
      required
      @input="$emit('update:city', $event)"
    />
    <g-text-field
      :value="address1"
      label="住所"
      required
      @input="$emit('update:address1', $event)"
    />
    <g-text-field
      :value="address2"
      label="建物名・階数"
      @input="$emit('update:address2', $event)"
    />
    <v-row dense>
      <v-col cols="12" md="6">
        <g-text-field
          :value="tel"
          label="電話番号"
          input-type="tel"
          @input="$emit('update:tel', $event)"
        />
      </v-col>
      <v-col cols="12" md="6">
        <g-text-field
          :value="fax"
          label="FAX番号"
          input-type="tel"
          @input="$emit('update:fax', $event)"
        />
      </v-col>
    </v-row>
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
