<script>
class ItemNode {
  #store
  constructor(store, item) {
    this.#store = store
    this.id = ''
    this.children = []
    Object.defineProperties(this, {
      name: {
        enumerable: false,
        get() {
          if (!this.id) return ''
          const item = this.#store.getters['Items/get'](this.id)
          return `${item.code}: ${item.name}`
        },
      },
    })
    this.initialize(item)
  }

  initialize(item) {
    this.id = item?.id || ''
    this.children = 'children' in item ? item.children : []
  }
}
export default {
  props: {
    ignorePrice: { type: Boolean, default: false, required: false },
  },
  computed: {
    selectedItems: {
      get() {
        const result = (this.$attrs?.value || []).map((item) => {
          return this.$UnitPrice(item)
        })
        return result
      },
      set(v) {
        // NOTE
        // If props.ignorePrice is true, the price of the items is automatically
        // set to 0, so there is no need to set it here.
        const result = v.map((item) => JSON.parse(JSON.stringify(item)))
        this.$emit('input', result)
      },
    },
    items() {
      const allItems = this.$store.getters['Items/sorted']
      const allUnits = this.$store.getters['Units/sorted']
      const result = this.$ITEM_GROUP_ARRAY.reduce((sum, group, index) => {
        /* Push TOP-NODE. */
        sum.push({ id: group.value, name: group.text, children: [] })
        /* Get Items specified by group. */
        const groupedItems = allItems.filter(
          (item) => item.group === group.value
        )
        /* Create ITEM-NODES of TOP-NODE's children. */
        const itemNodes = groupedItems.reduce((sum, item) => {
          /* Create UNIT-NODES of ITEM-NODE's children */
          const unitPriceNodes = allUnits.map((unit) => {
            const unitPriceNode = this.$UnitPrice({
              itemId: item.docId,
              unitId: unit.docId,
            })
            /* Set price and convertWeight if $attrs.value has same object. */
            const selectedItem = (this.$attrs?.value || []).find(
              ({ id }) => id === unitPriceNode.id
            )
            if (selectedItem) {
              unitPriceNode.price = selectedItem.price
              unitPriceNode.convertWeight = selectedItem.convertWeight
            }
            /* Set price to 0 if props.ignorePrice is true. */
            if (this.ignorePrice) unitPriceNode.price = 0
            return unitPriceNode
          })
          /* Create ITEM-NODE with UNIT-NODES as own children. */
          const itemNode = new ItemNode(this.$store, {
            id: item.docId,
            children: unitPriceNodes,
          })
          sum.push(itemNode)
          return sum
        }, [])
        sum[index].children = itemNodes
        /* 'disabled' property to be true if ITEM-NODES has no children. */
        if (!itemNodes.length) sum[index].disabled = true
        return sum
      }, [])
      const excludedNoChildren = result.filter(
        ({ children }) => children.length
      )
      return excludedNoChildren
    },
  },
  methods: {
    updatePrice(id, price) {
      const duplicated = this.selectedItems.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      const index = duplicated.findIndex((item) => item.id === id)
      if (index === -1) return
      duplicated[index].price = price
      this.$emit('input', duplicated)
    },
  },
}
</script>

<template>
  <v-treeview
    v-bind="$attrs"
    v-model="selectedItems"
    return-object
    :items="items"
    v-on="$listeners"
  >
    <template #prepend="{ leaf, item, selected }">
      <v-icon
        v-if="
          leaf && selected && (item.convertWeight == null || item.price == null)
        "
        color="error"
        small
      >
        mdi-alert-circle
      </v-icon>
    </template>
    <template #label="{ leaf, item, selected }">
      <div v-if="!leaf">{{ item.name }}</div>
      <div v-else-if="selected" class="d-flex align-center">
        <div class="text-truncate" style="min-width: 120px">
          {{ item.name }}
        </div>
        <div>
          {{
            `単価: ${
              item.price != null ? item.price.toLocaleString() : '--'
            } 円 / 換算重量: ${
              item.convertWeight != null
                ? item.convertWeight.toLocaleString()
                : '--'
            } kg`
          }}
        </div>
      </div>
      <div v-else class="d-flex align-center">
        <div class="text-truncate" style="min-width: 120px">
          {{ item.name }}
        </div>
      </div>
    </template>
    <template #append="{ leaf, selected, item }">
      <v-btn
        v-if="leaf && selected"
        icon
        color="primary"
        text
        @click="$emit('click:priceSet', item)"
        ><v-icon>mdi-cog</v-icon></v-btn
      >
    </template>
  </v-treeview>
</template>

<style></style>
