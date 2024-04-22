<script>
import ADocumentController from '../../atoms/ADocumentController.vue'
import GDialogEditor from '../dialogs/GDialogEditor.vue'
import GInputCustomer from '../inputs/GInputCustomer.vue'
export default {
  components: {
    ADocumentController,
    GDialogEditor,
    GInputCustomer,
  },
}
</script>

<template>
  <a-document-controller
    v-bind="$attrs"
    label="取引先"
    model-id="Customer"
    v-on="$listeners"
  >
    <template #default="{ dialog, editor, card }">
      <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
        <template #form>
          <g-input-customer v-bind="editor.attrs" v-on="editor.on" />
        </template>
      </g-dialog-editor>
      <slot name="card" v-bind="{ attrs: card.attrs, on: card.on }" />
    </template>
  </a-document-controller>
</template>

<style></style>
