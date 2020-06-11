import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#009688',
        accent: '#ffc107',
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#4caf50',
      },
    },
  },
  lang: {
    locales: { de },
    current: 'de',
  },
});
