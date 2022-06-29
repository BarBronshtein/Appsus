import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.cmp.js';
export default {
  template: `
  <email-filter />
  <email-list :emails />
  <email-floder-list />
`,
  data() {
    return {
      emails: null,
      selectedEmailId: null,
    };
  },
  created() {
    emailService.query().then(emails => (this.emails = emails));
  },
  methods: {
    removeEmail(id) {
      emailService.remove(id).then(() => {
        const idx = this.emails.findIndex(email => email.id === id);
        this.emails.splice(idx, 1);
      });
    },
  },
  computed: {
    emailsToShow() {},
  },
  components: { emailList },
  unmounted() {},
};
