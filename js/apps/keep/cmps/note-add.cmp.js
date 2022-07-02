import { eventBus } from '../../../services/event-bus-service.js';
import modalInput from '../cmps/modal-input.cmp.js';

export default {
    template: `
    <section class="note-add-container">

     <article v-if="isEditing">
        <input v-model="noteTitle" type="text" placeholder="Title">
     </article>

     <article class="flex space-between">
        <input v-if="!isEditingList" v-model="noteTxt" type="text" placeholder="Take a note..." @click="isEditing=true">
        
        <article v-if="isEditingList">
        <input v-for="(todoItem,idx) in getTodoList" type="text" 
        v-model="todoItem.txt" placeholder="+ New list item">
        </article>

        <p v-if="!isEditing" class="note-add-todo fa-solid fa-list"
        @click="isEditingList=true;isEditing=true "></p>

      </article>
      <article v-if="isEditing" class="flex space-between">

        <div class="note-add-options" :style="addOptionsStyle" >
            <p class="note-add-img fa-solid fa-image"
            @click="onAddImgNote"></p>
            <p class="note-add-video fa-brands fa-youtube"
            @click="toggleModal=true"></p>
          <modal-input v-if="toggleModal" @closed="toggleModal=false" @updatedVidUrl="onAddVideoNote"/>

            <p class="note-add-audio fa-solid fa-file-audio"
            @click="onAddAudioNote"></p>
        </div>

        <div>
            <p class="note-add"
            @click="onAddNote">{{getAddOrCloseText}}</p>
        </div>
       </article>

        <input type="file" class="hide-element" ref="fileImageInput" @change="onImageSelect"/>
        <input type="file" class="hide-element" ref="fileAudioInput" @change="onAudioSelect"/>
    </section>
`,
    data() {
        return {
            noteTitle: '',
            noteTxt: '',
            isEditing: false,
            isEditingList: false,
            todoList: [{ txt: '', doneAt: null }],
            toggleModal:false,
        }
    },
    created() { },
    methods: {
        onAddNote() {
            if (this.addOrClose()) {
                if (this.isEditingList) {
                    this.AddTodoNote()
                } else this.AddTxtNote()
            }
            this.resetInputs()
        },
        addOrClose() {
            return (this.noteTitle || this.noteTxt)
                || (this.todoList[0].txt)
        },
        AddTxtNote() {
            const noteTitle = this.noteTitle
            const noteTxt = this.noteTxt

            const newNote = {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: noteTitle,
                    txt: noteTxt,
                },
                style: {
                    backgroundColor: '#eeeeee',
                }
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddImgNote() {
            this.$refs.fileImageInput.click()
        },
        onImageSelect(ev) {
            var reader = new FileReader()
            // sets the image title by the title input and if its empty it takes the text input
            const imgTitle = this.noteTitle ? this.noteTitle : this.noteTxt
            const img = new Image()
            const resetInputsFunc = this.resetInputs
            reader.onload = function (event) {
                img.src = event.target.result
                const newNote = {
                    id: '',
                    type: 'note-img',
                    isPinned: false,
                    info: {
                        url: img.src,
                        title: imgTitle,
                    },
                    style: {
                        backgroundColor: '#eeeeee',
                    },
                }
                eventBus.emit('save-new-note', newNote)
                resetInputsFunc()
            }
            reader.readAsDataURL(ev.target.files[0])
        },
        onAddVideoNote(vidUrl) {
            if (!vidUrl) return
            // sets the video title by the title input and if its empty it takes the text input
            const videoTitle = this.noteTitle ? this.noteTitle : this.noteTxt
            const newNote = {
                id: '',
                type: 'note-video',
                isPinned: false,
                info: {
                    url: vidUrl.replace("watch?v=", "embed/"),
                    title: videoTitle,
                },
                style: {
                    backgroundColor: '#eeeeee',
                },
            }
            eventBus.emit('save-new-note', newNote)
            this.resetInputs()
        },
        AddTodoNote() {
            if (this.todoList.length > 1)
                this.todoList.splice(this.todoList.length - 1, 1)

            const newNote = {
                id: '',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: this.noteTitle,
                    todos: this.todoList,
                },
                style: {
                    backgroundColor: '#eeeeee',
                },
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddAudioNote() {
            this.$refs.fileAudioInput.click()
        },
        onAudioSelect(ev) {
            var reader = new FileReader()
            // sets the audio title by the title input and if its empty it takes the text input
            const audioTitle = this.noteTitle ? this.noteTitle : this.noteTxt
            const audio = new Audio()
            const resetInputsFunc = this.resetInputs

            reader.onload = function (event) {
                audio.src = event.target.result
                const newNote = {
                    id: '',
                    type: 'note-audio',
                    isPinned: false,
                    info: {
                        url: audio.src,
                        title: audioTitle,
                    },
                    style: {
                        backgroundColor: '#eeeeee',
                    },
                }
                eventBus.emit('save-new-note', newNote)
                resetInputsFunc()
            }
            reader.readAsDataURL(ev.target.files[0])
        },
        resetInputs() {
            this.isEditing = false
            this.isEditingList = false
            this.noteTitle = ''
            this.noteTxt = ''
            this.todoList = [{ txt: '', doneAt: null }]
            this.toggleModal=false
        },
    },
    components: {
        modalInput
    },
    computed: {
        getAddOrCloseText(){
            return this.addOrClose()?'Add note':'Close'
        },
        getTodoList() {
            const currList = this.todoList
            const listLength = currList.length

            if (currList[listLength - 1].txt)
                currList.push({ txt: '', doneAt: null })
            // in case their is 2 empty inputs it deletes the last input
            if (listLength > 1) {
                if (!currList[listLength - 1].txt && !currList[listLength - 2]?.txt)
                    currList.splice(listLength - 1, 1)
            }
            return currList
        },
        addOptionsStyle() {
            // In case that their is title and text he cant put an img/video/audio
            if ((this.noteTitle && this.noteTxt) || this.isEditingList)
                return {
                    opacity: 0,
                    ['pointer-events']: 'none',
                    transition: '0.3s all',
                }
        }
    },
    created() {
        const queryParams = this.$route.query
        if (!queryParams.title && !queryParams.txt) return
        const newNote = {
            id: '',
            type: 'note-txt',
            isPinned: false,
            info: {
                title: queryParams.title,
                txt: queryParams.txt,
            },
            style: {
                backgroundColor: '#eeeeee',
            }
        }
        eventBus.emit('save-new-note', newNote)
        this.$router.push('/keep')//reset the params
    },
    unmounted() { },
};
