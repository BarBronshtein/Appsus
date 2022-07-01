export default {
  template: `
  <section class="email-folder-list flex flex-column">
          <a @click="$emit('openModal')" class="btn compose-btn">
          Compose
            </a>
            
       <router-link v-for="(opt,i) in options" :key="i" :to="'/email/'+opt" >
            <div class="btn email-status-btn" :class="show(opt)">
                <i :class="'fa-solid fa-'+icons[i]"></i>
                <span>{{opt.replace(opt[0],opt[0].toUpperCase())}}</span>
            </div>
       </router-link>
       <a v-if="showUnreadEmailsCount" class="flex justify-center align-center text-align-c email-active unread-emails">
            <i class="fa-solid fa-envelope"></i>
            <small>{{showUnreadEmailsCount}}</small>
            </a>
  </section>
`,
  data() {
    return {
      options: ['inbox', 'sent', 'trash', 'draft'],
      icons: ['inbox', 'paper-plane', 'trash', 'file'],
    };
  },

  methods: {
    show(opt) {
      if (opt === this.$route.params.status) return 'email-active';
    },
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
