import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';
export default {
  name: 'email-app',
  template: `
  <section class="email-app">
      <email-filter />
      <email-list :emails=emailsToShow />
      <email-folder-list @openModal="composeEmail" :emails="emails"/>
    </section>
    <aside>
        <email-compose @composedEmail="saveEmail" v-if="showModal" />
    </aside>
  
`,
  data() {
    return {
      emails: null,
      showModal: false,
      unsubscribe: null,
    };
  },
  created() {
    emailService.query().then(emails => (this.emails = emails));
    this.unsubscribe = eventBus.on('remove-email', this.removeEmail);
  },
  methods: {
    saveEmail(email) {
      emailService
        .save(email)
        .then(emailService.query)
        .then(emails => {
          this.emails = emails;
        });
    },
    removeEmail(emailId) {
      // change to email after completing go to trash feature and emailId to id
      //   if (!receivedEmail.trash) {
      //     return emailService.sendToTrash(receivedEmail.id).then(updatedEmail => {
      //       const idx = this.emails.findIndex(
      //         email => email.id === updatedEmail.id
      //       );
      //       email.splice(idx, 1, updatedEmail);
      //     });
      //   } else
      emailService.remove(emailId).then(() => {
        const idx = this.emails.findIndex(email => email.id === emailId);
        this.emails.splice(idx, 1);
      });
    },
    composeEmail() {
      this.showModal = true;
    },
  },
  computed: {
    emailsToShow() {
      return this.emails;
    },
  },
  components: {
    emailList,
    emailFilter,
    emailFolderList,
    emailCompose,
  },
  unmounted() {
    this.unsubscribe();
  },
};
