import noteActions from "./note-actions.cmp.js";

export default {
    props: ['note'],
    template: `<article class="note-container">
      <iframe class="video-player"  width="100%" height="200"
      :src="note.info.url">
    </iframe>    
    <h3>{{note.info.title}}</h3>
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
  