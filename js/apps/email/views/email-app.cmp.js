import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
export default {
  name: 'email-app',
  template: `
  <email-filter />
  <email-list :emails=emailsToShow />
  <email-folder-list />
`,
  data() {
    return {
      emails: null,
      selectedEmail: null,
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
    emailsToShow() {
      return this.emails;
    },
  },
  components: { emailList, emailFilter, emailFolderList },
  unmounted() {},
};
