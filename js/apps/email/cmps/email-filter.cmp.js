export default {
  template: `
 <section class="email-filter">
    <input @input="$emit('filtered',filterBy)" type="search" v-model="filterBy.txt" placeholder="Search mail">
    <select v-model="filterBy.status" @change="$emit('filtered',filterBy)">
        <option v-for="(opt,i) in options" :key="i" :value="opt">{{opt.replace(opt[0], opt[0].toUpperCase())}}</option>
    </select>
 </section>
`,
  data() {
    return {
      filterBy: { txt: '', status: 'all' },
      options: [
        'all',
        'read',
        'unread',
        'draft',
        'sent',
        'starred',
        'unstarred',
        'sent',
      ],
    };
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
};
