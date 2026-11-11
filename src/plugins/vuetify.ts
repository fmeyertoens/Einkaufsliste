import { createVuetify } from 'vuetify';
import { VTimePicker } from 'vuetify/components/VTimePicker';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { de } from 'vuetify/locale';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
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
  },
  components: {
    VTimePicker,
  },
  locale: {
    locale: 'de',
    fallback: 'de',
    messages: { de },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});
