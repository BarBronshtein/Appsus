export default {
  template: `
 <section class="email-compose">
    <form @submit.prevent="composeEmail" class="email-compose-form">
        <label >
          <h5>
              From: {{sendEmail.from}}
          </h5>
            <span>
                to:
            </span>
            <input v-model="sendEmail.to"  type="email" class="email-form-input-to">
        </label>
        <label>
            <span>subject:

            </span>
            <input type="text" max v-model="sendEmail.subject">
        </label>
        <textarea class="" v-model="sendEmail.body" cols="30" rows="10">
        </textarea>
        <button>Send</button>
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
