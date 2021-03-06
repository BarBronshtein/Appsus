import { emailService } from '../services/email-service.js';
export default {
  template: `
 <section v-if="sendEmail.from" class="email-compose">
 <h4>Write your email
        <button class="btn btn-close-form fa-solid fa-xmark"  @click="$emit('closeForm',false)">
        </button>
      </h4>
    <form @submit.prevent="composeEmail" class="email-compose-form">
      
      
      <label>
            <input placeholder="To" required v-model="sendEmail.to"  type="email" class="email-form-input-to">
        </label>
        <label>
            <input required placeholder="Subject" type="text" class="email-form-input-subject" maxlength="15" v-model="sendEmail.subject">
        </label>
        <textarea class="email-compose-textarea" v-model="sendEmail.body" cols="30" rows="10">
        </textarea>
        <div class="btn-email-container">
          <button type="submit" class="btn send-form-btn">
            Send
          </button>
        </div>
    </form>
 </section>
`,
  data() {
    return {
      sendEmail: {
        to: this.email?.to || '',
        subject: this.email?.subject || this.note?.title || '',
        body: this.note?.txt || '',
        isRead: false,
        isStarred: false,
        status: 'sent',
        from: null,
      },
      interval: null,
    };
  },
  created() {
    emailService.queryUser().then(({ email }) => {
      this.sendEmail.from = email;
      const { to } = this.sendEmail;
      this.sendEmail.to = to === email ? this.email?.from : to;
    });
    this.interval = setInterval(() => {
      const { to, subject, body } = this.sendEmail;
      // If nothing was written exit
      if (!to && !subject && !body) return;
      const newEmail = this.sendEmail;
      newEmail.sentAt = Date.now();
      newEmail.status = 'draft';
      this.$emit('saveAsDraft', newEmail);
    }, 5000);
  },
  methods: {
    composeEmail() {
      const newEmail = JSON.parse(JSON.stringify(this.sendEmail));
      newEmail.sentAt = Date.now();
      newEmail.status = 'sent';
      this.$emit('composedEmail', newEmail);

      this.sendEmail.to = '';
      this.sendEmail.body = '';
      this.sendEmail.subject = '';
    },
  },
  computed: {},
  unmounted() {
    clearInterval(this.interval);
    this.interval = '';
    this.$emit('clearProps');
  },
  props: ['email', 'note'],
};
