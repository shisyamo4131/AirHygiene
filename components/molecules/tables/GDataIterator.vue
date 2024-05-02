<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: { type: Array, default: () => [], required: false },
    cols: { type: Object, default: () => ({}), required: false },
    colProps: { type: Object, default: () => ({}), required: false },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    colOn() {
      return {
        'click:edit': (item) => this.$emit('click:edit', item),
        'click:delete': (item) => this.$emit('click:delete', item),
        'click:detail': (item) => this.$emit('click:detail', item),
      }
    },
  },
}
</script>

<template>
  <v-data-iterator v-bind="$attrs" hide-default-footer v-on="$listeners">
    <template #default="props">
      <slot name="default" v-bind="{ ...props, actions }">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item, index) of props.items"
              :key="index"
              v-bind="cols"
            >
              <slot
                name="col"
                v-bind="{ attrs: { item, actions }, on: colOn }"
              />
            </v-col>
          </v-row>
        </v-container>
      </slot>
    </template>
  </v-data-iterator>
</template>

<style></style>
