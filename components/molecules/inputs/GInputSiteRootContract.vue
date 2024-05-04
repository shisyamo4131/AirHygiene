<script>
/**
 * ## GInputSiteRootContract
 * @author shisyamo4131
 */
import GDataTable from '../tables/GDataTable.vue'
import GDate from './GDate.vue'
import GNumeric from './GNumeric.vue'
import GSwitch from './GSwitch.vue'
import GInputUnitPrice from './GInputUnitPrice.vue'
import { props } from '~/models/SiteRootContract'
import GMixinInput from '~/components/mixins/GMixinInput'
import AArrayController from '~/components/atoms/AArrayController.vue'
export default {
  components: {
    GDate,
    GNumeric,
    GSwitch,
    GDataTable,
    GInputUnitPrice,
    AArrayController,
  },
  mixins: [props, GMixinInput],
  data() {
    return {
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
    <v-subheader>最低保証</v-subheader>
    <g-switch
      :input-value="claimMinimumCharge"
      label="最低保証"
      @change="$emit('update:claimMinimumCharge', $event)"
    />
    <v-row>
      <v-col cols="12" md="6">
        <g-numeric
          class="right-input"
          :value="minimumCharge"
          label="最低保証金額"
          :required="claimMinimumCharge"
          :disabled="!claimMinimumCharge"
          suffix="円"
          @input="$emit('update:minimumCharge', $event)"
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
    <v-subheader>月極</v-subheader>
    <g-switch
      :input-value="claimFixedCharge"
      label="月極請求"
      @click.native.capture="confirmToFixedCharge"
      @change="updatePriceTo($event, $event ? 0 : null)"
    />
    <v-row>
      <v-col cols="12" md="6">
        <g-numeric
          class="right-input"
          :value="fixedCharge"
          label="月極金額"
          :required="claimFixedCharge"
          :disabled="!claimFixedCharge"
          suffix="円"
          @input="$emit('update:fixedCharge', $event)"
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
    <v-subheader>回収単価設定</v-subheader>
    <a-array-controller
      :actions="['edit', 'delete']"
      direct-delete
      :model="$UnitPrice()"
      :value="unitPrices"
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
      @input="$emit('update:unitPrices', $event)"
    >
      <template #default="{ table, editor, editKey, isEditing, btns }">
        <v-expand-transition>
          <v-container v-show="isEditing" fluid>
            <g-input-unit-price v-bind="editor.attrs" v-on="editor.on" />
          </v-container>
        </v-expand-transition>
        <div class="d-flex justify-end">
          <v-btn
            v-if="isEditing"
            v-bind="btns.cancel.attrs"
            text
            small
            v-on="btns.cancel.on"
          >
            <v-icon small>mdi-cancel</v-icon>
            取消
          </v-btn>
          <v-btn color="primary" text small v-on="btns.regist.on">
            <v-icon small>{{ `mdi-${!isEditing ? 'plus' : 'check'}` }}</v-icon>
            {{ `${!isEditing ? '追加' : '確定'}` }}
          </v-btn>
        </div>
        <g-data-table v-bind="table.attrs" v-on="table.on">
          <template #[`item.itemId`]="{ item }">
            <v-icon v-if="item.id === editKey" small color="primary"
              >mdi-check</v-icon
            >
            {{ $store.getters[`Items/get`](item.itemId).abbr }}
          </template>
          <template #[`item.unitId`]="{ item }">
            {{ $store.getters[`Units/get`](item.unitId).abbr }}
          </template>
          <template #[`item.price`]="{ item }">
            {{ `${(item.price || 0).toFixed(2)} 円` }}
          </template>
          <template #[`item.convertWeight`]="{ item }">
            {{ `${(item.convertWeight || 0).toFixed(2)} kg` }}
          </template>
        </g-data-table>
      </template>
    </a-array-controller>
  </div>
</template>

<style></style>
