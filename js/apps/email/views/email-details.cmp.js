import { emailService } from '../services/email-service.js';

export default {
  template: `
  <section v-if="email" class="email-details">
    <pre>{{email}}</pre>
    <button>Back to list</button>
  </section>
`,
  data() {
    return {
      email: null,
    };
  },
  created() {
    const id = this.$route.params.emailId;
    emailService.get(id).then(email => (this.email = email));
  },
  methods: {
    removeEmail() {
      // TODO: use event bus to emit the event to email-app
    },
    computed: {},
    unmounted() {},
  },
};
