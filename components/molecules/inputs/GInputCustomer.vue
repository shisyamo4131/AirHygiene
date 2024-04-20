<script>
/**
 * ## GInputCustomer
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GTextarea from './GTextarea.vue'
import GSelect from './GSelect.vue'
import GNumeric from './GNumeric.vue'
import GSwitch from './GSwitch.vue'
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
    GSelect,
    GNumeric,
    GSwitch,
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
    sendToLoaded(e) {
      this.$emit('update:sendToPref', e.pref)
      this.$emit('update:sendToCity', e.city)
      this.$emit('update:sendToAddress1', e.addr)
    },
  },
}
</script>

<template>
  <div>
    <g-text-field
      :value="name1"
      label="取引先名1"
      required
      @input="$emit('update:name1', $event)"
    />
    <g-text-field
      :value="name2"
      label="取引先名2"
      @input="$emit('update:name2', $event)"
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
    <g-select
      :value="deadline"
      label="締日"
      :items="$DEADLINE_ARRAY"
      required
      @input="$emit('update:deadline', $event)"
    />
    <v-row>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="depositMonth"
          label="回収月"
          required
          suffix="ヶ月後"
          @input="$emit('update:depositMonth', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-select
          :value="depositDay"
          label="回収日"
          :items="$DEADLINE_ARRAY"
          required
          @input="$emit('update:depositDay', $event)"
        />
      </v-col>
    </v-row>
    <g-switch
      :input-value="hasSendTo"
      :label="`請求書の宛先`"
      @change="$emit('update:hasSendTo', $event)"
    />
    <v-expand-transition>
      <div v-show="hasSendTo">
        <a-renderless-zipcode
          :value="sendToZipcode"
          @input="$emit('update:sendToZipcode', $event)"
          @loaded="sendToLoaded"
        >
          <template #default="{ attrs, on }">
            <g-text-field v-bind="attrs" label="郵便番号" v-on="on" />
          </template>
        </a-renderless-zipcode>
        <g-text-field
          :value="sendToPref"
          label="都道府県"
          :required="hasSendTo"
          @input="$emit('update:sendToPref', $event)"
        />
        <g-text-field
          :value="sendToCity"
          label="市区町村"
          :required="hasSendTo"
          @input="$emit('update:sendToCity', $event)"
        />
        <g-text-field
          :value="sendToAddress1"
          label="住所"
          :required="hasSendTo"
          @input="$emit('update:sendToAddress1', $event)"
        />
        <g-text-field
          :value="sendToAddress2"
          label="建物名・階数"
          @input="$emit('update:sendToAddress2', $event)"
        />
      </div>
    </v-expand-transition>
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
  </div>
</template>

<style></style>
