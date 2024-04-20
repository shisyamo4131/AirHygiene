<template>
  <v-app dark>
    <g-navigation-drawer
      v-model="drawer"
      app
      fixed
      bottom
      :permanent="!$vuetify.breakpoint.mobile"
    />
    <v-app-bar app color="primary" dark dense fixed flat>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mobile"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>Air Hygiene</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <!-- <Nuxt keep-alive :keep-alive-props="{ include: keepAlivePages }" /> -->
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GNavigationDrawer from '~/components/organisms/GNavigationDrawer.vue'
export default {
  name: 'DefaultLayout',
  components: { GNavigationDrawer },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    containerClass() {
      const result = {}
      if (this.$vuetify.breakpoint.smAndDown) {
        result['pa-0'] = true
      }
      return result
    },
    keepAlivePages() {
      // const result = [
      //   'IndexPage',
      //   'CustomersIndex',
      //   'SitesIndex',
      //   'EmployeesIndex',
      //   'OperationResultsIndex',
      // ]
      const result = []
      return result
    },
  },
}
</script>

<style>
.firebase-emulator-warning {
  display: none;
}

.center-input input {
  text-align: center;
}

.right-input input {
  text-align: right;
}
</style>
