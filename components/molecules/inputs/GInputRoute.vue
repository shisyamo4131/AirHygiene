<script>
/**
 * ## GInputRoute
 * @author shisyamo4131
 */
import GDataTableItemUnits from '../tables/GDataTableItemUnits.vue'
import GCardEditor from '../cards/GCardEditor.vue'
import GTextField from './GTextField.vue'
import GInputItemUnit from './GInputItemUnit.vue'
import { props } from '~/models/Route'
import GMixinInput from '~/components/mixins/GMixinInput'
import AArrayController from '~/components/atoms/AArrayController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTextField,
    AArrayController,
    GInputItemUnit,
    GDataTableItemUnits,
    GCardEditor,
  },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [props, GMixinInput],
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      model: this.$ItemUnit(),
    }
  },
}
</script>

<template>
  <div>
    <g-text-field
      :value="code"
      label="ルートCODE"
      required
      @input="$emit('update:code', $event)"
    />
    <g-text-field
      :value="name"
      label="ルート名"
      required
      @input="$emit('update:name', $event)"
    />
    <a-array-controller
      :actions="['edit', 'delete']"
      :dialog-props="{ maxWidth: 480 }"
      direct-delete
      label="回収品目"
      :model="model"
      :rules="[
        (v) => !!v.length || '1つ以上の登録が必要です。',
        (v) =>
          !!v.filter(({ forReport }) => forReport).length ||
          '実績報告対象が選択されていません。',
      ]"
      :value="itemUnits"
      @input="$emit('update:itemUnits', $event)"
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
          <g-card-editor v-bind="card.attrs" v-on="card.on">
            <v-form v-bind="form.attrs" v-on="form.on">
              <g-input-item-unit v-bind="editor.attrs" v-on="editor.on" />
            </v-form>
          </g-card-editor>
        </v-dialog>
        <v-input v-bind="input.attrs" v-on="input.on">
          <g-data-table-item-units
            style="width: 100%"
            v-bind="table.attrs"
            :items="table.attrs.items"
            @update:items="$emit('update:itemUnits', $event)"
            v-on="table.on"
          />
        </v-input>
      </template>
    </a-array-controller>
  </div>
</template>

<style></style>
