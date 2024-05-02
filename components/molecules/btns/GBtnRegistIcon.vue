<script>
import AIconRegist from '~/components/atoms/icons/AIconRegist.vue'
export default {
  components: { AIconRegist },
}
</script>

<template>
  <v-btn v-bind="$attrs" icon v-on="$listeners">
    <a-icon-regist />
  </v-btn>
</template>

<style></style>
