<script>
import GRadioGroup from '../inputs/GRadioGroup.vue'
/**
 * ### GRadioGroupDayOfWeek
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { GRadioGroup },
  /***************************************************************************
   * MODEL
   ***************************************************************************/
  model: { prop: 'value', event: 'change' },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      dayOfWeeks: [
        { text: '日', value: 'sun' },
        { text: '月', value: 'mon' },
        { text: '火', value: 'tue' },
        { text: '水', value: 'wed' },
        { text: '木', value: 'thu' },
        { text: '金', value: 'fri' },
        { text: '土', value: 'sat' },
      ],
    }
  },
}
</script>

<template>
  <g-radio-group v-bind="$attrs" v-on="$listeners">
    <v-radio
      v-for="(item, index) of dayOfWeeks"
      :key="index"
      :value="item.value"
      :label="item.text"
    />
  </g-radio-group>
</template>

<style></style>
