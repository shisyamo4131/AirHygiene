<script>
import AIconClose from '~/components/atoms/icons/AIconClose.vue'
import AIconSubmit from '~/components/atoms/icons/AIconSubmit.vue'
import EditMode from '~/components/mixins/EditMode.js'
/**
 * ### GCardEditor
 * @author shisyamo4131
 */
export default {
  components: { AIconClose, AIconSubmit },
  /***************************************************************************
   * MIXINS
   ***************************************************************************/
  mixins: [EditMode],
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
    label: { type: String, default: undefined, required: false },
    loading: { type: Boolean, default: false, required: false },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    mode() {
      if (!this.editMode) return 'undefined'
      if (this.editMode === 'REGIST') return '登録'
      if (this.editMode === 'UPDATE') return '変更'
      return '削除'
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    scrollToTop() {
      const el = document.getElementById(`scroll-container-${this._uid}`)
      if (el) el.scrollTop = 0
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      <span>{{ `${label}${mode}` }}</span>
    </v-card-title>
    <v-card-text :id="`scroll-container-${_uid}`" class="py-5 px-6">
      <slot name="default" v-bind="{ editMode, loading }" />
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn icon :disabled="loading" @click="$emit('click:cancel')">
        <a-icon-close />
      </v-btn>
      <v-btn
        icon
        :disabled="loading"
        :loading="loading"
        @click="$emit('click:submit')"
      >
        <a-icon-submit />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
