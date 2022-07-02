import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
    <section class="note-add-container">
     <article v-if="isEditing">
        <input v-model="noteTitle" type="text" placeholder="Title">
    </article>
    <article class="flex space-between">
        <input v-model="noteTxt" type="text" placeholder="Take a note..." @click="isEditing=true">
        <p v-if="!isEditing" class="note-add-todo fa-solid fa-list"
        @click="onAddTodoNote"></p>
     </article>
     <article class="flex space-between">
        <div v-if="noteTxt" class="note-add-options">
            <p class="note-add-img fa-solid fa-image"
            @click="onAddImgNote"></p>
            <p class="note-add-video fa-brands fa-youtube"
            @click="onAddVideoNote"></p>
            <p class="note-add-audio fa-solid fa-file-audio"
            @click="onAddAudioNote"></p>
        </div>
        <div>
            <p class="note-add-txt"
            @click="onAddTxtNote">Add</p>
        </div>
        </article>
        <input type="file" class="hide-element" ref="fileImageInput" @change="onImageSelect"/>
        <input type="file" class="hide-element" ref="fileAudioInput" @change="onAudioSelect"/>
    </section>
`,
    data() {
        return {
            noteTitle:'',
            noteTxt:'',
            isEditing:false,
        }
    },
    created() {},
    methods: {
        onAddTxtNote() {
            const noteTitle = this.noteTitle
            const noteTxt = this.noteTxt
            if (!noteTitle) return

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
            const imgTitle = this.noteTitle
            const img = new Image()
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
            }
            reader.readAsDataURL(ev.target.files[0])
        },
        onAddVideoNote() {
            const vidUrl = prompt('Enter Youtube video adress')
            if (!vidUrl) return
            const newNote = {
                id: '',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: this.noteTitle,
                    url: vidUrl.replace("watch?v=", "embed/"),
                },
                style: {
                    backgroundColor: '#eeeeee',
                },
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddTodoNote() {
            const newNote = {
                id: '',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: this.noteTitle,
                    todos: [],
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
            const audioTitle = this.noteTitle
            const audio = new Audio()
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
            }
            reader.readAsDataURL(ev.target.files[0])
        },
    },
    components: {},
    computed: {},
    created() {
        const queryParams = this.$route.query
        if(!queryParams.title&&!queryParams.txt) return
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
