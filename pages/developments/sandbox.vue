<template>
  <v-container>
    <g-text-field-search />
    <g-autocomplete-site v-model="objectValue" :search.sync="search" multiple />
    {{ value }}
  </v-container>
</template>

<script>
import GAutocompleteSite from '~/components/molecules/inputs/GAutocompleteSite.vue'
import GTextFieldSearch from '~/components/molecules/inputs/GTextFieldSearch.vue'
export default {
  components: { GAutocompleteSite, GTextFieldSearch },
  data() {
    return {
      search: null,
      value: 'TRVyrinLCAoyEr2slUMp',
      objectValue: [
        'TRVyrinLCAoyEr2slUMp',
        '2lF7careP5MRntKeCfwH',
        'ODrMTuhF5lo3mUHV6PsY',
        'itjgwiCjX6AAjFYT3dHg',
        'qyoLDzRjZyxXHet6AQmR',
      ],
    }
  },
  methods: {},
}
</script>

<style></style>
