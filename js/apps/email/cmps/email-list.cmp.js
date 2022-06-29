import emailPreview from '../cmps/email-preview.cmp.js';
export default {
  template: `
  <section class="email-list">
  <ul>
    <li v-for="email in emails" :key="email.id" class="email-preview-container">
      <router-link :to="'/email/'+email.id">
        <email-preview @selectedEmail="toggleEmailDescription" :selectedEmail="selectedEmail" :email="email"/>
      </router-link>
    </li>
  </ul>
  </section>
`,
  data() {
    return {
      selectedEmail: null,
    };
  },
  created() {},
  methods: {
    toggleEmailDescription(email) {
      if (this.selectedEmail === email) this.selectedEmail = null;
      else this.selectedEmail = email;
    },
  },
  computed: {},
  components: { emailPreview },
  props: ['emails'],
  unmounted() {},
};
