<template>
  <v-container>
    <v-simple-table dense fixed-header class="mt-7">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Coin</th>
            <th class="text-left">Price</th>
            <th class="text-left">1h</th>
            <th class="text-left">24h</th>
            <th class="text-left">7d</th>
            <th class="text-left">1y</th>
            <th class="text-left">24h volume</th>
            <th class="text-left">Mkt Cap</th>
            <th class="text-left">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          <tr class="font-weight-medium" v-for="item in allCoins" :key="item.id">
            <th>{{ item.market_cap_rank }}</th>
            <th class="font-weight-medium">
              <div class="d-flex">
                <v-img
                  contain
                  aspect-ratio="1"
                  class="mr-3"
                  width="18px"
                  max-width="18px"
                  :src="item.image"
                ></v-img>
                {{ item.id }}
              </div>
            </th>
            <th class="font-weight-medium teal--text text--accent-3">
              {{ item.current_price }}
              <span class="cyan--text text--darken-1">$US</span>
            </th>
            <th
              class="font-weight-medium"
              :class="item.price_change_percentage_1h_in_currency > 1 ? 'green--text text--accent-3' : 'red--text text--accent-2'"
            >{{ Number.parseFloat(item.price_change_percentage_1h_in_currency).toFixed(2) }}%</th>
            <th
              class="font-weight-medium"
              :class="item.price_change_percentage_24h_in_currency > 1 ? 'green--text text--accent-3' : 'red--text text--accent-2'"
            >{{ Number.parseFloat(item.price_change_percentage_24h_in_currency).toFixed(2) }}%</th>
            <th
              class="font-weight-medium"
              :class="item.price_change_percentage_7d_in_currency > 1 ? 'green--text text--accent-3' : 'red--text text--accent-2'"
            >{{ Number.parseFloat(item.price_change_percentage_7d_in_currency).toFixed(2) }}%</th>
            <!-- <th>{{ Number.parseFloat(item.price_change_percentage_14d_in_currency).toFixed(2) }}%</th>
          <th>{{ Number.parseFloat(item.price_change_percentage_30d_in_currency).toFixed(2) }}%</th>
            <th>{{ Number.parseFloat(item.price_change_percentage_200d_in_currency).toFixed(2) }}%</th>-->
            <th
              class="font-weight-medium"
              :class="item.price_change_percentage_1y_in_currency > 1 ? 'green--text text--accent-3' : 'red--text text--accent-2'"
            >{{ Number.parseFloat(item.price_change_percentage_1y_in_currency).toFixed(2) }}%</th>
            <th
              class="font-weight-medium"
              :class="item.price_change_24h > 1 ? 'green--text text--accent-3' : 'red--text text--accent-2'"
            >{{ item.price_change_24h }}%</th>
            <th
              class="font-weight-medium teal--text text--accent-3 tw-whitespace-nowrap"
            >{{ item.market_cap.toLocaleString() }}%</th>
            <th>
              <v-sparkline
                line-width="2"
                :color="item.sparkline_in_7d.price[0] - [...item.sparkline_in_7d.price].pop() > 0 ? 'red accent-2' : 'green accent-4'"
                :value="item.sparkline_in_7d.price"
              ></v-sparkline>
            </th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      allCoins: null,
    }
  },
  mounted () {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true,
        price_change_percentage: '1h,24h,7d,14d,30d,200d,1y'
      }
    })
      .then(res => this.allCoins = res.data.sort((a, b) => a.market_cap < b.market_cap))
  }
}
</script>
