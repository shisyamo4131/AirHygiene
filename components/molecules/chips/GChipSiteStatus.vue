<script>
export default {
  props: {
    value: {
      type: String,
      validator: (v) => ['active', 'pause', 'expired'].includes(v),
      required: true,
    },
  },
  computed: {
    color() {
      if (this.value === 'pause') return 'warning'
      if (this.value === 'expired') return undefined
      return 'primary'
    },
  },
}
</script>

<template>
  <v-chip v-bind="$attrs" :color="color" v-on="$listeners">
    {{ $SITE_STATUS[value] }}
  </v-chip>
</template>

<style></style>
