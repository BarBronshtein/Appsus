export default {
  template: `
  <section v-if="email" class="email-partially-open">
    <router-link class="btn full-screen-btn" :to="'/email/'+email.id">
        fullScreen
    </router-link>
    <pre>{{email}}</pre>
    <!-- <router-link to="/email"><button>Back to list</button></router-link> -->
  </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  props: ['email'],
  computed: {},
  unmounted() {},
};
