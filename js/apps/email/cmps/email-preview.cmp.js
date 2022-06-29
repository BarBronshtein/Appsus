import emailPartiallyOpen from '../cmps/email-partially-open.cmp.js';
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
export default {
  template: `
 <section class="email-preview" >
        <span @click="toggleStarred" class="email-icon" :class="showStarred">★</span>
        <span @click="$emit('selectedEmail',email)" class="details">
            <span>
                {{email.to}}
            </span>
            <span>
                {{email.subject}}
            </span>
        </span>
        <span class="email-icons">
        <span @click="toggleRead" class="email-icon" :class="showRead"></span>
        <span @click="removeEmail" class="fa-solid fa-trash-can email-icon"></span>
        </span>
        <!-- <email-partially-open v-if="selectedEmail===email" :email="selectedEmail"/> -->
 </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {
    toggleRead() {
      this.email.isRead = !this.email.isRead;
      emailService.save(this.email);
    },
    toggleStarred() {
      this.email.isStarred = !this.email.isStarred;
      emailService.save(this.email);
    },
    removeEmail() {
      eventBus.emit('remove-email', this.email.id);
    },
  },
  computed: {
    showRead() {
      return {
        'fa-solid fa-envelope': this.email.isRead === false,
        'fa-solid fa-envelope-open': this.email.isRead === true,
      };
    },
    showStarred() {
      return this.email.isStarred ? 'email-star-yellow' : 'email-star-grey';
    },
  },
  unmounted() {},
  props: ['email', 'selectedEmail'],
  components: { emailPartiallyOpen },
};
