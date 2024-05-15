<script>
import ACollectionController from '~/components/atoms/ACollectionController.vue'
import GBtnRegistIcon from '~/components/molecules/btns/GBtnRegistIcon.vue'
import GDialogEditor from '~/components/molecules/dialogs/GDialogEditor.vue'
import GInputSiteRouteContract from '~/components/molecules/inputs/GInputSiteRouteContract.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
export default {
  components: {
    ACollectionController,
    GDataTable,
    GDialogEditor,
    GInputSiteRouteContract,
    GBtnRegistIcon,
  },
  props: {
    actions: {
      type: Array,
      default: () => ['edit', 'delete'],
    },
    siteId: { type: String, required: true },
    dialogProps: {
      type: Object,
      default: () => ({ maxWidth: 720 }),
      required: false,
    },
    tableProps: {
      type: Object,
      default: () => ({
        headers: [
          { text: '適用開始日', value: 'startAt' },
          {
            text: '最低保証',
            value: 'minimumCharge',
            align: 'right',
            sortable: false,
          },
          {
            text: '月極請求',
            value: 'fixedCharge',
            align: 'right',
            sortable: false,
          },
        ],
        'sort-by': 'startAt',
        'sort-desc': true,
      }),
    },
  },
  data() {
    return {
      items: [],
      model: this.$SiteRouteContract(),
      listener: this.$SiteRouteContract(),
    }
  },
  watch: {
    siteId: {
      handler(v) {
        if (v) {
          this.model = this.$SiteRouteContract(v)
          this.listener = this.$SiteRouteContract(v)
          this.items = this.listener.subscribe()
        }
        if (!v) this.listener.unsubscribe()
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
  <a-collection-controller
    v-slot="{ dialog, editor, table }"
    v-bind="{ ...$props, ...$attrs }"
    :default-item="{ siteId }"
    :items="items"
    label="ルート回収契約"
    :model="model"
    v-on="$listeners"
  >
    <v-card>
      <v-card-title class="justify-space-between">
        ルート回収契約
        <g-dialog-editor v-bind="dialog.attrs" v-on="dialog.on">
          <template #activator="{ attrs, on }">
            <g-btn-regist-icon v-bind="attrs" v-on="on" />
          </template>
          <template #form>
            <g-input-site-route-contract
              v-bind="editor.attrs"
              v-on="editor.on"
            />
          </template>
        </g-dialog-editor>
      </v-card-title>
      <v-container>
        <g-data-table v-bind="table.attrs" v-on="table.on">
          <template #[`item.minimumCharge`]="{ item }">
            {{
              item.minimumCharge != null
                ? item.minimumCharge.toLocaleString()
                : '--'
            }}
          </template>
          <template #[`item.fixedCharge`]="{ item }">
            {{
              item.fixedCharge != null
                ? item.fixedCharge.toLocaleString()
                : '--'
            }}
          </template>
        </g-data-table>
      </v-container>
    </v-card>
  </a-collection-controller>
</template>

<style></style>
