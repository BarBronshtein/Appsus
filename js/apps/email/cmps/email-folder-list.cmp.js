export default {
  template: `
  <section class="email-folder-list">
    <router-link to="">
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
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
};
