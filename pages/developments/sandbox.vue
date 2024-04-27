<template>
  <v-container>
    <g-date v-model="value" />
    {{ value }}
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
}
</script>

<style></style>
