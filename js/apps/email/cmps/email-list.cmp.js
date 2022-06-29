import emailPreview from '../cmps/email-preview.cmp.js';
export default {
  template: `
  <section class="email-list">
  <ul>
    <li v-for="email in emails" :key="email.id" class="email-preview-container">
      <email-details v-if="" />
     <router-link :to="'/email/'+email.id"><email-preview :email="email"/></router-link>
    </li>
  </ul>
  </section>
`,
  data() {
    return {
      selectedEmail: '',
    };
  },
  created() {},
  methods: {},
  computed: {},
  components: { emailPreview },
  props: ['emails'],
  unmounted() {},
};
