export default {
  template: `
  <section class="email-folder-list flex flex-column">
          <div @click="$emit('openModal')" class="btn compose-btn">
              Compose
            </div>
            <a class="flex justify-center text-align-c">
            Unread emails:{{showUnreadEmailsCount}}
            </a>
       <router-link to="">
            <div class="inbox-filter-list">
                Inbox
            </div>
       </router-link>
       <router-link to="">
            <div class="starred-filter-list">
                Starred
            </div>
        </router-link>
        <router-link to="">
            <div class="trash-filter-list">
                Trash
            </div>
        </router-link>
        <router-link to="">
            <div class="sent-filter-list">
                Sent
            </div>
        </router-link>
        <router-link to="">
            <div class="draft-filter-list">
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
