<template>
  <div>
    <v-data-table
      :headers="[
        { text: 'item', value: 'itemId' },
        { text: 'unit', value: 'unitId' },
        { text: 'price', value: 'price' },
      ]"
      :items="value"
    />
    <g-input-unit-prices v-model="value" />
  </div>
</template>

<script>
import GInputUnitPrices from '~/components/molecules/treeviews/GTreeviewUnitPrices.vue'
export default {
  components: { GInputUnitPrices },
  data() {
    return {
      value: [
        {
          id: 'SD7mw8KjXEDvvIe48M7C-Gsz2Xba85Il8VSVQC42O',
          itemId: 'SD7mw8KjXEDvvIe48M7C',
          unitId: 'Gsz2Xba85Il8VSVQC42O',
          name: '可燃物-kg',
          price: 30,
        },
      ],
    }
  },
}
</script>

<style></style>
