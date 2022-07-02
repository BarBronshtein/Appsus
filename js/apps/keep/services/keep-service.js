import { utilService } from '../../../services/utils-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notesDB';
_createNotes();

export const keepService = {
  query,
  remove,
  save,
  get,
  saveNotes,
};

function query() {
  return storageService.query(NOTES_KEY);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note);
  else return storageService.post(NOTES_KEY, note);
}

function saveNotes(notes) {
  utilService.saveToStorage(NOTES_KEY, notes);
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
  notes = [
    {
      id: utilService.makeId(),
      type: 'note-video',
      isPinned: true,
      info: {
        url: 'https://www.youtube.com/embed/fbqHK8i-HdA',
        title: 'Best video on Youtube',
      },
      style: {
        backgroundColor: '#d7aefb',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      isPinned: true,
      info: {
        url: 'img/keep-images/pappies.webp',
        title: 'Ayyyyyyy papi!',
      },
      style: {
        backgroundColor: '#e6c9a8',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: false,
      info: {
        title: 'React or Vue?',
        txt: 'What do you Think',
      },
      style: {
        backgroundColor: '#fbbc04',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-audio',
      isPinned: false,
      info: {
        url: 'audio/uncharted.mp3',
        title: 'About this song I dont sure...',
      },
      style: {
        backgroundColor: '#ccff90',
      }
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: false,
      info: {
        title: 'Fullstack Me Baby!',
        txt: 'Im not sure',
      },
      style: {
        backgroundColor: '#e8eaed',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-video',
      isPinned: false,
      info: {
        url: 'https://www.youtube.com/embed/GWGbOjlJDkU',
        title: 'Youtibe API is shit',
      },
      style: {
        backgroundColor: '#aecbfa',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        title: 'Press here',
        txt: 'Its editable!',
      },
      style: {
        backgroundColor: '#f28b82',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      isPinned: false,
      info: {
        url: 'img/keep-images/lake.jpg',
        title: 'Looks good!',
      },
      style: {
        backgroundColor: '#f28b82',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-todos',
      isPinned: true,
      info: {
        title: 'My content is editable',
        todos: [
          {
            txt: 'You can try',
            doneAt: null,
          },
          {
            txt: 'For real',
            doneAt: null,
          },
        ],
      },
      style: {
        backgroundColor: '#fff475',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      isPinned: false,
      info: {
        url: 'img/keep-images/india.jpg',
        title: 'I want to be there',
      },
      style: {
        backgroundColor: '#fdcfe8',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        title: 'Programming is life',
        txt: 'a daily reminder',
      },
      style: {
        backgroundColor: '#d7aefb',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-todos',
      isPinned: false,
      info: {
        title: 'Get my stuff together',
        todos: [
          {
            txt: 'Driving liscence',
            doneAt: null,
          },
          {
            txt: 'Coding power',
            doneAt: null,
          },
          {
            txt: 'Coding weak',
            doneAt: 187111111,
          },
        ],
      },
      style: {
        backgroundColor: '#ccff90',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-audio',
      isPinned: true,
      info: {
        url: 'audio/chasing-drams.mp3',
        title: 'This is my favorite song',
      },
      style: {
        backgroundColor: '#cbf0f8',
      }
    },
     {
      id: utilService.makeId(),
      type: 'note-todos',
      isPinned: false,
      info: {
        title: 'Grocery',
        todos: [
          {
            txt: 'milk',
            doneAt: 187111111,
          },
          {
            txt: 'Eggs',
            doneAt: 187111111,
          },
          {
            txt: 'I like eggs',
            doneAt: null,
          },
        ],
      },
      style: {
        backgroundColor: '#e8eaed',
      },
    },
  ]
  utilService.saveToStorage(NOTES_KEY, notes);
  }
}
