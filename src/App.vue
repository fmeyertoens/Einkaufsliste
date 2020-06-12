<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center ma-auto ma-lg-0">
        <v-toolbar-title>Einkaufsliste</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
});
</script>
