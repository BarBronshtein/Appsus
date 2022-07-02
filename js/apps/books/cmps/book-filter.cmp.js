export default {
  template: `<section class="book-filter">
    <form @submit.prevent="filter">
       <input placeholder="type something..." type="text" v-model="filterBy.title">
      <label >Min Price <input max="400" :title="filterBy.priceFrom" type="range" name="from" v-model.number="filterBy.priceFrom"></label>
      <label >Max Price <input max="400" :title="filterBy.priceTo"  type="range" name="to" v-model.number="filterBy.priceTo"></label>
      <button  class="btn filter-submit">Filter!</button>
    </form>
    </section>
  `,
  data() {
    return {
      filterBy: {
        title: '',
        priceFrom: 0,
        priceTo: 400,
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
