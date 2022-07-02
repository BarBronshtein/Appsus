import noteActions from "./note-actions.cmp.js";

export default {
    props: ['note'],
    template: `<article class="note-container">
      <!-- MAP-->
    <h4>{{note.info.title}}</h4>
        <note-actions :note="note"/>          
    </article>
    `,
    data() {
      return {};
    },
    computed: {
    },
    components:{
    noteActions
  }
  }
  