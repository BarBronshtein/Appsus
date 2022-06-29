import { utilService } from '../../../services/utils-service.js';
import { storageService } from '../../../services/async-storage-service.js';

import booksJson from '../books.json' assert { type: 'json' };
const BOOKS_KEY = 'booksDB';
const GOOGLE_BOOKS_KEY = 'googleBooksDB';
const GOOGLE_URL =
  'https://www.googleapis.com/books/v1/volumes?printType=books&q=';
_createBooks();

export const bookService = {
  query,
  remove,
  save,
  getEmptyBook,
  displayByCurrency: utilService.displayByCurrency,
  get,
  addReview,
  deleteReview,
  getBooksFromGoogle,
  addBook,
  getBookTrailingIds,
};

function getBookTrailingIds(bookId) {
  return query().then(books => {
    const idx = books.findIndex(book => book.id === bookId);
    return {
      nextBookId: idx < books.length - 1 ? books[idx + 1].id : books[0].id,
      prevBookId: books.at(idx - 1).id,
    };
  });
}

function query() {
  return storageService.query(BOOKS_KEY);
  // return utilService.loadFromStorage(BOOKS_KEY);
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId);
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId);
}

function addReview(book, review) {
  // get().then(book=>)
  review.id = utilService.makeId();
  if (book.reviews) book.reviews.push(review);
  else book.reviews = [review];
  return save(book);
}
function deleteReview(book, reviewId) {
  // get().then()
  const idx = book.reviews.findIndex(review => review.id === reviewId);
  book.reviews.splice(idx, 1);
  return save(book);
}

function save(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book);
  else return storageService.post(BOOKS_KEY, book);
}

function getEmptyBook() {
  return { id: '', vendor: '', maxSpeed: 0 };
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY);
  if (!books || !books.length) {
    books = booksJson;
    utilService.saveToStorage(BOOKS_KEY, books);
    //     fetch('../../../books.json')
    //       .then(res => res.json())
    //       .then(books => utilService.saveToStorage(BOOKS_KEY, books));
  }
  return books;
}

function addBook(searchKey, bookId) {
  const storageKey = 'book-' + searchKey;
  const { books } = utilService.loadFromStorage(storageKey);
  const book = books.find(book => book.id === bookId);
  return storageService.post(BOOKS_KEY, book);
}

function getBooksFromGoogle(searchKey) {
  const storageKey = 'book-' + searchKey;
  const results = utilService.loadFromStorage(storageKey);
  if (!results || !results.length)
    return fetch(`${GOOGLE_URL}${searchKey}`)
      .then(res => res.json())
      .then(({ items }) => {
        const searchResults = {
          searchKey: storageKey,
          books: items.map(createFittedObject),
        };
        utilService.saveToStorage(storageKey, searchResults);
        return searchResults;
      });
  else return Promise.resolve(results);
}

function createFittedObject(item) {
  const {
    id,
    volumeInfo: {
      title,
      authors,
      subtitle,
      imageLinks: { thumbnail },
      publishedDate,
      categories,
      language,
    },
  } = item;
  const description =
    item?.description ??
    '234873290tu254iogfertiojg3tpgj5gjionrtlkjgjho5jf90340943jfotrnj';
  return {
    id,
    title,
    thumbnail,
    language,
    subtitle,
    authors,
    publishedDate,
    categories,
    description,
    listPrice: {
      amount: Math.trunc(Math.random() * 200),
      currencyCode: 'ILS',
      isOnSale: Math.random() < 0.35 ? true : false,
    },
  };
}

function _createBook() {
  const book = {
    id: utilService.makeId(),
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: 2022,
    description: '',
    pageCount: 74,
    categories: [],
    thumbnaul: '',
    language: 'he',
    listPrice: {
      amount: 100,
      currencyCode: 'ILS',
      isOnSale: false,
    },
  };
  return book;
}
