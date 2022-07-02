export default {
  template: `
 <section class="home-page flex flex-column space-around">
    <h1>Welcome to Appsus</h1>
    <section class="home-apps">
      <article class="above-apps">
      <div>
        <img @click="$router.push('/book')" src="img/home-imgs/books.png" alt="books"> 
        </div>
      <div>
        <img @click="$router.push('/email/inbox')" src="img/home-imgs/gmail.png" alt="gmail"> 
      </div>
      </article>
      <div>
        <img @click="$router.push('/keep')" src="img/home-imgs/keep.png" alt="keep"> 
      </div>
    </section>
 </section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
};
