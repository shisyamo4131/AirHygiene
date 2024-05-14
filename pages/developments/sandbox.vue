<template>
  <a-collection-controller
    :actions="['edit', 'delete']"
    :default-item="{
      siteId: selectedSite?.docId || '',
      date,
    }"
    :form-props="{
      disabled: !selectedSite,
      hideDate: true,
    }"
    :items="items"
    :model="model"
    :table-props="{
      headers: [
        { text: '品目', value: 'itemId' },
        { text: '数量', value: 'amountString' },
      ],
    }"
  >
    <template #default="{ editor, form, table, submit, cancel }">
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-card
              outlined
              class="overflow-y-auto"
              :height="$vuetify.breakpoint.height - 48 - 24"
            >
              <v-list-item-group v-model="selectedSite">
                <v-list-item
                  v-for="(site, index) of order"
                  :key="index"
                  :value="site"
                  dense
                >
                  <v-list-item-icon>
                    {{ index + 1 }}
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ site.name }}
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card outlined>
              <v-card-title>
                {{ selectedSite?.name || '排出現場を選択してください' }}
              </v-card-title>
              <v-card-subtitle>
                {{ selectedSite?.fullAddress || '--' }}
              </v-card-subtitle>
              <v-container>
                <v-form v-bind="form.attrs">
                  <g-input-root-collection-result
                    v-bind="editor.attrs"
                    hide-date
                    v-on="editor.on"
                  />
                </v-form>
              </v-container>
              <v-card-actions>
                <v-btn color="primary" @click="submit">submit</v-btn>
                <v-btn color="primary" @click="cancel">cancel</v-btn>
              </v-card-actions>
            </v-card>
            <g-data-table v-bind="table.attrs" v-on="table.on">
              <template #[`item.itemId`]="{ item }">
                {{ $store.getters['Items/get'](item.itemId).abbr }}
              </template>
              <template #[`item.amountString`]="{ item }">
                {{ item.amountString }}
                {{ $store.getters['Units/get'](item.unitId).abbr }}
              </template>
            </g-data-table>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </a-collection-controller>
</template>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GInputRootCollectionResult from '~/components/molecules/inputs/GInputRootCollectionResult.vue'
import ACollectionController from '~/components/atoms/ACollectionController.vue'
export default {
  components: { GDataTable, GInputRootCollectionResult, ACollectionController },
  props: {
    date: { type: String, default: '2024-04-01', required: true },
    rootId: { type: String, default: 'i3VIA52YMgxsgmRhJTIv', required: true },
  },
  data() {
    return {
      items: [],
      loadedSites: [],
      model: this.$RootCollectionResult(),
      root: this.$Root(),
      selectedSite: null,
    }
  },
  computed: {
    dayOfWeek() {
      const dayOfWeeks = {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat',
      }
      return dayOfWeeks[this.$dayjs(this.date).format('d')]
    },
    order() {
      return this.root[this.dayOfWeek].map((siteId) => {
        const site = this.loadedSites.find(({ docId }) => docId === siteId)
        return site || this.$Site()
      })
    },
  },
  watch: {
    rootId: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.fetchOrder()
      },
      immediate: true,
    },
    date: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.fetchOrder()
      },
      immediate: true,
    },
    selectedSite(newVal, oldVal) {
      if (newVal === oldVal) return
      this.subscribe()
    },
  },
  destroyed() {
    this.model.unsubscribe()
  },
  methods: {
    async fetchOrder() {
      await this.root.fetch(this.rootId)
      const siteIds = [
        ...new Set(this.root[this.dayOfWeek].map((siteId) => siteId)),
      ]
      const chunkedSiteIds = siteIds.flatMap((_, i, a) =>
        i % 30 ? [] : [a.slice(i, i + 30)]
      )
      const colRef = collection(this.$firestore, 'Sites')
      for (const ids of chunkedSiteIds) {
        const q = query(colRef, where('docId', 'in', ids))
        const querySnapshot = await getDocs(q)
        querySnapshot.docs.forEach((doc) => {
          this.loadedSites.push(doc.data())
        })
      }
    },
    subscribe() {
      this.model.unsubscribe()
      const siteId = this.selectedSite?.docId || ''
      if (!siteId) return
      this.items = this.model.subscribe(undefined, [
        where('siteId', '==', siteId),
      ])
    },
  },
}
</script>

<style></style>
