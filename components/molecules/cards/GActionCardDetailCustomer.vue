<script>
import GActionCard from './GActionCard.vue'
/**
 * ## GActionCardDetailCustomer
 * @author shisyamo4131
 */
export default {
  components: { GActionCard },
  data() {
    return {
      tab: null,
    }
  },
  methods: {
    favorite(item) {
      const model = this.$Customer(item)
      model.favorite = !model.favorite
      model.update()
    },
  },
}
</script>

<template>
  <g-action-card v-bind="$attrs" v-on="$listeners">
    <template #default="{ item }">
      <v-card-title class="justify-space-between" style="min-width: 0">
        <span class="text-truncate">{{ item.name1 }}</span>
      </v-card-title>
      <v-card-subtitle>{{ item.name2 }}</v-card-subtitle>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab>基本情報</v-tab>
        <v-tab>請求情報</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> CODE </v-list-item-subtitle>
              <v-list-item-title> {{ item.code }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
        <v-tab-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> 請求先住所 </v-list-item-subtitle>
              <v-list-item-title>
                〒{{ item.sendToZipcode }}
              </v-list-item-title>
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
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> 端数処理 </v-list-item-subtitle>
              <v-list-item-title>
                {{ $ROUNDING[item.rounding] }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-tab-item>
      </v-tabs-items>
    </template>
    <template #prepend-actions="{ item }">
      <v-btn icon @click="favorite(item)">
        <v-icon :color="item.favorite ? 'yellow' : undefined">mdi-star</v-icon>
      </v-btn>
    </template>
  </g-action-card>
</template>

<style></style>
