export default {
  props: ['book'],
  emits: ['addedReview'],
  name: 'review-add',
  template: `
  <form @submit.prevent="addReview" class="review-add review-form">
      <label>Full Name:<input :pattern="regex" ref="fullNameInput" type="text" placeholder="dont forget to capitalize"        v-model="review.fullName">
      </label>
      <label>Date:
        <input type="date" v-model="review.uploatedAt">
      </label>
      <label>Rate:
      <span class="btn btn-rate" @click="review.rate=i" v-for="i in 5">★</span>
      </label>
      <label>
        <span>Write your review</span>
        <textarea name="" cols="30" rows="10" v-model="review.description"></textarea>
      </label>
      <button class="btn add-review-btn">Add now!</button>
  </form>
`,
  data() {
    return {
      regex: '^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]+){0,2}$',
      review: {
        uploatedAt: this.formatDate(),
        fullName: '',
        description: '',
        rate: 1,
      },
    };
  },
  methods: {
    addReview() {
      this.$emit('addedReview', this.review);
    },
    formatDate() {
      return new Date().toISOString().slice(0, 10);
      // let now = new Date();
      // let month = now.getMonth() + 1;
      // let day = now.getDate();
      // if (month < 10) month = '0' + month;
      // if (day < 10) day = '0' + day;
      // return now.getFullYear() + '-' + month + '-' + day;
    },
  },
  computed: {},
  mounted() {
    this.$refs.fullNameInput.focus();
  },
  unmounted() {},
};
