export default {
  template: `
 <section class="email-preview">
    <div class="email-preview-container">
        <span>
            {{email.to}}
        </span>
        <span>
            {{email.subject}}
        </span>
    </div>
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
