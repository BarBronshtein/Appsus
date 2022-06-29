import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import { router } from './router.js';
import userMsg from './cmps/user-msg.cmp.js';

const options = {
  template: `
  <section>
    <app-header />
    <user-msg/>
    <router-view/>
    <app-footer />
  </section>
  `,
  components: {
    userMsg,
    appHeader,
    appFooter,
  },
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');
