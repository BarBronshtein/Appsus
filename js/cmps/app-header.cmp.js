export default {
  template: `
     <header class="app-header">
    <div class="logo">
        <h3 class="fa-brands fa-accusoft"> Books!</h3>
    </div>
      <ul class="main-navbar">
        <router-link router-link to="/">Home</router-link>
        <router-link router-link to="/book">Books</router-link>
        <router-link router-link to="/keep">Keep</router-link>
        <router-link router-link to="/about">About</router-link>
      </ul>
    </header>
 `,
};
