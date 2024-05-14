<template>
  <v-container>
    <v-row>
      <v-col>
        <g-data-table-root-order loading height="300" loading-text="aaa" />
      </v-col>
      <v-col>
        <g-data-table loading />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a-data-table loading />
      </v-col>
      <v-col>
        <v-data-table loading />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ADataTable from '~/components/atoms/tables/ADataTable.vue'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GDataTableRootOrder from '~/components/molecules/tables/GDataTableRootOrder.vue'
export default {
  components: { GDataTableRootOrder, GDataTable, ADataTable },
}
</script>

<style></style>
