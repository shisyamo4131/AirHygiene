<script>
import { collection, getDocs, query, where } from 'firebase/firestore'
import GTextFieldSearch from '../molecules/inputs/GTextFieldSearch.vue'
import GDataTableRootOrder from '../molecules/tables/GDataTableRootOrder.vue'
import GRadioGroupDayOfWeek from '../molecules/groups/GRadioGroupDayOfWeek.vue'
import GTemplateDetailPage from './GTemplateDetailPage.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTemplateDetailPage,
    GTextFieldSearch,
    GDataTableRootOrder,
    GRadioGroupDayOfWeek,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    rootId: { type: String, required: true },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      fetchedSites: [],
      model: this.$Root(),
      modified: false,
      loadedSites: [],
      lazySearch: null,
      loading: {
        ordered: false,
        unordered: false,
      },
      order: { sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
      selectedDayOfWeek: 'sun',
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedFetchedItems() {
      return this.fetchedSites.filter(({ docId }) => {
        return !this.order[this.selectedDayOfWeek].some(
          (item) => item.docId === docId
        )
      })
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    rootId: {
      async handler(newVal, oldVal) {
        const dayOfWeeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        dayOfWeeks.forEach((day) => this.order[day].splice(0))
        if (newVal === oldVal) return
        try {
          this.loading.ordered = true
          await this.model.fetch(newVal)
          const siteIds = [
            ...new Set(
              dayOfWeeks.reduce((sum, i) => {
                sum.push(...this.model[i])
                return sum
              }, [])
            ),
          ].filter(
            ({ docId }) =>
              !this.loadedSites.some((site) => site.docId === docId)
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
          dayOfWeeks.forEach((day) => {
            this.order[day] = this.model[day].map((siteId) =>
              this.loadedSites.find(({ docId }) => docId === siteId)
            )
          })
        } catch (err) {
          // eslint-disable-next-line
          console.error(err)
          alert(err.message)
        } finally {
          this.loading.ordered = false
        }
      },
      immediate: true,
    },
    async lazySearch(newVal, oldVal) {
      this.loading.unordered = true
      this.fetchedSites = await this.$Site().fetchDocs(newVal)
      this.$refs[`unordered-table-${this._uid}`].scrollToTop()
      this.loading.unordered = false
    },
    selectedDayOfWeek() {
      this.$refs[`ordered-table-${this._uid}`].scrollToTop()
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async submit() {
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
  <g-template-detail-page v-slot="{ height }" v-bind="$attrs">
    <h2>{{ model.name }}</h2>
    <v-row>
      <v-col cols="6">
        <v-toolbar flat dense>
          <g-radio-group-day-of-week
            v-model="selectedDayOfWeek"
            hide-details
            row
            :disabled="modified"
          />
        </v-toolbar>
        <v-card outlined>
          <g-data-table-root-order
            :ref="`ordered-table-${_uid}`"
            v-model="order[selectedDayOfWeek]"
            draggable-sort
            :height="height - 36 - 48 - 44 - 2"
            :loading="loading.ordered"
            @change="onChanged"
          >
            <template #[`item.name`]="{ item, index }">
              <div class="d-flex">
                <div
                  class="mr-3 text-right align-self-center"
                  style="min-width: 12px"
                >
                  {{ index + 1 }}
                </div>
                <div>
                  <div>{{ item.name }}</div>
                  <div class="text-caption text--secondary">
                    <div>{{ item.fullAddress }}</div>
                  </div>
                </div>
              </div>
            </template>
          </g-data-table-root-order>
          <v-card-actions>
            <v-btn
              :disabled="!modified"
              color="error"
              block
              small
              @click="submit"
              >編集を確定</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-toolbar flat dense>
          <g-text-field-search :lazy-value.sync="lazySearch" clearable />
        </v-toolbar>
        <v-card outlined>
          <g-data-table-root-order
            :ref="`unordered-table-${_uid}`"
            :height="height - 36 - 48 - 2"
            :items="computedFetchedItems"
            :group="{ name: 'sites', pull: 'clone', put: false }"
            :loading="loading.unordered"
          />
        </v-card>
      </v-col>
    </v-row>
  </g-template-detail-page>
</template>

<style></style>
