<template>
  <v-app>
    <v-app-bar dense app>
      <v-app-bar-title v-text="'CoinGecko API'"></v-app-bar-title>
      <v-row>
        <v-col cols="8" align="center">
          <v-btn
            small
            text
            ripple
            elevation="0"
            v-for="item in navigations"
            :key="'navigation-item-' + item.text.toLowerCase()"
            :to="item.link"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-btn>
        </v-col>
        <v-col cols="4" align-self="center">
          <v-row justify="end">
            <v-btn rounded small color="blue">Login</v-btn>
            <v-btn rounded small color="white" class="black--text mr-4 ml-2">Register</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <template v-slot:extension class="mx-0 px-0">
        <v-container class="mx-0">
          <v-row v-if="overallStats != null" class="d-flex justify-space-around my-2">
            <div class="body-2 teal--text text--accent-3">
              <span class="font-weight-bold white--text">Monnaies: </span>
              {{ overallStats.active_cryptocurrencies }}
            </div>
            <div class="body-2 teal--text text--accent-3">
              <span class="font-weight-bold white--text">Plateforme d'échange: </span>
              {{ overallStats.markets }}
            </div>
            <div class="body-2 teal--text text--accent-3">
              <span class="font-weight-bold white--text">Capitalisation boursière: </span>
              {{ allMarketsUsd }}
              <span class="cyan--text text--darken-1">$US</span>
            </div>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  data: () => ({
    navigations: [
      {
        text: 'Home',
        link: '/',
        icon: 'mdi-home',
      },
    ],
    overallStats: null,
  }),
  mounted () {
    axios.get('https://api.coingecko.com/api/v3/global')
    .then(res => this.overallStats = res.data.data)
  },
  computed: {
    allMarketsUsd () {
      return Object.values(this.overallStats.total_market_cap).reduce( (a, b) => a + b).toLocaleString()
    }
  }
};
</script>
