<script>
import ACollectionController from '../../atoms/ACollectionController.vue'
import AIconRegist from '../../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../dialogs/GDialogEditor.vue'
import GInputSiteRootContract from '../inputs/GInputSiteRootContract.vue'
import GTextFieldSearch from '../inputs/GTextFieldSearch.vue'
export default {
  components: {
    ACollectionController,
    GTextFieldSearch,
    GDialogEditor,
    AIconRegist,
    GInputSiteRootContract,
  },
  props: {
    siteId: { type: String, required: true },
    label: { type: String, default: 'ルート回収契約', required: false },
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
    model-id="SiteRootContract"
    :parent-id="siteId"
    :dialog-props="{ maxWidth: 840 }"
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
            <g-input-site-root-contract v-bind="model.attrs" v-on="model.on" />
          </template>
        </g-dialog-editor>
      </v-toolbar>
      <slot name="table" v-bind="{ attrs: table.attrs, on: table.on }" />
    </template>
  </a-collection-controller>
</template>

<style></style>
