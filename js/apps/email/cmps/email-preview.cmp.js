import emailPartiallyOpen from '../cmps/email-partially-open.cmp.js';
export default {
  template: `
 <section class="email-preview" @click="$emit('selectedEmail',email)">
        <div class="details">

            <span>
                {{email.to}}
            </span>
            <span>
                {{email.subject}}
            </span>
        </div>
        <div class="icons">
        <i :class="showRead"></i>
        </div>
        <email-partially-open v-if="selectedEmail===email" :email="selectedEmail"/>
 </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    showRead() {
      return {
        'fa-solid fa-envelope': this.email.isRead,
        'fa-solid fa-envelope-open': !this.email.isRead,
      };
    },
  },
  unmounted() {},
  props: ['email', 'selectedEmail'],
  components: { emailPartiallyOpen },
};
