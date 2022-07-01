import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <h3 contenteditable @input="updateTitle">{{note.info.title}}</h3>
    <p contenteditable @input="updateTxt">{{note.info.txt}}</p>
    <note-actions :note="note"/>
  </article>
  `,
  data() {
    return {};
  },
  methods:{
    updateTitle(e){
      this.note.info.title=e.target.innerText
      this.$emit('update', this.note)
    },
    updateTxt(e){
      this.note.info.txt=e.target.innerText
      this.$emit('update', this.note)
     }
  },
  computed: {
  },
  components:{
    noteActions
  },
};
