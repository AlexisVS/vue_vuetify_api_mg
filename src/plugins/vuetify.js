import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
  },
  customVariables: [ '~/assets/sass/variables.scss'],
  treeShake: true,
  defaultAssets: false,
});
