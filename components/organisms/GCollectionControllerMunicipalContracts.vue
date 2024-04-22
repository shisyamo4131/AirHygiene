<script>
import ACollectionController from '../atoms/ACollectionController.vue'
import AIconRegist from '../atoms/icons/AIconRegist.vue'
// import GActionCardSimpleMunicipalContract from '../molecules/cards/GActionCardSimpleMunicipalContract.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputMunicipalContract from '../molecules/inputs/GInputMunicipalContract.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
// import GDataIterator from '../molecules/tables/GDataIterator.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDialogEditor,
    AIconRegist,
    GInputMunicipalContract,
    // GDataIterator,
    // GActionCardSimpleMunicipalContract,
  },
  props: {
    siteId: { type: String, required: true },
    label: { type: String, default: '一般廃棄物契約', required: false },
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
    model-id="MunicipalContract"
    :parent-id="siteId"
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
            <g-input-municipal-contract v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <slot name="table" v-bind="{ attrs: table.attrs, on: table.on }">
        <!-- <g-data-iterator v-bind="table.attrs" v-on="table.on">
          <template #col="{ attrs, on }">
            <g-action-card-simple-municipal-contract v-bind="attrs" v-on="on" />
          </template>
        </g-data-iterator> -->
      </slot>
    </template>
  </a-collection-controller>
</template>

<style></style>
