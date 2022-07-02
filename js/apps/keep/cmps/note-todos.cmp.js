import { keepService } from '../services/keep-service.js';
import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <h4 contenteditable @input="updateTitle">{{note.info.title}}</h4>
    <ul>
      <li v-for="(todo,idx) in note.info.todos" class="flex space-between">
        <p :style="lineStyle(todo)"
        @click="markTodo(todo)"
        contenteditable @input="updateTodo($event,idx)">{{todo.txt}}</p>
        <button class="todo-btn fa-solid fa-xmark"
        @click="removeTodo(idx)"></button>
      </li>
    </ul>
    <form @submit.prevent="addTodo" >
    <input v-model="todoInput" type="text" placeholder="Type your task here...">
    </form>
    <note-actions :note="note"/> 
  </article>
  `,
  data() {
    return {
      todoInput:''
    }
  },
  methods: {
    updateTodo(e,idx){
      this.note.info.todos[idx].txt=e.target.innerText
      this.$emit('update', this.note)
    },
    updateTitle(e){
      this.note.info.title=e.target.innerText
      this.$emit('update', this.note)
    },
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
      const newTodoTxt = this.todoInput
      if (!newTodoTxt) return
      const newTodo = {
        txt: newTodoTxt,
        doneAt: null,
      }
      this.note.info.todos.push(newTodo)
      keepService.save(this.note)
      this.todoInput = ''
    }
  },
  computed: {
  },
  components: {
    noteActions
  }
};
