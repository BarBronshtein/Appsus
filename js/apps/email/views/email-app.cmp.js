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
      <email-filter @filtered="setFilter" />
      <email-list :emails=emailsToShow />
      <email-folder-list @openModal="composeEmail" :emails="emails"/>
    </section>
    <aside>
        <email-compose :user="loggedUser" @composedEmail="saveEmail" v-if="showModal" />
    </aside>
  
`,
  data() {
    return {
      emails: null,
      showModal: false,
      unsubscribe: null,
      filterBy: '',
      sortBy: '',
      loggedUser: null,
    };
  },
  created() {
    emailService
      .queryUser()
      .then((user) => (this.loggedUser = user));

    emailService.query().then(emails => (this.emails = emails));

    this.unsubscribe = eventBus.on('remove-email', this.removeEmail);
  },
  methods: {
    setSort(sortBy) {
      this.sortBy = sortBy;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
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
      const { txt, status } = this.filterBy;
      const regex = new RegExp(txt, 'i');
      let filteredEmails = this.emails;
      if (txt)
        filteredEmails = filteredEmails.filter(
          ({ subject, to }) => regex.test(subject) || regex.test(to)
        );
      if (status === 'read')
        filteredEmails = filteredEmails.filter(email => email.isRead);
      if (status === 'unread')
        filteredEmails = filteredEmails.filter(email => !email.isRead);
      if (status === 'starred')
        filteredEmails = filteredEmails.filter(email => email.isStarred);
      if (status === 'sent')
        filteredEmails = filteredEmails.filter(email => email.isSent);
      if (status === 'unstarred')
        filteredEmails = filteredEmails.filter(email => !email.isStarred);
      if (this.sortBy === 'date')
        filteredEmails = filteredEmails.sort((a, b) => a.sentAt - b.sentAt);
      if (this.sortBy === 'title')
        filteredEmails = filteredEmails.sort((a, b) =>
          a.subject.localeCompare(b.subject)
        );
      return filteredEmails;
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
