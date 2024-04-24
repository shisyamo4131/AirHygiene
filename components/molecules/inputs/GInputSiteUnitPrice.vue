<script>
/**
 * ## GInputSiteUnitPrice
 * @author shisyamo4131
 */
import GTreeviewUnitPrices from '../treeviews/GTreeviewUnitPrices.vue'
import GDialogEditor from '../dialogs/GDialogEditor.vue'
import GDate from './GDate.vue'
import GNumeric from './GNumeric.vue'
import { props } from '~/models/SiteUnitPrice'
import GMixinInput from '~/components/mixins/GMixinInput'
export default {
  components: { GDate, GTreeviewUnitPrices, GDialogEditor, GNumeric },
  mixins: [props, GMixinInput],
  data() {
    return {
      dialog: false,
      editItem: this.$UnitPrice(this.$store),
      unitPricesRule: (v) => {
        if (!v.length) return '単価が1つも設定されていません'
        if (v.some((item) => !item.price && item.price !== 0)) {
          return '単価の設定されていない回収品目があります'
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
    <v-input :value="unitPrices" :rules="[unitPricesRule]">
      <g-treeview-unit-prices
        :value="unitPrices"
        dense
        selection-type="leaf"
        selectable
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
          suffix="円"
        />
      </template>
    </g-dialog-editor>
  </div>
</template>

<style></style>
