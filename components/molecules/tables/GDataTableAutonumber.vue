<script>
/**
 * ### GDataTableAutonumber
 * @author shisyamo4131
 */
import GDataTable from './GDataTable.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataTable,
    StatusChip: {
      props: {
        value: { type: Boolean, default: false, required: false },
      },
      computed: {
        color() {
          return this.value ? 'primary' : 'error'
        },
        icon() {
          return this.value ? 'play' : 'stop'
        },
      },
      render(createElement) {
        return createElement(
          'v-icon',
          { attrs: { color: this.color, left: true, small: true } },
          `mdi-${this.icon}`
        )
      },
    },
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    disableSort: { type: Boolean, default: true, required: false },
    headers: {
      type: Array,
      default: () => {
        return [
          { text: 'コレクション名', value: 'collectionId' },
          { text: 'フィールド', value: 'field', filterable: false },
          {
            text: '現在値',
            value: 'current',
            align: 'right',
            filterable: false,
          },
          {
            text: '桁数',
            value: 'length',
            align: 'right',
            filterable: false,
          },
        ]
      },
    },
  },
}
</script>

<template>
  <g-data-table v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <template #[`item.collectionId`]="{ item }">
      <status-chip :value="item.status" />
      {{ item.collectionId }}
    </template>
  </g-data-table>
</template>

<style></style>
