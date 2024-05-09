<template>
  <v-container>
    <g-date v-model="value" required clearable default-picker="YEAR" />
  </v-container>
</template>

<script>
import GDate from '~/components/molecules/inputs/GDate.vue'
export default {
  components: { GDate },
  data() {
    return {
      value: '',
    }
  },
  methods: {},
}
</script>

<style></style>
