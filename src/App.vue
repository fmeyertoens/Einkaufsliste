<template>
  <v-app>
    <v-app-bar color="primary">
      <div class="d-flex align-center ma-auto ma-lg-0">
        <v-toolbar-title>Einkaufsliste</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <home />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Home from './views/Home.vue';
</script>
