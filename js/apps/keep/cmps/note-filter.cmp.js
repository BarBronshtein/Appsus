export default {
    template: `
   <section class="note-filter-container">
      <input @input="filter" type="search"
       v-model="filterBy.title" placeholder="Search by Note title">
      <select v-model="filterBy.type" @change="filter">
          <option v-for="(opt,i) in valueOptions" :key="i" :value="valueOptions[i]">
            {{userOptions[i]}}</option>
      </select>
   </section>
  `,
    data() {
        return {
            filterBy: {
                title: '',
                type: ''
            },
            userOptions: ['All', 'Text', 'Image', 'Video', 'List','Audio'],
            valueOptions: ['', 'note-txt', 'note-img', 'note-video', 'note-todos', 'note-audio'],
        };
    },
    created() { },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy })
        },
    },
    computed: {},
    unmounted() { },
};
