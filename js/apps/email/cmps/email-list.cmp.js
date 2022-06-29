import emailPreview from '../cmps/email-preview.cmp.js';
export default {
  template: `
  <section class="email-list">
  <ul>
    <li v-for="email in emails" :key="email.id" class="email-preview-container">
      <book-preview :email="email"/>
    </li>
  </ul>
  </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  components: { emailPreview },
  props: ['emails'],
  unmounted() {},
};
