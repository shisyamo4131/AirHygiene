<script>
import draggable from 'vuedraggable'
import GChipSiteStatus from '../chips/GChipSiteStatus.vue'
import GDataTable from './GDataTable.vue'
/**
 * ### GDataTableRootOrder
 * props.items must be an array of site-object.
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GDataTable, draggable, GChipSiteStatus },
  /***************************************************************************
   * MODEL
   ***************************************************************************/
  model: { prop: 'items', event: 'input' },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    disableSort: { type: Boolean, default: true, required: false },
    draggableSort: { type: Boolean, default: false, required: false },
    group: { type: [String, Object], default: 'sites', required: false },
    headers: {
      type: Array,
      default: () => {
        return [
          { text: '', value: 'handle' },
          { text: '排出場所', value: 'name' },
          { text: '状態', value: 'status', align: 'center' },
        ]
      },
    },
    items: { type: Array, default: () => [], required: false },
    itemsPerPage: { type: Number, default: -1, required: false },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    scrollToTop() {
      this.$refs[`table-${this._uid}`].scrollToTop()
    },
  },
}
</script>

<template>
  <g-data-table
    :ref="`table-${_uid}`"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  >
    <template v-if="items.length" #body="props">
      <draggable
        :value="props.items"
        tag="tbody"
        :group="group"
        handle=".handle"
        :sort="draggableSort"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
      >
        <tr v-for="(item, index) of props.items" :key="index">
          <td>
            <v-icon class="handle" style="cursor: grab" small>mdi-menu</v-icon>
          </td>
          <td>
            <slot name="item.name" v-bind="{ item, index }">
              <div>{{ item.name }}</div>
              <div class="text-caption text--secondary">
                {{ item.fullAddress }}
              </div>
            </slot>
          </td>
          <td class="text-center">
            <g-chip-site-status :value="item.status" x-small />
          </td>
        </tr>
      </draggable>
    </template>
  </g-data-table>
</template>

<style></style>
