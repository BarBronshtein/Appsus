import emailPartiallyOpen from '../cmps/email-partially-open.cmp.js';
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
export default {
  template: `
 <section class="email-preview" >
        <div @click="toggleStarred"  :class="[showStarred,'email-icon']">
          ★
        </div>
        <div @click="$emit('selectedEmail',email)" class="details">
            <span>
                {{email.from}}
            </span>
            <span>
                {{email.subject}}
            </span>
        </div>
        <div class="email-icons">
        <i @click="toggleRead" :class="[showRead,'email-icon']"></i>
        <i @click="removeEmail" class="fa-solid fa-trash-can email-icon"></i>
        </div>
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
      eventBus.emit('remove-email', this.email);
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
