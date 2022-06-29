export default {
  template: `
 <section class="email-compose">
    <form @submit.prevent="sendEmail" class="email-compose-form">
        <label >
            <span>
                to:
            </span>
            <input v-model="sendTo.to"  type="email" class="email-form-input-to">
        </label>
        <label>
            <span>subject:

            </span>
            <input type="text" max="15" v-model="senTo.subject" />
        </label>
        <textarea class="" v-model="sendTo.body" cols="30" rows="10">
        </textarea>
    </form>
 </section>
`,
  data() {
    return {
      sendTo: {
        to: '',
        subject: '',
        body: '',
      },
    };
  },
  created() {},
  methods: {
    sendEmail() {
      console.log(this.sendTo);
    },
  },
  computed: {},
  unmounted() {},
};
