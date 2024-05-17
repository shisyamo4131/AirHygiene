<script>
import ADocumentController from '~/components/atoms/ADocumentController.vue'
import GActionCardDetailCustomer from '~/components/molecules/cards/GActionCardDetailCustomer.vue'
import GEditCard from '~/components/molecules/cards/GEditCard.vue'
import GInputCustomer from '~/components/molecules/inputs/GInputCustomer.vue'
export default {
  components: {
    ADocumentController,
    GInputCustomer,
    GActionCardDetailCustomer,
    GEditCard,
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
    v-slot="{ card, dialog, editCard, editor, form }"
    v-bind="{ ...$props, ...$attrs }"
    :current-model="listener"
    :model="editModel"
    v-on="$listeners"
  >
    <v-dialog v-bind="dialog.attrs" v-on="dialog.on">
      <g-edit-card v-bind="editCard.attrs" v-on="editCard.on">
        <v-form v-bind="form.attrs" v-on="form.on">
          <g-input-customer v-bind="editor.attrs" v-on="editor.on" />
        </v-form>
      </g-edit-card>
    </v-dialog>
    <g-action-card-detail-customer v-bind="card.attrs" v-on="card.on" />
  </a-document-controller>
</template>

<style></style>
