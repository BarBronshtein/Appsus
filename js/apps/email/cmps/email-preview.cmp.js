import emailPartiallyOpen from '../cmps/email-partially-open.cmp.js';
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
export default {
  template: `
 <section @click="$emit('selectedEmail',email)" class="email-preview flex align-center" >
        <div @click.stop="toggleStarred"  :class="[showStarred,'fa-solid fa-star email-icon ']">
        </div>
        <div  class="details flex align center">
            <span>
                {{email.from}}
            </span>
            <span>
                {{email.subject}} - {{showContent}}
            </span>
        </div>
        <div class="email-icons">
        <i @click.stop="toggleRead" :class="[showRead,'email-icon']"></i>
        <i @click.stop="removeEmail" class="fa-solid fa-trash-can email-icon"></i>
        <i @click.stop="restoreEmail" v-if="email.isTrash" class="fa-solid fa-trash-arrow-up email-icon"></i>
        <i class="fa-solid fa-reply email-icon" @click.stop="$emit('reply',email)"></i>
        <router-link :to="sendToNote" class="fa-solid fa-paper-plane email-icon"></router-link> 

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
      emailService.save(this.email).then(
        eventBus.emit('show-msg', {
          txt: this.email.isRead
            ? 'Email marked as read'
            : 'Email marked as unread',
          type: 'success',
        })
      );
    },
    toggleStarred() {
      this.email.isStarred = !this.email.isStarred;
      emailService.save(this.email);
    },
    removeEmail() {
      eventBus.emit('remove-email', this.email);
    },
    restoreEmail() {
      this.email.isTrash = false;
      emailService.save(this.email).then(
        eventBus.emit('show-msg', {
          txt: 'Email restored from trash',
          type: 'success',
        })
      );
    },
  },
  computed: {
    showContent() {
      if (this.email.body.length > 20)
        return this.email.body.slice(0, 17) + '...';
      return this.email.body;
    },
    showRead() {
      return {
        'fa-solid fa-envelope': this.email.isRead === false,
        'fa-solid fa-envelope-open': this.email.isRead === true,
      };
    },
    showStarred() {
      return this.email.isStarred ? 'email-star-yellow' : 'email-star-grey';
    },
    sendToNote() {
      return (
        `/keep/` +
        '?' +
        new URLSearchParams({
          title: this.email.subject,
          txt: this.email.body,
        }).toString()
      );
    },
  },
  unmounted() {},
  props: ['email', 'selectedEmail'],
  components: { emailPartiallyOpen },
};
