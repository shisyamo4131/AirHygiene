<script>
import AIconClose from '~/components/atoms/icons/AIconClose.vue'
import AIconSubmit from '~/components/atoms/icons/AIconSubmit.vue'
import EditMode from '~/components/mixins/EditMode.js'
/**
 * ## GDialogEditor
 * データ編集用のVCardコンポーネントを内包したVDialogコンポーネントです。
 *
 * ### PROPS
 *
 * #### editMode
 * molecules/mixins/EditMode.jsを読み込んでいます。
 * 編集対象データの編集モードです。
 * .sync修飾子とともに使用可能で、VDialogが閉じられた時（$attrs.valueがfalseに変更された時）、
 * "REGIST"に更新されます。
 *
 * #### editModel
 * FireModelを継承したModelオブジェクトを受け取ります。
 * ユーザーがSUBMITボタンをクリックした際、props.editModeが指定する編集モードに
 * 合わせたデータ更新処理（create()、update()、delete()）を行います。
 * また、VDialogが閉じられた時（$attrs.valueがfalseに変更された時）、
 * props.editModelのinitialize()が実行されます。
 *
 * #### label
 * VCardTitleに表示させるラベルを文字列で指定します。
 *
 * #### persistent
 * VDialogのpersistentプロパティです。
 * データ編集に使用されるコンポーネントであるため、誤操作でVDialogが閉じてしまわないよう、
 * 規定値をtrueにしています。
 *
 * #### scrollable
 * VDialogのscrollableプロパティです。
 * 大きなコンポーネントが表示されるよう、規定値をtrueにしています。
 * また、VDialogが閉じられた時（$attrs.valueがtrueからfalseに変更された時）に、
 * スクロールポジションがトップに戻るようになっています。
 * 同時に、VFormのresetValidation()を実行し、formスロット内に配置された
 * INPUTコンポーネントのValidationを初期化しています。
 *
 * ### SLOTS
 *
 * #### activator
 * VDialogのactivatorスロットをそのまま提供しています。
 *
 * #### form
 * データを編集するためのINPUTコンポーネント群を配置するためのスロットです。
 * props.editModelの各プロパティをattrsとして、各プロパティの値を更新するための
 * リスナーをonとしてスロットプロパティを提供します。
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AIconClose, AIconSubmit },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [EditMode],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    label: { type: String, default: undefined, required: false },
    loading: { type: Boolean, default: false, required: false },
    persistent: { type: Boolean, default: true, required: false },
    scrollable: { type: Boolean, default: true, required: false },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    mode() {
      if (this.editMode === 'REGIST') return '登録'
      if (this.editMode === 'UPDATE') return '変更'
      return '削除'
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    '$attrs.value'(v) {
      if (!v) this.reset()
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    reset() {
      document.getElementById(`scroll-container-${this._uid}`).scrollTop = 0
      this.$refs.form.resetValidation()
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
    submit() {
      if (!this.validate()) return
      this.$emit('click:submit')
    },
  },
}
</script>

<template>
  <v-dialog
    v-bind="$attrs"
    :persistent="persistent"
    :scrollable="scrollable"
    v-on="$listeners"
  >
    <template #activator="props">
      <slot name="activator" v-bind="props" />
    </template>
    <v-card>
      <v-card-title class="justify-space-between">
        <span>{{ `${label}${mode}` }}</span>
      </v-card-title>
      <v-card-text :id="`scroll-container-${_uid}`" class="py-5 px-6">
        <v-form ref="form" :disabled="loading">
          <slot name="form" />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn icon :disabled="loading" @click="$emit('click:cancel')">
          <a-icon-close />
        </v-btn>
        <v-btn icon :disabled="loading" :loading="loading" @click="submit">
          <a-icon-submit />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style></style>
