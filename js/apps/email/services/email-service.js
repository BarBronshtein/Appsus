import { utilService } from '../../../services/utils-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAIL_KEY = 'emailsDB';
const USER_KEY = 'userDB';
export const emailService = {
  query,
  remove,
  save,
  get,
  queryUser,
};
_createUser();
_createEmails();

function query() {
  return storageService.query(EMAIL_KEY);
}

function queryUser() {
  return storageService.query(USER_KEY);
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
    const email = {
      id: 'e101',
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      status: 'sent',
      sentAt: 1551133930594,
      to: 'momo@momo.com',
      isStarred: false,
      isRead: true,
      from: 'user@appsus.com',
    };
    const email2 = {
      id: 'e102',
      subject: 'Love you!',
      body: 'Would love to hang up with you',
      isRead: true,
      sentAt: 1551188930594,
      from: 'baba@momo.com',
      to: 'user@appsus.com',
      status: 'inbox',
      isStarred: true,
      isRead: false,
    };
    const email3 = {
      id: 'e103',
      subject: 'Hate you!',
      body: 'Never want to see you again!',
      isRead: false,
      sentAt: 1551645930594,
      status: 'inbox',
      from: 'dada1@momo.com',
      to: 'user@appsus.com',
      isStarred: false,
      isRead: false,
    };
    emails = [email, email2, email3];
    utilService.saveToStorage(EMAIL_KEY, emails);
  }
  return emails;
}

function _createUser() {
  let loggedinUser = utilService.loadFromStorage(USER_KEY);
  if (!loggedinUser) {
    loggedinUser = {
      email: 'user@appsus.com',
      fullname: 'Mahatma Appsus',
    };
    utilService.saveToStorage(USER_KEY, loggedinUser);
  }
  return loggedinUser;
}
