<script>
import GDataTableUnitPrices from '../tables/GDataTableUnitPrices.vue'
import GEditCard from '../cards/GEditCard.vue'
import GDate from './GDate.vue'
import GNumeric from './GNumeric.vue'
import GSwitch from './GSwitch.vue'
import GInputUnitPrice from './GInputUnitPrice.vue'
import { props } from '~/models/SiteRouteContract'
import GMixinInput from '~/components/mixins/GMixinInput'
import AArrayController from '~/components/atoms/AArrayController.vue'
/**
 * ## GInputSiteRouteContract
 * @author shisyamo4131
 */
export default {
  components: {
    GDate,
    GNumeric,
    GSwitch,
    GInputUnitPrice,
    AArrayController,
    GDataTableUnitPrices,
    GEditCard,
  },
  mixins: [props, GMixinInput],
  data() {
    return {
      model: this.$UnitPrice(),
      unitPriceIsEditing: false,
    }
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
    <g-switch
      :input-value="claimMinimumCharge"
      :label="`最低保証: ${claimMinimumCharge ? 'あり' : 'なし'}`"
      @change="$emit('update:claimMinimumCharge', $event)"
    />
    <v-expand-transition>
      <v-container v-show="claimMinimumCharge">
        <v-row>
          <v-col cols="12" md="6">
            <g-numeric
              class="right-input"
              :value="minimumChargePrice"
              label="最低保証金額"
              :required="claimMinimumCharge"
              :disabled="!claimMinimumCharge"
              suffix="円"
              @input="$emit('update:minimumChargePrice', $event)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <g-numeric
              class="right-input"
              :value="minimumChargeFirst"
              label="初回保証金額"
              :required="claimMinimumCharge"
              :disabled="!claimMinimumCharge"
              suffix="円"
              @input="$emit('update:minimumChargeFirst', $event)"
            >
              <template #prepend>
                <v-tooltip top>
                  <template #activator="{ attrs, on }">
                    <v-icon v-bind="attrs" color="primary" v-on="on"
                      >mdi-information-outline</v-icon
                    >
                  </template>
                  <span>
                    初回の保証金額です。<br />月半ばから適用される契約の場合、<br />直近締日までの日割り金額を入力します。
                  </span>
                </v-tooltip>
              </template>
            </g-numeric>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
    <g-switch
      :input-value="claimFixedCharge"
      :label="`月極請求: ${claimFixedCharge ? 'あり' : 'なし'}`"
      @click.native.capture="confirmToFixedCharge"
      @change="$emit('update:claimFixedCharge', $event)"
    />
    <v-expand-transition>
      <v-container v-show="claimFixedCharge">
        <v-row>
          <v-col cols="12" md="6">
            <g-numeric
              class="right-input"
              :value="fixedChargePrice"
              label="月極金額"
              :required="claimFixedCharge"
              :disabled="!claimFixedCharge"
              suffix="円"
              @input="$emit('update:fixedChargePrice', $event)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <g-numeric
              class="right-input"
              :value="fixedChargeFirst"
              label="初回月極金額"
              :required="claimFixedCharge"
              :disabled="!claimFixedCharge"
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
                    初回の月極請求額です。<br />月半ばから適用される契約の場合、<br />直近締日までの日割り金額を入力します。
                  </span>
                </v-tooltip>
              </template>
            </g-numeric>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
    <v-subheader>回収単価設定</v-subheader>
    <div v-show="claimFixedCharge" class="red--text text-caption text-end">
      月極請求を行う場合、ルート回収の単価はすべて0円になります。
    </div>
    <a-array-controller
      :actions="['edit', 'delete']"
      :default-item="{ price: claimFixedCharge ? 0 : null }"
      :dialog-props="{ maxWidth: 480 }"
      direct-delete
      :is-editing.sync="unitPriceIsEditing"
      label="回収単価"
      :model="model"
      :table-props="{
        headers: [
          { text: '回収品目', value: 'itemId' },
          { text: '単位', value: 'unitId', align: 'right', sortable: false },
          { text: '単価', value: 'price', align: 'right', sortable: false },
          {
            text: '換算重量',
            value: 'convertWeight',
            align: 'right',
            sortable: false,
          },
        ],
      }"
      :value="unitPrices"
      @input="$emit('update:unitPrices', $event)"
    >
      <template #default="{ card, dialog, editor, form, input, table }">
        <v-dialog v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <div class="d-flex justify-end">
              <v-btn v-bind="attrs" color="primary" text small v-on="on">
                <v-icon small>mdi-plus</v-icon>
                追加
              </v-btn>
            </div>
          </template>
          <g-edit-card v-bind="card.attrs" v-on="card.on">
            <v-form v-bind="form.attrs" v-on="form.on">
              <g-input-unit-price
                v-bind="editor.attrs"
                :hide-price="claimFixedCharge"
                v-on="editor.on"
              />
            </v-form>
          </g-edit-card>
        </v-dialog>
        <v-input v-bind="input.attrs" v-on="input.on">
          <g-data-table-unit-prices
            style="width: 100%"
            v-bind="table.attrs"
            :hide-price="claimFixedCharge"
            v-on="table.on"
          />
        </v-input>
      </template>
    </a-array-controller>
  </div>
</template>

<style></style>
