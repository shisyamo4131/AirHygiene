<script>
import AIconClose from '~/components/atoms/icons/AIconClose.vue'
import AIconSubmit from '~/components/atoms/icons/AIconSubmit.vue'
import EditMode from '~/components/mixins/EditMode.js'
/**
 * ### GCardEditor
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
    formProps: { type: Object, default: () => ({}), required: false },
    label: { type: String, default: undefined, required: false },
    loading: { type: Boolean, default: false, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      formRef: null,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    mode() {
      if (this.editMode === 'REGIST') return '登録'
      if (this.editMode === 'UPDATE') return '変更'
      if (this.editMode === 'DELETE') return '削除'
      return undefined
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    onClickSubmit() {
      if (!this.validate()) return
      this.$emit('click:submit')
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    scrollTo({ top = 0, left = 0, behavior = 'instant' } = {}) {
      const target = this.$refs[`scroll-container`]
      if (target) target.scrollTo({ top, left, behavior })
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-toolbar flat color="primary" dark dense>
      <v-toolbar-title>
        <span>{{ `${label}[${mode}]` }}</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$emit('click:cancel')"><a-icon-close /></v-btn>
    </v-toolbar>
    <v-card-text ref="scroll-container" class="py-5 px-6">
      <v-form ref="form" v-bind="{ disabled: loading, ...formProps }">
        <slot name="default" />
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn small :disabled="loading" @click="$emit('click:cancel')"
        ><a-icon-close left small />cancel</v-btn
      >
      <v-btn
        :disabled="loading"
        :loading="loading"
        color="primary"
        small
        @click="onClickSubmit"
        ><a-icon-submit left small />submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style></style>
