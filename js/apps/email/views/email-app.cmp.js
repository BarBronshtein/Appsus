import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';
import emailDetails from './email-details.cmp.js';
export default {
  name: 'email-app',
  template: `
  <section class="email-app">
      <email-filter v-if="!routeEmailId" @filtered="setFilter" />
      <email-list @reply="replyToEmail" v-if="!routeEmailId" :emails=emailsToShow />
      <email-folder-list @openModal="toggleForm" :emails="emails"/>
      <email-details @markAsRead="updateEmails" v-if="routeEmailId"/>
    </section>
    <aside>
        <email-compose :email="email"  @closeForm="closeModal" :user="loggedUser" @saveAsDraft="saveEmail" @composedEmail="saveEmail" v-if="showModal" />
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
      routeEmailId: null,
      email:null,
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
    updateEmails(email) {
      const idx = this.emails.findIndex(({ id }) => id === email.id);
      this.emails.splice(idx, 1, email);
    },
    saveEmail(email) {
      emailService
        .save(email)
        .then(emailService.query)
        .then(emails => {
          this.emails = emails;
          this.showModal = email.status === 'draft' ? true : false;
        });
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
    replyToEmail(email) {
      this.showModal = true;
      this.email=email
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
      2;
      if (txt)
        // Filter by text user inputs and checks if exists in the subject or from or to the emails was sent
        filteredEmails = filteredEmails.filter(
          ({ subject, to, from }) =>
            regex.test(subject) || regex.test(to) || regex.test(from)
        );
      // Filter by condition
      if (condition?.includes('un')) {
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
      //   Filter trash emails
      if (status === 'trash')
        filteredEmails = filteredEmails.filter(email => email.isTrash);
      // Filter emails by status excludes tossed to trash emails
      else if (status)
        filteredEmails = filteredEmails.filter(
          email => email.status === status && !email.isTrash
        );
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
    emailDetails,
  },
  unmounted() {
    this.unsubscribe();
  },
  watch: {
    $route: {
      handler() {
        const {
          params: { status, emailId },
        } = this.$route;
        this.routeEmailId = emailId;
        return (this.filterBy.status = status);
      },
      immediate: true,
    },
  },
};
