import { keepService } from '../services/keep-service.js';
import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <h2>{{note.info.label}}</h2>
    <ul>
      <li v-for="(todo,idx) in note.info.todos" class="flex space-between">
        <p :style="lineStyle(todo)"
        @click="markTodo(todo)">{{todo.txt}}</p>
        <button class="btn fa-solid fa-xmark"
        @click="removeTodo(idx)"></button>
      </li>
    </ul>
    <input type="text" placeholder="Type your task here...">
    <note-actions  :note="note"/> 
  </article>
  `,
  data() {
    return {
    };
  },
  methods: {
    markTodo(todo) {
      todo.doneAt = todo.doneAt ? null : Date.now()
      keepService.save(this.note)
    },
    removeTodo(todoIdx) {
      console.log(todoIdx)
      this.note.info.todos.splice(todoIdx, 1)
      keepService.save(this.note)
    },
    lineStyle(todo) {
      return {
        cursor: 'pointer',
        textDecoration: todo.doneAt ? 'line-through' : 'none'
      }
    }
  },
  computed: {
  },
  components: {
    noteActions
  }
};
