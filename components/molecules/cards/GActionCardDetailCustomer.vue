<script>
/**
 * ## GActionCardDetailCustomer
 * @author shisyamo4131
 */
import GActionCard from './GActionCard.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GActionCard },
  data() {
    return {
      tab: null,
    }
  },
}
</script>

<template>
  <g-action-card v-slot="{ item }" v-bind="$attrs" v-on="$listeners">
    <v-card-title class="justify-space-between">
      {{ item.name1 }}
    </v-card-title>
    <v-card-subtitle>{{ item.name2 }}</v-card-subtitle>
    <v-tabs v-model="tab">
      <v-tab>基本情報</v-tab>
      <v-tab>請求情報</v-tab>
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
      </v-tab-item>
      <v-tab-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 請求先住所 </v-list-item-subtitle>
            <v-list-item-title> 〒{{ item.sendToZipcode }} </v-list-item-title>
            <v-list-item-title>
              {{ item.sendToFullAddress }}
            </v-list-item-title>
            <v-list-item-title>
              {{ item.sendToAddress2 }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 締日・回収日 </v-list-item-subtitle>
            <v-list-item-title>
              {{ $DEADLINE[item.deadline] }}締め
              {{ `${item.depositMonth}ヶ月後` }}
              {{ `${$DEADLINE[item.depositDay]}回収` }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-tab-item>
    </v-tabs-items>
  </g-action-card>
</template>

<style></style>
