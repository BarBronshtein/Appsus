export default {
  template: `
  <p>{{show}}
  <a class="btn" @click="isAllDesc=!isAllDesc">{{toggleButton}}</a>
  </p>
  
  `,
  props: ['txt'],
  data() {
    return {
      isAllDesc: false,
    };
  },
  computed: {
    show() {
      const show = { false: this.txt.slice(0, 100), true: this.txt };
      return show[this.isAllDesc];
    },
    toggleButton() {
      const btnText = { false: '...', true: 'Less' };
      return btnText[this.isAllDesc];
    },
  },
};
