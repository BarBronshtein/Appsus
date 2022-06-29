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
    <form @submit.prevent="addTodo" >
    <input ref="todoInput" type="text" placeholder="Type your task here...">
    </form>
    <note-actions :note="note"/> 
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
      this.note.info.todos.splice(todoIdx, 1)
      keepService.save(this.note)
    },
    lineStyle(todo) {
      return {
        cursor: 'pointer',
        textDecoration: todo.doneAt ? 'line-through' : 'none'
      }
    },
    addTodo() {
      const newTodo = {
        txt: this.$refs.todoInput.value,
        doneAt: null,
      }
      this.note.info.todos.push(newTodo)
      keepService.save(this.note)
    }
  },
  computed: {
  },
  components: {
    noteActions
  }
};
