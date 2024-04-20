<template>
  <div>
    <g-input-autonumber v-bind.sync="model" />
  </div>
</template>

<script>
import GInputAutonumber from '~/components/molecules/inputs/GInputAutonumber.vue'
export default {
  components: { GInputAutonumber },
  data() {
    return {
      model: this.$Autonumber(),
    }
  },
}
</script>

<style></style>
