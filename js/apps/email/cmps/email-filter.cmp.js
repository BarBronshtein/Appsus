export default {
  template: `
 <section class="email-filter">
    <input type="search" placeholder="Search mail">
    <select >
        <option v-for="opt in options" :value="opt">{{opt.replace(opt[0], opt[0].toUpperCase())}}</option>
    </select>
 </section>
`,
  data() {
    return {
      txt: '',
      options: ['all', 'read', 'unread', 'draft', 'sent', 'starred'],
    };
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
};
