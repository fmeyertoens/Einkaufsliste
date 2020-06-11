<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center ma-auto ma-lg-0">
        <v-toolbar-title>Einkaufsliste</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
