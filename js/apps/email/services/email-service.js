import { utilService } from '../../../services/utils-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAIL_KEY = 'emailsDB';
const email = {
  id: 'e101',
  subject: 'Miss you!',
  body: 'Would love to catch up sometimes',
  isRead: false,
  sentAt: 1551133930594,
  to: 'momo@momo.com',
  isStarred: false,
  isRead: true,
};
const email2 = {
  id: 'e102',
  subject: 'Love you!',
  body: 'Would love to hang up with you',
  isRead: true,
  sentAt: 1551188930594,
  to: 'baba@momo.com',
  isStarred: true,
  isRead: false,
};
const email3 = {
  id: 'e103',
  subject: 'Hate you!',
  body: 'Never want to see you again!',
  isRead: false,
  sentAt: 1551645930594,
  to: 'dada1@momo.com',
  isStarred: false,
  isRead: false,
};

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' };

export const emailService = {
  query,
  remove,
  save,
  get,
};

_createEmails();

function query() {
  return storageService.query(EMAIL_KEY);
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId);
}

function get(emailId) {
  return storageService.get(EMAIL_KEY, emailId);
}

function save(email) {
  if (email.id) return storageService.put(EMAIL_KEY, email);
  else return storageService.post(EMAIL_KEY, email);
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY);
  if (!emails || !emails.length) {
    emails = [email, email2, email3];
    utilService.saveToStorage(EMAIL_KEY, emails);
  }
  return emails;
}
