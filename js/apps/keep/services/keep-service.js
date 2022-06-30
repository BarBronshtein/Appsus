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

function saveNotes(notes){
  utilService.saveToStorage(NOTES_KEY, notes);
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
          title: 'Fullstack Me Baby!',
        },
        style: {
          backgroundColor: '#25370d',
        },
      },
      {
        id: 'n102',
        type: 'note-img',
        isPinned: false,
        info: {
          url: '../keep-images/nature.jpg',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
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
              doneAt: 187111111,
            },
          ],
        },
        style: {
          backgroundColor: '#02c45d',
        },
      },
    ]
    utilService.saveToStorage(NOTES_KEY, notes)
  }
}