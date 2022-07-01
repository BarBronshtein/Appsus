import { eventBus } from '../services/event-bus-service.js';
export default {
  template: `
 <section class="user-msg" :class="msgStyle">
   <!-- <p>Notice!</p> -->
   <p>{{msg?.txt}}</p>
   <router-link v-if="msg?.link" class="user-msg-link" :to="'/book/'+msg.link">Check it Out</router-link>
   <button @click="hideMsg" class="hide-msg-btn fa-solid fa-xmark"></button>
 </section>
`,
  data() {
    return {
      unsubscribe: null,
      msg: null,
      //  {
      //   txt: '',
      //   type: '',
      //   link: '',
      // },
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
      this.msg = null;
    },
  },
  computed: {
    msgStyle() {
      return {
        success: this.msg?.type === 'success',
        error: this.msg?.type === 'error',
        ['msg-shown']: this.msg,
      }
    }
  },
  unmounted() {
    this.unsubscribe();
  },
};
