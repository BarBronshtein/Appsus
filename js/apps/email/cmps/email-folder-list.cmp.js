export default {
  template: `
  <section class="email-folder-list flex flex-column">
          <a @click="$emit('openModal')" class="btn compose-btn">
              Compose
            </a>
            <a class="flex justify-center text-align-c unread-emails">
            Unread emails:{{showUnreadEmailsCount}}
            </a>
       <router-link to="">
            <div class="btn inbox-filter-list">
                Inbox
            </div>
       </router-link>
       <router-link to="">
            <div class="btn starred-filter-list">
                Starred
            </div>
        </router-link>
        <router-link to="">
            <div class="btn trash-filter-list">
                Trash
            </div>
        </router-link>
        <router-link to="">
            <div class="btn sent-filter-list">
                Sent
            </div>
        </router-link>
        <router-link to="">
            <div class="btn draft-filter-list">
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
        if (!email.isRead) return acc + 1;
        else return acc;
      }, 0);
    },
  },
  unmounted() {},
  props: ['emails'],
};
