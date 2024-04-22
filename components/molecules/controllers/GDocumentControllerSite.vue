<script>
import ADocumentController from '../../atoms/ADocumentController.vue'
import GDialogEditor from '../dialogs/GDialogEditor.vue'
import GInputSite from '../inputs/GInputSite.vue'
export default {
  components: {
    ADocumentController,
    GDialogEditor,
    GInputSite,
  },
}
</script>

<template>
  <a-document-controller
    v-bind="$attrs"
    label="排出場所"
    model-id="Site"
    v-on="$listeners"
  >
    <template #default="{ dialog, editor, card }">
      <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
        <template #form>
          <g-input-site v-bind="editor.attrs" v-on="editor.on" />
        </template>
      </g-dialog-editor>
      <slot name="card" v-bind="{ attrs: card.attrs, on: card.on }" />
    </template>
  </a-document-controller>
</template>

<style></style>
