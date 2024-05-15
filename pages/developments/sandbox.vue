<template>
  <a-collection-controller
    v-slot="{ editor, form, table, submit, cancel }"
    :actions="['edit', 'delete']"
    :default-item="{
      siteId: selectedSite?.docId || '',
      date,
    }"
    :disabled-form="!selectedIndex && selectedIndex !== 0"
    :form-props="{
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
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-card
            outlined
            class="overflow-y-auto"
            :height="$vuetify.breakpoint.height - 48 - 24"
          >
            <div v-if="loading">
              <v-skeleton-loader
                v-for="index in order.length"
                :key="index"
                type="list-item-avatar-two-line"
              />
            </div>
            <v-list v-else>
              <v-list-item-group
                v-model="selectedIndex"
                mandatory
                color="primary"
              >
                <v-list-item
                  v-for="(site, index) of order"
                  :key="index"
                  two-line
                >
                  <v-list-item-avatar>
                    {{ index + 1 }}
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ site.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ site.fullAddress }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card outlined>
            <v-card-title>
              {{ selectedSite?.name || '排出現場を選択してください' }}
            </v-card-title>
            <v-card-subtitle>
              {{ selectedSite?.fullAddress || '--' }}
            </v-card-subtitle>
            <v-container>
              <v-form v-bind="form.attrs">
                <g-input-route-collection-result
                  v-bind="editor.attrs"
                  hide-date
                  v-on="editor.on"
                />
              </v-form>
            </v-container>
            <v-card-actions class="justify-space-between">
              <v-btn v-bind="cancel.attrs" v-on="cancel.on">cancel</v-btn>
              <v-btn color="primary" v-bind="submit.attrs" v-on="submit.on"
                >submit</v-btn
              >
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
  </a-collection-controller>
</template>

<script>
import { where } from 'firebase/firestore'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GInputRouteCollectionResult from '~/components/molecules/inputs/GInputRouteCollectionResult.vue'
import ACollectionController from '~/components/atoms/ACollectionController.vue'
export default {
  components: {
    GDataTable,
    GInputRouteCollectionResult,
    ACollectionController,
  },
  props: {
    date: { type: String, default: '2024-04-01', required: true },
    routeId: { type: String, default: 'BMXoI77RLbMOQ9YEjTEp', required: true },
  },
  data() {
    return {
      items: [],
      loading: false,
      model: this.$RouteCollectionResult(),
      route: this.$Route(),
      selectedIndex: null,
      sites: [],
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
      return this.route[this.dayOfWeek].map((siteId) => {
        const site = this.sites.find(({ docId }) => docId === siteId)
        return site || this.$Site()
      })
    },
    selectedSite() {
      if (!this.selectedIndex && this.selectedIndex !== 0) return this.$Site()
      return this.order[this.selectedIndex]
    },
  },
  watch: {
    selectedSite(newVal, oldVal) {
      if (newVal === oldVal) return
      this.subscribe()
    },
  },
  created() {
    this.$watch(
      () => [this.$props.routeId, this.$props.date],
      (newVal, oldVal) => {
        if (newVal === oldVal) return
        this.fetchOrder()
      },
      { immediate: true }
    )
  },
  destroyed() {
    this.model.unsubscribe()
  },
  methods: {
    async fetchOrder() {
      try {
        this.loading = true
        await this.route.fetch(this.routeId)
        this.sites = await this.route.getSites(this.dayOfWeek)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
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
