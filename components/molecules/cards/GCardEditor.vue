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
    scrollTo({ top = 0, left = 0, behavior = 'instant' } = {}) {
      const target = this.$refs[`scroll-container`]
      if (target) target.scrollTo({ top, left, behavior })
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <v-toolbar flat color="primary" dark dense>
      <v-toolbar-title>
        <span>{{ `${label}${mode}` }}</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text ref="scroll-container" class="py-5 px-6">
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
