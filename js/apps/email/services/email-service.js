import { utilService } from '../../../services/utils-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAIL_KEY = 'emailsDB';
const email = {
  id: 'e101',
  subject: 'Miis you!',
  body: 'Would love to catch up sometimes',
  isRead: false,
  sentAt: 1551133930594,
  to: 'momo@momo.com',
};

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' };

export const emailService = {
  query,
  remove,
  save,
  get,
};

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
