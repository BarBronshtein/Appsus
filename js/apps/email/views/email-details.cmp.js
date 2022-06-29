import { emailService } from '../services/email-service.js';

export default {
  template: `
  <section v-if="email" class="email-details">
    <pre>{{email}}</pre>
    <router-link to="/email"><button>Back to list</button></router-link>
  </section>
`,
  data() {
    return {
      email: null,
    };
  },
  created() {
    const id = this.$route.params.emailId;
    emailService.get(id).then(email => {
      this.email = email;
      this.email.isRead = true;
      console.log(this.email);
      emailService.save(this.email);
    });
  },
  methods: {
    removeEmail() {
      // TODO: use event bus to emit the event to email-app
    },
  },
  computed: {},
  unmounted() {},
};
