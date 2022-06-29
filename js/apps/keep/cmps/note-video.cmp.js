import noteActions from "./note-actions.cmp.js";

export default {
    props: ['note'],
    template: `<article class="note-container">
      <h3>{{note.info.title}}</h3>
        <iframe class="video-player"  width="100%" height="200"
        :src="note.info.url">
        </iframe>    
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
  