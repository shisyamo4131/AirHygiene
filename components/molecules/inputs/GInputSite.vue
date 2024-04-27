<script>
/**
 * ## GInputSite
 * @author shisyamo4131
 */
import GTextField from './GTextField.vue'
import GTextarea from './GTextarea.vue'
import ARenderlessZipcode from '~/components/atoms/renderless/ARenderlessZipcode.vue'
import { props } from '~/models/Site'
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
  data() {
    return {
      loadingCustomer: false,
    }
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async copyFromCustomer() {
      if (!this.customerId) return
      this.loadingCustomer = true
      const model = this.$Customer()
      await model.fetch(this.customerId)
      this.$emit('update:zipcode', model.zipcode)
      this.$emit('update:pref', model.pref)
      this.$emit('update:city', model.city)
      this.$emit('update:address1', model.address1)
      this.$emit('update:address2', model.address2)
      this.$emit('update:tel', model.tel)
      this.$emit('update:fax', model.fax)
      this.loadingCustomer = false
    },
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
      label="排出場所名"
      required
      @input="$emit('update:name', $event)"
      @change="$emit('update:abbr', $event)"
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
    <div class="d-flex justify-end">
      <v-btn
        color="primary"
        :loading="loadingCustomer"
        :disabled="loadingCustomer"
        small
        text
        @click="copyFromCustomer"
      >
        <v-icon small>mdi-content-duplicate</v-icon>
        取引先の情報を複製</v-btn
      >
    </div>
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
