<script>
import ADocumentController from '~/components/atoms/ADocumentController.vue'
import GActionCardDetailCustomer from '~/components/molecules/cards/GActionCardDetailCustomer.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputCustomer from '~/components/molecules/inputs/GInputCustomer.vue'
export default {
  components: {
    ADocumentController,
    GDialogEditor,
    GInputCustomer,
    GActionCardDetailCustomer,
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
    label: { type: String, default: '取引先', required: false },
  },
  data() {
    return {
      editModel: this.$Customer(),
      listener: this.$Customer(),
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
        <g-input-customer v-bind="editor.attrs" v-on="editor.on" />
      </template>
    </g-dialog-editor>
    <g-action-card-detail-customer v-bind="card.attrs" v-on="card.on" />
  </a-document-controller>
</template>

<style></style>
