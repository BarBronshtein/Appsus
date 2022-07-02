export default {
  template: `<section class="modal-input-container">
    <h3>Your Youtube video adress</h3>
    <input type="text" v-model="videoUrl" placeholder="Type here...">
    <div class="flex space-between">
        <button class="btn" @click="$emit('updatedVidUrl',videoUrl)">Submit</button>
        <button class="btn" @click="$emit('closed')">Close</button>
    </div>
  </section>
  `,
  data() {
    return {
        videoUrl:''
    }
  },
  methods:{
  },
  computed: {
  },
  components:{
  },
};
