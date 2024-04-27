<script>
/**
 * ### GDate
 *
 * @author shisyamo4131
 */
import ADate from '~/components/atoms/inputs/ADate.vue'
export default {
  components: { ADate },
  props: {
    pickerProps: { type: Object, default: () => ({}), required: false },
  },
  data() {
    return {
      activePicker: null,
      menu: false,
    }
  },
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
  methods: {
    // save(date) {
    //   this.$refs.menu.save(date)
    // },
  },
}
</script>

<template>
  <div>
    <a-date
      v-if="!$vuetify.breakpoint.mobile"
      v-bind="$attrs"
      v-on="$listeners"
    >
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
      <template #activator="{ attrs, on }">
        <a-date
          v-model="date"
          readonly
          v-bind="{ ...$attrs, ...attrs }"
          v-on="{ ...$listeners, ...on }"
        ></a-date>
      </template>
      <v-date-picker
        v-model="date"
        v-bind="pickerProps"
        locale="ja-jp"
        :active-picker.sync="activePicker"
        :picker-date="date"
        @change="$refs.menu.save($event)"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<style></style>
