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
      <email-folder-list @openModal="toggleForm" :emails="emails"/>
    </section>
    <aside>
        <email-compose @closeForm="closeModal" :user="loggedUser" @composedEmail="saveEmail" v-if="showModal" />
    </aside>
  
`,
  data() {
    return {
      emails: null,
      showModal: false,
      unsubscribe: null,
      filterBy: {},
      sortBy: '',
      loggedUser: null,
    };
  },
  created() {
    emailService.queryUser().then(user => (this.loggedUser = user));

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
      this.showModal = false;
    },
    removeEmail(receivedEmail) {
      if (!receivedEmail.isTrash) {
        receivedEmail.isTrash = true;
        return emailService.save(receivedEmail);
      } else
        emailService.remove(receivedEmail.id).then(() => {
          const idx = this.emails.findIndex(
            email => email.id === receivedEmail.id
          );
          this.emails.splice(idx, 1);
        });
    },
    toggleForm() {
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  computed: {
    emailsToShow() {
      // Guard
      if (!this.emails) return;

      const { txt, status, condition } = this.filterBy;
      const regex = new RegExp(txt, 'i');
      let filteredEmails = this.emails;

      if (txt)
        // Filter by text user inputs and checks if exists in the subject or from or to the emails was sent
        filteredEmails = filteredEmails.filter(
          ({ subject, to, from }) =>
            regex.test(subject) || regex.test(to) || regex.test(from)
        );
      // Filter by condition
      if (condition && condition.includes('un')) {
        // Adjusting the condition to fit into our data structure
        const adjustedCondition =
          'is' +
          condition.slice(2).replace(condition[2], condition[2].toUpperCase());

        filteredEmails = filteredEmails.filter(
          email => email[adjustedCondition]
        );
      } else if (condition) {
        // Adjusting the condition to fit into our data structure
        const adjustedCondition =
          'is' + condition.replace(condition[0], condition[0].toUpperCase());

        filteredEmails = filteredEmails.filter(
          email => !email[adjustedCondition]
        );
      }

      if (status && status !== 'inbox') {
        filteredEmails = filteredEmails.filter(
          email =>
            email['is' + status.replace(status[0], status[0].toUpperCase())]
        );
      }
      // Sort by date/title
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
  watch: {
    '$route.hash': {
      handler() {
        const hash = this.$route.hash;
        return (this.filterBy.status = hash.slice(1));
      },
      immediate: true,
    },
  },
};
