import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
export default {
  name: 'email-app',
  template: `
  <email-filter />
  <email-list :emails=emailsToShow />
  <email-folder-list :emails="emails"/>
`,
  data() {
    return {
      emails: null,
    };
  },
  created() {
    emailService.query().then(emails => (this.emails = emails));
  },
  methods: {
    removeEmail(receivedEmail) {
      if (!receivedEmail.trash) {
        return emailService.sendToTrash(receivedEmail.id).then(updatedEmail => {
          const idx = this.emails.findIndex(
            email => email.id === updatedEmail.id
          );
          email.splice(idx, 1, updatedEmail);
        });
      } else
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
