export default {
  template: `
 <section class="email-filter flex align-center">
    <div class="email-filter-by flex align-center">
      <input @input="$emit('filtered',filterBy)" type="search" v-model="filterBy.txt" placeholder="Search mail">
      <select v-model="filterBy.condition" @change="$emit('filtered',filterBy)">
        <option v-for="(opt,i) in options" :key="i" :value="opt">{{opt.replace(opt[0], opt[0].toUpperCase())}}</option>
      </select>
    </div>
    <div class="email-sort-by">
      <i @click="setSort" class="fa-solid fa-sort">Date</i>
      <i @click="setSort" class="fa-solid fa-sort">Title</i>
    </div>
 </section>
`,
  data() {
    return {
      statusSortBy: '',
      filterBy: { txt: '', condition: 'all' },
      options: ['all', 'read', 'unread', 'starred', 'unstarred'],
    };
  },
  created() {},
  methods: {
    setSort(ev) {
      this.statusSortBy = ev.target.textContent.toLowerCase();
      this.$emit('setSort', this.statusSortBy);
    },
  },
  computed: {},
  unmounted() {},
};
