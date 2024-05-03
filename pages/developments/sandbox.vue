<template>
  <v-container>
    {{ clone }}
    <v-btn @click="test">aaa</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clone: null,
      model: this.$SiteRootContract('pNLmHcEU1rwCjfHRpvUn'),
    }
  },
  methods: {
    test() {
      console.log('initialize' in this.model)
    },
  },
}
</script>

<style></style>
