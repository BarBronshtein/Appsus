export default {
  template: `
  <section class="email-folder-list">

    <router-link to="">
        <p>
            {{showUnreadEmailsCount}}
        </p>
        <div class="btn compose-btn">
            Compose
        </div>
    </router-link>
    <router-link to="">
        <div class="btn inbox-btn">
            Inbox
        </div>
    </router-link>
    <router-link to="">
        <div class="btn starred-btn">
            Starred
        </div>
    </router-link>
    <router-link to="">
        <div class="btn trash-btn">
            Trash
        </div>
        <div class="btn sent-btn">
            Sent
        </div>
        <div class="btn draft-btn">
            Draft
        </div>
    </router-link>
  </section>
`,
  data() {
    return {};
  },

  methods: {
    a() {},
  },
  computed: {
    showUnreadEmailsCount() {
      return this.emails?.reduce((acc, email) => {
        if (email.isRead) return acc + 1;
        else return acc;
      }, 0);
    },
  },
  unmounted() {},
  props: ['emails'],
};
