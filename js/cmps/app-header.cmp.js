export default {
  template: `
      <div @click="toggleMenu" :class="[menuOpen,'main-screen']"></div>
     <header class="app-header">
    <div class="logo">
        <h3 class="fa-brands fa-accusoft"> Books!</h3>
    </div>
      <ul :class="[expand,'main-navbar']">
        <router-link @click="toggleMenu(false)" :to="sendTo(opt)" v-for="(opt,i) in options" :key="opt">{{opt.replace(opt[0],opt[0].toUpperCase())}}</router-link>
      </ul>
      <button @click="toggleMenu" class="btn menu-toggle" :class="menuSign"></button>
    </header>
 `,
  data() {
    return {
      options: ['home', 'email', 'keep', 'book', 'about'],
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    sendTo(opt) {
      if (opt === 'email') return '/email/inbox';
      if (opt === 'home') return '/';
      return '/' + opt;
    },
  },
  computed: {
    menuSign() {
      return this.isOpen ? 'fa-solid fa-xmark menu-open' : 'fa-solid fa-bars';
    },
    menuOpen() {
      return this.isOpen ? 'menu-open' : '';
    },
    expand() {
      if (this.isOpen) return 'expand';
    },
  },
};
