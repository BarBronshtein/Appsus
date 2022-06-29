import noteActions from "./note-actions.cmp.js";

export default {
    props: ['note'],
    template: `<article class="note-container">
        <iframe class="video-player" 
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
  