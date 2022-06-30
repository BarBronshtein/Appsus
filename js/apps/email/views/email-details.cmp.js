import { emailService } from '../services/email-service.js';

export default {
  template: `
  <section v-if="email" class="email-details">
    <pre>{{email}}</pre>
    <router-link :to="emailListUrl"><button>Back to list</button></router-link>
  </section>
`,
  data() {
    return {
      email: null,
    };
  },
  created() {
    const { emailId } = this.$route.params;
    if (!emailId) return;
    emailService.get(emailId).then(email => {
      this.email = email;
      this.email.isRead = true;
      emailService.save(this.email);
      this.$emit('markAsRead', this.email);
    });
  },
  methods: {
    removeEmail() {
      // TODO: use event bus to emit the event to email-app
    },
  },
  computed: {
    emailListUrl() {
      const status = this.$route.params.status;
      return '/email/' + status;
    },
  },
  unmounted() {},
};
