import { createVuetify } from 'vuetify';
import { VTimePicker } from 'vuetify/labs/VTimePicker';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

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
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});
