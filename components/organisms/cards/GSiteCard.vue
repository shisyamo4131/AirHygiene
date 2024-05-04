<script>
import ADocumentController from '~/components/atoms/ADocumentController.vue'
import GActionCardDetailSite from '~/components/molecules/cards/GActionCardDetailSite.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputSite from '~/components/molecules/inputs/GInputSite.vue'
export default {
  components: {
    ADocumentController,
    GDialogEditor,
    GInputSite,
    GActionCardDetailSite,
  },
  props: {
    actions: {
      type: Array,
      default: () => ['edit', 'delete'],
      required: false,
    },
    dialogProps: {
      type: Object,
      default: () => ({ maxWidth: 600 }),
    },
    docId: { type: String, required: true },
    label: { type: String, default: '排出場所', required: false },
  },
  data() {
    return {
      editModel: this.$Site(),
      listener: this.$Site(),
    }
  },
  watch: {
    docId: {
      handler(v) {
        this.listener.unsubscribe()
        if (!v) return
        this.listener.subscribeDoc(v)
      },
      immediate: true,
    },
  },
  destroyed() {
    this.listener.unsubscribe()
  },
}
</script>

<template>
  <a-document-controller
    v-slot="{ card, dialog, editor }"
    v-bind="{ ...$props, ...$attrs }"
    :current-model="listener"
    :model="editModel"
    v-on="$listeners"
  >
    <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
      <template #form>
        <g-input-site v-bind="editor.attrs" v-on="editor.on" />
      </template>
    </g-dialog-editor>
    <g-action-card-detail-site v-bind="card.attrs" v-on="card.on" />
  </a-document-controller>
</template>

<style></style>
