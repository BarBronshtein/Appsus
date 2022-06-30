import emailPreview from '../cmps/email-preview.cmp.js';
export default {
  template: `
  <section class="email-list">
  <ul class="clean-list">
    <li v-for="email in emails" :key="email.id" class="email-preview-container">
      
        <email-preview @selectedEmail="goToLink" :selectedEmail="selectedEmail" :email="email"/>
      
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
    goToLink(email) {
      const status = this.$route.params.status;
      this.$router.push('/email/' + status + '/' + email.id);
    },
  },
  computed: {},
  components: { emailPreview },
  props: ['emails'],
  unmounted() {},
};
