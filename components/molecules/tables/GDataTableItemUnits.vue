<script>
import GDataTable from './GDataTable.vue'
export default {
  components: { GDataTable },
  props: {
    disableSort: { type: Boolean, default: true, required: false },
    items: { type: Array, default: () => [], required: false },
  },
  computed: {
    headers() {
      const result = [
        { text: '回収品目', value: 'itemId' },
        { text: '単位', value: 'unitId' },
        {
          text: '実績報告',
          value: 'forReport',
          align: 'right',
          sortable: false,
        },
      ]
      return result
    },
  },
  methods: {
    onForReportChanged(index, val) {
      const result = this.items.map((item, idx) => {
        item.forReport = idx === index
        return item
      })
      this.$emit('update:items', result)
    },
  },
}
</script>

<template>
  <g-data-table
    v-bind="{ ...$props, ...$attrs }"
    :headers="headers"
    v-on="$listeners"
  >
    <template #body="props">
      <tbody>
        <tr v-for="(item, index) of props.items" :key="index">
          <td>
            {{ $store.getters['Items/get'](item.itemId).abbr }}
          </td>
          <td>
            {{ $store.getters['Units/get'](item.unitId).abbr }}
          </td>
          <td class="text-right">
            <v-simple-checkbox
              color="primary"
              :disabled="item.unitId !== 'SYSTEM-UNIT-001'"
              :value="item.forReport"
              @input="onForReportChanged(index, $event)"
            />
          </td>
          <td class="text-right">
            <v-btn icon small @click="$emit('click:delete', item)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </g-data-table>
</template>

<style></style>
