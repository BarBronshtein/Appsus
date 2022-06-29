export default {
  props: ['review'],
  template: `
    <section class="review-preview"><pre></pre>
      <p>Full Name:{{fullName}}</p>
      rate:{{rate}}
      <p>Date: {{uploaded}}</p>
      <p style="white-space:pre">Review Description: {{description}}</p>
      <a @click="removeReview" class="btn">X</a>
    </section>
`,
  methods: {
    removeReview() {
      this.$emit('deleteReview', this.review.id);
    },
  },
  computed: {
    fullName() {
      return this.review.fullName;
    },
    uploaded() {
      return this.review.uploatedAt;
    },
    description() {
      return this.review.description;
    },
    rate() {
      return this.review.rate;
    },
  },
};
