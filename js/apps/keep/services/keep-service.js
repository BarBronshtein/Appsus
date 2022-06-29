import { utilService } from '../../../services/utils-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notesDB';
_createNotes();

export const keepService = {
  query,
  remove,
  save,
  getEmptyNote,
  get,
};

function query() {
  return storageService.query(NOTES_KEY);
  // return utilService.loadFromStorage(NOTES_KEY);
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

function getEmptyNote() {
  // return { id: '', vendor: '', maxSpeed: 0 };
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
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'note-img',
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
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
      },
    ];
    utilService.saveToStorage(NOTES_KEY, notes);
  }
}

function _createNote() {
  const note = {
    id: utilService.makeId(),
    title: '',
  };
  return note;
}