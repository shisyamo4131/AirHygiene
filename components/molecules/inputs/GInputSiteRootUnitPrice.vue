<script>
/**
 * ## GInputSiteRootUnitPrice
 * @author shisyamo4131
 */
import GTreeviewUnitPrices from '../treeviews/GTreeviewUnitPrices.vue'
import GDialogEditor from '../dialogs/GDialogEditor.vue'
import GDate from './GDate.vue'
import GNumeric from './GNumeric.vue'
import GSwitch from './GSwitch.vue'
import { props } from '~/models/SiteRootUnitPrice'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GDate, GTreeviewUnitPrices, GDialogEditor, GNumeric, GSwitch },
  mixins: [props, GMixinInput],
  data() {
    return {
      dialog: false,
      editItem: this.$UnitPrice(),
      unitPricesRule: (v) => {
        if (!v.length) return true
        if (v.some((item) => item.price == null)) {
          return '単価の設定されていない回収品目があります'
        }
        if (v.some((item) => item.convertWeight == null)) {
          return '換算重量の設定されていない回収品目があります'
        }
        return true
      },
    }
  },
  watch: {
    dialog(v) {
      if (!v) this.editItem.initialize()
    },
  },
  methods: {
    confirmToFixedCharge(event) {
      if (this.claimFixedCharge) return
      const answer = window.confirm(
        '月極請求をする場合、契約単価をすべて0円に更新します。よろしいですか？'
      )
      if (!answer) event.stopPropagation()
    },
    /**
     * Update all prices to 'PAYLOAD' and emits unitPrices.
     * Also emits claimFixedCharge after that.
     */
    updatePriceTo(event, payload) {
      const result = this.unitPrices.map((item) => {
        return { ...JSON.parse(JSON.stringify(item)), price: payload }
      })
      this.$emit('update:unitPrices', result)
      this.$emit('update:claimFixedCharge', event)
    },
    editPrice(e) {
      this.editItem.initialize(e)
      this.dialog = true
    },
    submitPrice() {
      const result = this.unitPrices.map((unitPrice) => {
        if (unitPrice.id !== this.editItem.id) return unitPrice
        return JSON.parse(JSON.stringify(this.editItem))
      })
      this.$emit('update:unitPrices', result)
      this.dialog = false
    },
  },
}
</script>

<template>
  <div>
    <g-date
      :value="startAt"
      label="適用開始日"
      required
      @input="$emit('update:startAt', $event)"
    />
    <v-subheader>月極</v-subheader>
    <g-switch
      :input-value="claimFixedCharge"
      label="月極請求"
      @click.native.capture="confirmToFixedCharge"
      @change="updatePriceTo($event, $event ? 0 : null)"
    />
    <v-expand-transition>
      <div v-show="claimFixedCharge">
        <g-numeric
          class="right-input"
          :value="fixedCharge"
          label="月極金額"
          :required="claimFixedCharge"
          suffix="円"
          @input="$emit('update:fixedCharge', $event)"
        >
        </g-numeric>
        <g-numeric
          class="right-input"
          :value="fixedChargeFirst"
          label="初回請求額"
          :required="claimFixedCharge"
          suffix="円"
          @input="$emit('update:fixedChargeFirst', $event)"
        >
          <template #prepend>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-icon v-bind="attrs" color="primary" v-on="on"
                  >mdi-information-outline</v-icon
                >
              </template>
              <span>
                初回の請求額です。<br />月半ばから適用される契約の場合、<br />直近締日までの日割り金額を入力します。
              </span>
            </v-tooltip>
          </template>
        </g-numeric>
      </div>
    </v-expand-transition>
    <v-subheader>回収単価設定</v-subheader>
    <v-input :value="unitPrices" :rules="[unitPricesRule]">
      <g-treeview-unit-prices
        style="width: 100%"
        :value="unitPrices"
        dense
        :ignore-price="claimFixedCharge"
        selection-type="leaf"
        selectable
        transition
        @input="$emit('update:unitPrices', $event)"
        @click:priceSet="editPrice"
      />
    </v-input>
    <g-dialog-editor
      v-model="dialog"
      label="単価"
      :edit-mode="editItem.price ? 'UPDATE' : 'REGIST'"
      max-width="360"
      @click:submit="submitPrice"
      @click:cancel="dialog = false"
    >
      <template #form>
        <g-numeric
          v-model="editItem.price"
          class="right-input"
          :label="editItem.name"
          decimal-places="2"
          :disabled="claimFixedCharge"
          suffix="円"
        />
        <g-numeric
          v-model="editItem.convertWeight"
          class="right-input"
          label="換算重量"
          decimal-places="2"
          suffix="kg"
        />
      </template>
    </g-dialog-editor>
  </div>
</template>

<style></style>
