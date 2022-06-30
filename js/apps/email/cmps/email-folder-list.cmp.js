export default {
  template: `
  <section class="email-folder-list flex flex-column">
          <a @click="$emit('openModal')" class="btn compose-btn">
              Compose
            </a>
            <a class="flex justify-center text-align-c unread-emails">
            Unread emails:{{showUnreadEmailsCount}}
            </a>
       <router-link v-for="(opt,i) in options" :key="i" :to="'/email/'+opt">
            <div class="btn">
                {{opt.replace(opt[0],opt[0].toUpperCase())}}
            </div>
       </router-link>
        
  </section>
`,
  data() {
    return {
      options: ['inbox', 'sent', 'trash', 'draft'],
    };
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
