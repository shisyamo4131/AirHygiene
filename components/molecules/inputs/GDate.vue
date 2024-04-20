<script>
/**
 * ### GDate
 *
 * @author shisyamo4131
 */
import ADate from '~/components/atoms/inputs/ADate.vue'
import ALabelInput from '~/components/atoms/labels/ALabelInput.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { ADate, ALabelInput },
  props: {
    pickerProps: {
      type: Object,
      default: () => {
        return {}
      },
      required: false,
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      activePicker: null,
      menu: false,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    date: {
      get() {
        return this.$attrs.value || null
      },
      set(v) {
        this.$emit('input', v)
      },
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    menu(val) {
      // ディレイをある程度指定しないと年のスクロールが行われない。
      // たぶん原因は日付データのバケツリレー。
      val &&
        setTimeout(() => {
          this.activePicker = 'YEAR'
        }, 100)
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>

<template>
  <a-label-input v-bind="$attrs" v-on="$listeners">
    <template #default="{ attrs, on }">
      <a-date v-if="!$vuetify.breakpoint.mobile" v-bind="attrs" v-on="on">
        <template
          v-for="(_, scopedSlotName) in $scopedSlots"
          #[scopedSlotName]="slotData"
        >
          <slot :name="scopedSlotName" v-bind="slotData" />
        </template>
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
      </a-date>
      <v-menu
        v-else
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on: pickerOn, attrs: pickerAttrs }">
          <a-date
            v-model="date"
            readonly
            v-bind="pickerAttrs"
            v-on="pickerOn"
          ></a-date>
        </template>
        <v-date-picker
          v-model="date"
          v-bind="pickerProps"
          locale="ja-jp"
          :active-picker.sync="activePicker"
          :picker-date="date"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </template>
  </a-label-input>
</template>
<style></style>
