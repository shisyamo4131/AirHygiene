<script>
/**
 * ### GDate
 *
 * @author shisyamo4131
 */
import ADate from '~/components/atoms/inputs/ADate.vue'
import ADatePicker from '~/components/atoms/pickers/ADatePicker.vue'
export default {
  components: { ADate, ADatePicker },
  props: {
    /**
     * A string indicating which picker is being displayed. Use with the .sync modifier.
     * Use 'defaultPicker' to specify which picker to display.
     */
    activePicker: { type: String, default: undefined, required: false },
    /**
     * An string or undefined used to define which picker is displayed when picker is opend.
     * Ignored if the 'value' is set.
     */
    defaultPicker: {
      type: String,
      default: undefined,
      validator: (v) => !v || ['YEAR', 'MONTH', 'DATE'].includes(v),
      required: false,
    },
    menuProps: {
      type: Object,
      default: () => ({
        closeOnContentClick: false,
        minWidth: 'auto',
        offsetY: true,
        transition: 'scale-transition',
      }),
      required: false,
    },
    pickerOnly: { type: Boolean, default: false, required: false },
    required: { type: Boolean, default: false, required: false },
    value: { type: String, default: '', required: false },
  },
  data() {
    return {
      internalActivePicker: null,
      date: null,
      menu: false,
    }
  },
  watch: {
    /**
     * Changed the 'date' means the date was changed (selected) by the date-picker.
     * Emits input event with new date value as an argument for v-model.
     */
    date: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.$emit('input', newVal)
      },
      immediate: true,
    },
    internalActivePicker: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.$emit('update:activePicker', newVal)
      },
    },
    menu(val) {
      // ディレイをある程度指定しないと年のスクロールが行われない。
      // たぶん原因は日付データのバケツリレー。
      val &&
        setTimeout(() => {
          if (this.defaultPicker && !this.value) {
            this.internalActivePicker = this.defaultPicker
          }
        }, 100)
    },
    value: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.date = newVal
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <v-menu
    ref="menu"
    v-model="menu"
    v-bind="{ ...menuProps }"
    :disabled="pickerOnly ? false : $vuetify.breakpoint.mobile"
    :return-value.sync="date"
  >
    <template #activator="{ attrs, on }">
      <a-date
        v-bind="{
          ...$attrs,
          value: date,
          readonly: pickerOnly || $vuetify.breakpoint.mobile,
          required: menu ? false : required,
          ...attrs,
        }"
        v-on="{ ...$listeners, ...on }"
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
    </template>
    <!-- Picker's value is current date if the 'date' is null. -->
    <a-date-picker
      :value="date || $dayjs().format('YYYY-MM-DD')"
      :active-picker.sync="internalActivePicker"
      @change="$refs.menu.save($event)"
    ></a-date-picker>
  </v-menu>
</template>
<style></style>
