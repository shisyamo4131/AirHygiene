<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GActionCardSimpleSite from '../molecules/cards/GActionCardSimpleSite.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputSite from '../molecules/inputs/GInputSite.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GDataIterator from '../molecules/tables/GDataIterator.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDialogEditor,
    AIconRegist,
    GInputSite,
    GDataIterator,
    GActionCardSimpleSite,
  },
  props: {
    label: { type: String, default: '排出場所', required: false },
    dialogProps: {
      type: Object,
      default: () => ({ 'max-width': 600 }),
      required: false,
    },
  },
}
</script>

<template>
  <a-collection-controller
    v-bind="{ ...$attrs, ...$props }"
    model-id="Site"
    v-on="$listeners"
  >
    <template #default="{ dialog, table, model, search }">
      <v-toolbar dense flat>
        <g-text-field-search v-bind="search.attrs" v-on="search.on" />
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" icon v-on="on">
              <a-icon-regist />
            </v-btn>
          </template>
          <template #form>
            <g-input-site v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <slot name="table" v-bind="{ attrs: table.attrs, on: table.on }">
        <g-data-iterator v-bind="table.attrs" v-on="table.on">
          <template #col="{ attrs, on }">
            <g-action-card-simple-site v-bind="attrs" v-on="on" />
          </template>
        </g-data-iterator>
      </slot>
    </template>
  </a-collection-controller>
</template>

<style></style>
