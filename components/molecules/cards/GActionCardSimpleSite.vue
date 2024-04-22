<script>
/**
 * ## GActionCardDetailSite
 * @author shisyamo4131
 */
import GActionCard from './GActionCard.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GActionCard },
}
</script>

<template>
  <g-action-card v-slot="{ item }" v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      {{ item.abbr }}
    </v-card-title>
    <v-card-subtitle>{{ item.abbrKana }}</v-card-subtitle>
  </g-action-card>
</template>

<style></style>
