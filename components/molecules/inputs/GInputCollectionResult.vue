<script>
/**
 * ## GInputCollectionResult
 * @author shisyamo4131
 */
import GTextarea from './GTextarea.vue'
import GSelect from './GSelect.vue'
import GNumeric from './GNumeric.vue'
import GDate from './GDate.vue'
import GAutocompleteItem from './GAutocompleteItem.vue'
import GAutocompleteUnit from './GAutocompleteUnit.vue'
// import GAutocompleteSite from './GAutocompleteSite.vue'
import GMixinInput from '~/components/mixins/GMixinInput'
import { props } from '~/models/CollectionResult'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextarea,
    GSelect,
    GNumeric,
    GDate,
    GAutocompleteItem,
    GAutocompleteUnit,
    // GAutocompleteSite,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
  data() {
    return {
      loading: false,
      snackbar: false,
    }
  },
  methods: {
    async updateUnitPrice() {
      if (this.resultType !== 'root') return
      const [date, itemId, unitId] = [this.date, this.itemId, this.unitId]
      if (!date || !itemId || !unitId) return
      const model = this.$SiteRootContract(this.siteId)
      this.loading = true
      const result = await model.fetchUnitPrice({ date, itemId, unitId })
      this.loading = false
      if (!result) return
      this.$emit('update:unitPrice', result.price)
      this.$emit('update:convertWeight', result.convertWeight)
      this.snackbar = true
    },
  },
}
</script>

<template>
  <div>
    <!-- <g-autocomplete-site
      :value="siteId"
      label="排出場所"
      required
      @input="$emit('update:siteId', $event)"
    /> -->
    <g-date
      :value="date"
      label="回収日"
      required
      :disabled="loading"
      :loading="loading"
      @input="$emit('update:date', $event)"
      @change="updateUnitPrice"
    />
    <g-select
      :value="resultType"
      label="回収区分"
      :items="$COLLECTION_RESULT_TYPE_ARRAY"
      required
      :disabled="loading"
      :loading="loading"
      @input="$emit('update:resultType', $event)"
      @change="updateUnitPrice"
    />
    <g-autocomplete-item
      :value="itemId"
      label="回収品目"
      required
      :disabled="loading"
      :loading="loading"
      @input="$emit('update:itemId', $event)"
      @change="updateUnitPrice"
    />
    <v-row dense>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="amount"
          label="数量"
          :decimal-places="2"
          required
          @input="$emit('update:amount', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-autocomplete-unit
          :value="unitId"
          label="回収単位"
          required
          :disabled="loading"
          :loading="loading"
          @input="$emit('update:unitId', $event)"
          @change="updateUnitPrice"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="unitPrice"
          label="単価"
          :decimal-places="2"
          required
          suffix="円"
          :disabled="loading"
          :loading="loading"
          @input="$emit('update:unitPrice', $event)"
        />
      </v-col>
      <v-col cols="6">
        <g-numeric
          class="right-input"
          :value="convertWeight"
          label="換算重量"
          :decimal-places="2"
          required
          suffix="kg"
          :disabled="loading"
          :loading="loading"
          @input="$emit('update:convertWeight', $event)"
        />
      </v-col>
    </v-row>
    <g-textarea
      :value="remarks"
      label="備考"
      @input="$emit('update:remarks', $event)"
    />
    <v-snackbar
      v-model="snackbar"
      centered
      color="primary"
      text
      :timeout="1000"
    >
      単価・換算重量をルート契約から引用しました。
    </v-snackbar>
  </div>
</template>

<style></style>
