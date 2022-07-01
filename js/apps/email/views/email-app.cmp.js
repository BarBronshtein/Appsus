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
      <email-filter @setSort="setSortBy" v-if="!routeEmailId" @filtered="setFilter" />
      <email-list @reply="replyToEmail" v-if="!routeEmailId" :emails=emailsToShow />
      <email-folder-list @openModal="toggleForm" :emails="emails"/>
      <email-details @markAsRead="updateEmails" v-if="routeEmailId"/>
    </section>
    <aside>
        <email-compose @clearProps=clearPassedProps :note="noteDetails" :email="email"  @closeForm="closeModal"  @saveAsDraft="saveEmail" @composedEmail="saveEmail" v-if="showModal" />
    </aside>
  
`,
  data() {
    return {
      emails: null,
      showModal: false,
      unsubscribe: null,
      filterBy: {},
      sortBy: '',
      routeEmailId: null,
      email: null,
      noteDetails: null,
    };
  },
  created() {
    emailService.query().then(emails => (this.emails = emails));

    this.unsubscribe = eventBus.on('remove-email', this.removeEmail);
  },
  methods: {
    setSortBy(status) {
      if (this.sortBy.status === status) this.sortBy.state *= -1;
      else this.sortBy = { status, state: 1 };
    },
    setFilter(filterBy) {
      const { status, txt, condition } = filterBy;
      this.filterBy = {
        status: status || this.filterBy.status,
        txt: txt,
        condition: condition || this.filterBy.condition,
      };
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
          if (email.status === 'draft') {
            this.showModal = true;
            eventBus.emit('show-msg', {
              txt: 'Saved as draft',
              type: 'success',
            });
          } else {
            this.showModal = false;
            eventBus.emit('show-msg', {
              txt: 'Email sent successfuly',
              type: 'success',
            });
          }
        });
    },
    removeEmail(receivedEmail) {
      if (!receivedEmail.isTrash) {
        receivedEmail.isTrash = true;
        eventBus.emit('show-msg', {
          txt: 'Email moved to trash',
          type: 'success',
        });
        return emailService.save(receivedEmail);
      } else
        emailService.remove(receivedEmail.id).then(() => {
          const idx = this.emails.findIndex(
            email => email.id === receivedEmail.id
          );
          this.emails.splice(idx, 1);
          eventBus.emit('show-msg', {
            txt: 'Email was removed successfuly',
            type: 'success',
          });
        });
    },
    replyToEmail(email) {
      this.showModal = true;
      this.email = JSON.parse(JSON.stringify(email));
      if (this.email.subject.startsWith('RE')) return;
      this.email.subject = 'RE: ' + this.email.subject;
    },
    toggleForm() {
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    },
    clearPassedProps() {
      this.email = null;
      this.noteDetails = null;
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
      if (condition === 'all') {
        // do nothing
      } else if (condition?.startsWith('un')) {
        // Adjusting the condition to fit into our data structure
        const adjustedCondition =
          'is' +
          condition.slice(2).replace(condition[2], condition[2].toUpperCase());

        filteredEmails = filteredEmails.filter(
          email => !email[adjustedCondition]
        );
      } else if (condition) {
        // Adjusting the condition to fit into our data structure
        const adjustedCondition =
          'is' + condition.replace(condition[0], condition[0].toUpperCase());

        filteredEmails = filteredEmails.filter(
          email => email[adjustedCondition]
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
      if (this.sortBy.status === 'date')
        filteredEmails = filteredEmails.sort(
          (a, b) => (a.sentAt - b.sentAt) * this.sortBy.state
        );
      else if (this.sortBy.status === 'title')
        filteredEmails = filteredEmails.sort(
          (a, b) => a.subject.localeCompare(b.subject) * this.sortBy.state
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
    '$route.params': {
      handler() {
        const {
          params: { status, emailId },
          query: { title, txt },
        } = this.$route;
        if (title && txt) {
          this.showModal = true;
          this.noteDetails = { title, txt };
        }
        this.routeEmailId = emailId;
        return (this.filterBy.status = status);
      },
      immediate: true,
    },
  },
};
