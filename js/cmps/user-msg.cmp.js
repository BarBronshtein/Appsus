import { eventBus } from '../services/event-bus-service.js';
export default {
  template: `
 <section v-if="msg" class="user-msg" :class="msg.type">
    <button @click="hideMsg" class="btn hide-msg-btn">X</button>
    <h3>User msg</h3>
    <p>{{msg.txt}}</p>
    <router-link class="user-msg-link" :to="'/book/'+msg.link">Check it Out</router-link>
 </section>
`,
  data() {
    return {
      unsubscribe: null,
      msg: '',
    };
  },
  created() {
    this.unsubscribe = eventBus.on('show-msg', this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
    hideMsg() {
      this.msg = '';
    },
  },
  computed: {},
  unmounted() {
    this.unsubscribe();
  },
};
