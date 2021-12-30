<template>
  <v-app>
    <v-app-bar dense app>
      <v-app-bar-title v-text="'MolenGeek Shop'"></v-app-bar-title>
      <v-row>
        <v-col cols="8">
          <v-btn rounded small color="blue">Login</v-btn>
          <v-btn rounded small color="white" class="black--text">Register</v-btn>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
