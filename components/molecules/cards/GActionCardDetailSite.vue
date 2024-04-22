<script>
/**
 * ## GActionCardDetailSite
 * @author shisyamo4131
 */
import GActionCard from './GActionCard.vue'
export default {
  components: { GActionCard },
  data() {
    return {
      customer: this.$Customer(),
      tab: null,
    }
  },
  watch: {
    '$attrs.item.customerId': {
      handler(v) {
        this.customer.initialize()
        if (!v) return
        this.customer.fetch(v)
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <g-action-card v-slot="{ item }" v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      {{ item.name }}
    </v-card-title>
    <v-card-subtitle>{{ customer.abbr }}</v-card-subtitle>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab>基本情報</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 住所 </v-list-item-subtitle>
            <v-list-item-title> 〒{{ item.zipcode }} </v-list-item-title>
            <v-list-item-title>
              {{ item.fullAddress }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.address2 }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 電話番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.tel }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> FAX番号 </v-list-item-subtitle>
            <v-list-item-title>
              {{ item.fax }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text v-if="item.remarks">
          {{ item.remarks }}
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </g-action-card>
</template>

<style></style>
