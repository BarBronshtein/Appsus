import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
// import bookAddPreview from './book-add-preview.cmp.js';

export default {
    template: `
    <section class="note-add-container flex space-between">
        <input ref="noteTitle" type="text" placeholder="Write the title and press the Note type.">
        <div class="note-add-options">
            <p class="note-add-txt fa-solid fa-font"
            @click="onAddTxtNote"></p>
            <p class="note-add-img fa-solid fa-image"
            @click="onAddImgNote"></p>
            <p class="note-add-video fa-brands fa-youtube"
            @click="onAddVideoNote"></p>
            <p class="note-add-list fa-solid fa-list"
            @click="onAddListNote"></p>
            <p class="note-add-audio fa-solid fa-file-audio"
            @click="onAddAudioNote"></p>
        </div>

        <input type="file" class="hide-element" ref="fileImageInput" @change="onImageSelect"/>
        <input type="file" class="hide-element" ref="fileAudioInput" @change="onAudioSelect"/>
    </section>
`,
    data() {
        return {
        };
    },
    created() {

    },
    methods: {
        onAddTxtNote() {

            const noteTitle = this.$refs.noteTitle.value
            if (!noteTitle) return

            const newNote = {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: noteTitle,
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
            const imgTitle = this.$refs.noteTitle.value
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
                    title: this.$refs.noteTitle.value,
                    url: vidUrl.replace("watch?v=", "embed/"),
                },
                style: {
                    backgroundColor: '#eeeeee',
                },
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddListNote() {
            const newNote = {
                id: '',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: this.$refs.noteTitle.value,
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
            const audioTitle = this.$refs.noteTitle.value
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
    components: {
        // bookAddPreview
    },
    computed: {},
    created() {
        const queryParams = this.$route.query
        console.log(queryParams);
        if(!queryParams.title&&!queryParams.txt) return
        const newNote = {
            id: '',
            type: 'note-txt',
            isPinned: false,
            info: {
                title: queryParams.title,
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
