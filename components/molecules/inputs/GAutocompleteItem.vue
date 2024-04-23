<script>
import GAutocomplete from './GAutocomplete.vue'
export default {
  components: { GAutocomplete },
  props: {
    autoSelectFirst: { type: Boolean, default: true, required: false },
    itemText: {
      type: [String, Array, Function],
      default: () => (item) => `${item.code}: ${item.name}`,
      required: false,
    },
    itemValue: { type: String, default: 'docId', required: false },
  },
  computed: {
    items() {
      const items = this.$store.state.Items.items
        .map((item) => item)
        .sort((a, b) => {
          if (`${a.group}${a.code}` < `${b.group}${b.code}`) return -1
          if (`${a.group}${a.code}` > `${b.group}${b.code}`) return 1
          return 0
        })
      const result = items.reduce((sum, i, index, arr) => {
        if (index === 0 || arr[index - 1].group !== i.group) {
          sum.push({ header: this.$ITEM_GROUP[i.group] })
          sum.push({ divider: true })
        }
        sum.push(i)
        return sum
      }, [])
      return result
    },
  },
}
</script>

<template>
  <g-autocomplete
    v-bind="{ ...$props, ...$attrs }"
    :items="items"
    v-on="$listeners"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </g-autocomplete>
</template>

<style></style>
