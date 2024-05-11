<script>
import {
  collection,
  // doc,
  // getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import draggable from 'vuedraggable'
import GDataTable from '../molecules/tables/GDataTable.vue'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GChipSiteStatus from '../molecules/chips/GChipSiteStatus.vue'
import GRadioGroup from '../molecules/inputs/GRadioGroup.vue'
import GTemplateDetailPage from './GTemplateDetailPage.vue'
export default {
  components: {
    GTemplateDetailPage,
    GDataTable,
    GTextFieldSearch,
    draggable,
    GChipSiteStatus,
    GRadioGroup,
  },
  props: {
    rootId: { type: String, required: true },
  },
  data() {
    return {
      dayOfWeeks: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      fetchedSites: [],
      loadedSites: [],
      // order: [],
      order: {
        sun: [],
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
      },
      lazySearch: null,
      listener: this.$Site(),
      model: this.$Root(),
      modified: false,
      selectedDayOfWeek: 'sun',
    }
  },
  computed: {
    computedFetchedItems() {
      return this.fetchedSites.filter(({ docId }) => {
        // return !this.order.some((item) => item.docId === docId)
        return !this.order[this.selectedDayOfWeek].some(
          (item) => item.docId === docId
        )
      })
    },
  },
  watch: {
    rootId: {
      async handler(newVal, oldVal) {
        this.dayOfWeeks.forEach((day) => this.order[day].splice(0))
        if (newVal === oldVal) return
        await this.model.fetch(newVal)
        const siteIds = [
          ...new Set(
            this.dayOfWeeks.reduce((sum, i) => {
              sum.push(...this.model[i])
              return sum
            }, [])
          ),
        ].filter(
          ({ docId }) => !this.loadedSites.some((site) => site.docId === docId)
        )
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
        this.dayOfWeeks.forEach((day) => {
          this.order[day] = this.model[day].map((siteId) =>
            this.loadedSites.find(({ docId }) => docId === siteId)
          )
        })
      },
      immediate: true,
    },
    lazySearch(newVal, oldVal) {
      this.listener.unsubscribe()
      if (!newVal || newVal === oldVal) return
      this.fetchedSites = this.listener.subscribe(newVal)
    },
  },
  methods: {
    async submit() {
      // this.model.order = this.order.map(({ docId }) => docId)
      this.model[this.selectedDayOfWeek] = this.order[
        this.selectedDayOfWeek
      ].map(({ docId }) => docId)
      await this.model.update()
      this.modified = false
    },
    onChanged(e) {
      this.modified = true
    },
    onClickDelete(index) {
      this.order[this.selectedDayOfWeek].splice(index, 1)
      this.modified = true
    },
  },
}
</script>

<template>
  <g-template-detail-page v-bind="$attrs">
    <h2>{{ model.name }}</h2>
    <g-radio-group v-model="selectedDayOfWeek" row :disabled="modified">
      <v-radio
        v-for="(item, index) of dayOfWeeks"
        :key="index"
        :value="item"
        :label="item"
      />
    </g-radio-group>
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <g-data-table
            disable-sort
            :headers="[
              { text: '排出場所', value: 'name' },
              { text: '状態', value: 'status', align: 'center' },
              { text: '', value: 'action' },
            ]"
            height="360"
            :items="order[selectedDayOfWeek]"
            :items-per-page="-1"
          >
            <template #body="{ items }">
              <draggable
                v-model="order[selectedDayOfWeek]"
                tag="tbody"
                group="sites"
                @change="onChanged"
              >
                <tr v-for="(item, index) of items" :key="index">
                  <td>
                    <div class="d-flex">
                      <div class="mr-3 text-right" style="min-width: 12px">
                        {{ index + 1 }}
                      </div>
                      <div>{{ item.name }}</div>
                    </div>
                    <div class="text-caption text--secondary">
                      <div class="ml-6">{{ item.fullAddress }}</div>
                    </div>
                  </td>
                  <td align="center">
                    <g-chip-site-status :value="item.status" x-small />
                  </td>
                  <td align="right">
                    <v-btn icon small @click="onClickDelete(index)">
                      <v-icon small>mdi-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </draggable>
            </template>
          </g-data-table>
          <v-card-actions>
            <v-btn :disabled="!modified" color="error" @click="submit"
              >modified</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <g-text-field-search :lazy-value.sync="lazySearch" clearable />
          <g-data-table
            :headers="[
              { text: '排出場所', value: 'name' },
              { text: '状態', value: 'status' },
            ]"
            height="360"
            :items="computedFetchedItems"
            :items-per-page="-1"
          >
            <template #body="{ items }">
              <draggable
                v-model="computedFetchedItems"
                tag="tbody"
                :group="{ name: 'sites', pull: 'clone', put: false }"
                :sort="false"
              >
                <tr v-for="(item, index) of items" :key="index">
                  <td>
                    <div>{{ item.name }}</div>
                    <div class="text-caption text--secondary">
                      {{ item.fullAddress }}
                    </div>
                  </td>
                  <td>
                    <g-chip-site-status :value="item.status" x-small />
                  </td>
                </tr>
              </draggable>
            </template>
          </g-data-table>
        </v-card>
      </v-col>
    </v-row>
  </g-template-detail-page>
</template>

<style></style>
