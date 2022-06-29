export default {
  props: ['info'],
  template: `<article class="note-container">
    <h2>{{info.label}}</h2>
    <ul>
      <li v-for="todo in info.todos">
        <p :style="lineStyle(todo)">{{todo.txt}}</p>
      </li>
    </ul>

  </article>
  `,
  data() {
    return {
      currTodo:null
    };
  },
  methods:{},
  computed: {
    lineStyle(todo) {
      return {
        textDecoration: todo.doneAt?'line-through':'none'
      }
    }
  },
};
