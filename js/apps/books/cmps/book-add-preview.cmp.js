export default {
  props: ['opt'],
  template: `<section>
    <span>{{opt.title}}
        
    </span>
    <button class="btn add-book-btn" @click="addThisBook">+</button>
 </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {
    addThisBook() {
      this.$emit('addedBook', this.opt.id);
    },
  },
  computed: {},
  unmounted() {},
};
