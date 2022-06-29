export default {
  template: `
 <section class="book-preview">
    <pre>{{email}}</pre>
    <span>{{email.subject}}</span>
 </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
  props: ['email'],
};
