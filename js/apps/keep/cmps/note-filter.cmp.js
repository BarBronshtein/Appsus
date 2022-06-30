export default {
    template: `
   <section class="note-filter">
      <input @input="filter" type="search"
       v-model="filterBy.title" placeholder="Search by Title">
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
            userOptions: ['All', 'Text', 'Image', 'Video', 'List'],
            valueOptions: ['', 'note-txt', 'note-img', 'note-video', 'note-todos'],
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
