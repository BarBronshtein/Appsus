export default {
  template: `
 <section class="email-compose">
 <h4>Write your email
        <button class="btn btn-close-form"  @click="$emit('closeForm',false)">
          X
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
        to: '',
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        isSent: true,
        from: this.user.email,
      },
    };
  },
  created() {
    // setInterval();
  },
  methods: {
    composeEmail() {
      const newEmail = JSON.parse(JSON.stringify(this.sendEmail));
      this.sendEmail.to = '';
      this.sendEmail.body = '';
      this.sendEmail.subject = '';
      newEmail.sentAt = Date.now();
      this.$emit('composedEmail', newEmail);
    },
  },
  computed: {},
  unmounted() {},
  props: ['user'],
};
