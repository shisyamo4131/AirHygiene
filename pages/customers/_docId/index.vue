<script>
import { where } from 'firebase/firestore'
import GDataTable from '~/components/molecules/tables/GDataTable.vue'
import GInputCustomer from '~/components/molecules/inputs/GInputCustomer.vue'
import AIconClose from '~/components/atoms/icons/AIconClose.vue'
import AIconSubmit from '~/components/atoms/icons/AIconSubmit.vue'
import GTextFieldSearch from '~/components/molecules/inputs/GTextFieldSearch.vue'
import GSwitch from '~/components/molecules/inputs/GSwitch.vue'
import GPagination from '~/components/molecules/paginations/GPagination.vue'
import GChipSiteStatus from '~/components/molecules/chips/GChipSiteStatus.vue'
import GBtnRegistIcon from '~/components/molecules/btns/GBtnRegistIcon.vue'
import GInputSite from '~/components/molecules/inputs/GInputSite.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GDataTable,
    GInputCustomer,
    AIconClose,
    AIconSubmit,
    GTextFieldSearch,
    GSwitch,
    GPagination,
    GChipSiteStatus,
    GBtnRegistIcon,
    GInputSite,
  },
  /***************************************************************************
   * ASYNCDATA
   ***************************************************************************/
  asyncData({ app, route }) {
    const docId = route.params.docId
    const listeners = {
      customer: app.$Customer(),
      sitesActive: app.$Site(),
      sitesExpired: app.$Site(),
    }
    listeners.customer.subscribeDoc(docId)
    const sites = {
      active: [],
      expired: [],
    }
    sites.active = listeners.sitesActive.subscribe(undefined, [
      where('customerId', '==', docId),
      where('status', '==', 'active'),
    ])
    return { docId, listeners, sites }
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dialog: {
        customer: false,
        site: false,
      },
      editModel: {
        customer: this.$Customer(),
        site: this.$Site(),
      },
      form: {
        customer: null,
        site: null,
      },
      includeExpired: false,
      loading: false,
      page: {
        sites: 1,
      },
      pageCount: {
        sites: 0,
      },
      scrollTarget: {
        customer: null,
        site: null,
      },
      search: {
        sites: null,
      },
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    breadcrumbs() {
      return [
        { text: 'TOP', to: '/' },
        { text: '取引先', to: '/customers', exact: true },
        { text: '取引先詳細', to: `/customers/${this.docId}` },
      ]
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    'dialog.customer'(v) {
      !v || this.initializeCustomer()
    },
    'dialog.site': {
      handler(v) {
        v || this.initializeSite()
      },
      immediate: true,
    },
    includeExpired(v) {
      if (v) {
        this.sites.expired = this.listeners.sitesExpired.subscribe(undefined, [
          where('customerId', '==', this.docId),
          where('status', '==', 'expired'),
        ])
      } else {
        this.listeners.sitesExpired?.unsubscribe()
      }
    },
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    Object.keys(this.listeners).forEach((key) => {
      this.listeners[key].unsubscribe()
    })
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    initializeCustomer() {
      this.editModel.customer.initialize(
        structuredClone(this.listeners.customer)
      )
      this.form.customer?.resetValidation()
      this.scrollTarget.customer?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    },
    initializeSite() {
      this.editModel.site.initialize({ customerId: this.docId })
      this.form.site?.resetValidation()
      this.scrollTarget.site?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    },
    async submitCustomer() {
      if (!this.validateCustomer()) return
      try {
        this.loading = true
        await this.editModel.customer.update()
        this.dialog.customer = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    async submitSite() {
      if (!this.validateSite()) return
      try {
        this.loading = true
        await this.editModel.site.create()
        this.dialog.site = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    validateCustomer() {
      const result = this.form.customer.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
    validateSite() {
      const result = this.form.site.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
  },
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <v-card flat outlined>
                <v-card-title>
                  <div class="text-truncate">
                    {{ listeners.customer.name1 }}
                  </div>
                </v-card-title>
                <v-card-subtitle>
                  <div class="text-truncate">
                    {{ listeners.customer.name2 }}
                  </div>
                </v-card-subtitle>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip v-if="listeners.customer.tel" label small>
                      <v-icon left small>mdi-phone</v-icon>
                      {{ listeners.customer.tel }}
                    </v-chip>
                    <v-chip v-if="listeners.customer.fax" label small>
                      <v-icon left small>mdi-fax</v-icon>
                      {{ listeners.customer.fax }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-dialog
                    v-model="dialog.customer"
                    max-width="600"
                    persistent
                    scrollable
                  >
                    <template #activator="{ attrs, on }">
                      <v-btn
                        v-bind="attrs"
                        block
                        color="primary"
                        small
                        v-on="on"
                      >
                        登録情報変更
                      </v-btn>
                    </template>
                    <v-card flat outlined>
                      <v-toolbar dense flat color="primary" dark>
                        <v-toolbar-title>取引先[変更]</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text
                        :ref="(el) => (scrollTarget.customer = el)"
                        class="pa-4"
                      >
                        <v-form
                          :ref="(el) => (form.customer = el)"
                          :disabled="loading"
                        >
                          <g-input-customer
                            v-bind.sync="editModel.customer"
                            edit-mode="UPDATE"
                          />
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="justify-space-between">
                        <v-btn
                          :disabled="loading"
                          @click="dialog.customer = false"
                          ><a-icon-close />close</v-btn
                        >
                        <v-btn
                          :disabled="loading"
                          :loading="loading"
                          color="primary"
                          @click="submitCustomer"
                          ><a-icon-submit />submit</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card flat outlined>
                <v-card-title> 所在地 </v-card-title>
                <v-card-subtitle>
                  <div>
                    {{ listeners.customer.fullAddress }}
                  </div>
                  <div>
                    {{ listeners.customer.address2 }}
                  </div>
                </v-card-subtitle>
                <v-card-text>
                  <iframe
                    :src="`https://maps.google.com/maps?output=embed&q=${listeners.customer.fullAddress}&t=m&hl=ja&z=18`"
                    width="100%"
                    height="360"
                    frameborder="0"
                    style="border: 0"
                    allowfullscreen=""
                  ></iframe>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card flat outlined>
                <v-card-title>請求先</v-card-title>
                <v-card-subtitle>
                  <div>
                    {{ listeners.customer.sendToFullAddress }}
                  </div>
                  <div>
                    {{ listeners.customer.sendToAddress2 }}
                  </div>
                </v-card-subtitle>
                <v-card-text class="text-center">
                  <v-chip-group column>
                    <v-chip small label>
                      {{ $ROUNDING[listeners.customer.rounding] }}
                    </v-chip>
                    <v-chip
                      label
                      small
                      color="teal lighten-5 teal--text text-darken-4"
                    >
                      {{ `${$DEADLINE[listeners.customer.deadline]}締め` }}
                    </v-chip>
                    <v-chip
                      label
                      small
                      color="green lighten-5 green--text text-darken-4"
                    >
                      {{ `${listeners.customer.depositMonth}ヶ月後` }}
                      {{ `${$DEADLINE[listeners.customer.depositDay]}回収` }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <v-card flat outlined>
            <v-card-title> 排出場所 </v-card-title>
            <v-toolbar dense flat>
              <g-text-field-search v-model="search.sites" />
              <v-dialog
                v-model="dialog.site"
                max-width="600"
                persistent
                scrollable
              >
                <template #activator="{ attrs, on }">
                  <g-btn-regist-icon v-bind="attrs" v-on="on" />
                </template>
                <v-card flat outlined>
                  <v-toolbar dense flat color="primary" dark>
                    <v-toolbar-title>排出場所[登録]</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text
                    :ref="(el) => (scrollTarget.sites = el)"
                    class="pa-4"
                  >
                    <v-form :ref="(el) => (form.site = el)" :disabled="loading">
                      <g-input-site
                        v-bind.sync="editModel.site"
                        edit-mode="REGIST"
                      />
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="justify-space-between">
                    <v-btn :disabled="loading" @click="dialog.site = false"
                      ><a-icon-close />close</v-btn
                    >
                    <v-btn
                      :disabled="loading"
                      :loading="loading"
                      color="primary"
                      @click="submitSite"
                      ><a-icon-submit />submit</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-container fluid>
              <div class="d-flex justify-end">
                <g-switch
                  v-model="includeExpired"
                  hide-details
                  label="取引終了を含める"
                />
              </div>
            </v-container>
            <v-container fluid>
              <g-data-table
                :actions="['detail']"
                :headers="[
                  { text: 'CODE', value: 'code', width: 120 },
                  { text: '排出場所名', value: 'name', sortable: false },
                  { text: '住所', value: 'fullAddress', sortable: false },
                  {
                    text: '状態',
                    value: 'status',
                    sortable: false,
                    align: 'center',
                  },
                ]"
                :items="sites.active.concat(sites.expired)"
                :search="search.sites"
                sort-by="code"
                sort-desc
                :page="page.sites"
                @page-count="($event) => (pageCount.sites = $event)"
              >
                <template #[`item.status`]="{ item }">
                  <g-chip-site-status :value="item.status" x-small />
                </template>
              </g-data-table>
              <g-pagination v-model="page.sites" :length="pageCount.sites" />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="my-6" block color="error" small>この取引先を削除する</v-btn>
    </v-container>
  </div>
</template>

<style></style>
