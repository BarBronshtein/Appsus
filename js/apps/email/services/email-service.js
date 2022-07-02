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
      body: "Would love to catch up sometimes, Ever since i traveled to Lita we didn't get a chance to hangout",
      status: 'inbox',
      sentAt: 1581133930594,
      to: 'bnaya@bar.bestduo',
      isStarred: false,
      isRead: false,
      from: 'momo@momo.com',
    };
    const email2 = {
      id: 'e102',
      subject: 'Love you!',
      body: "Would love to hang up with you,it's been a while since we got to hang out just the two of us, lets make some plans so we could meet up again as soon as possible",
      isRead: true,
      sentAt: 1551188930594,
      from: 'baba@momo.com',
      to: 'bnaya@bar.bestduo',
      status: 'inbox',
      isStarred: true,
    };
    const email3 = {
      id: 'e103',
      subject: 'Hate you!',
      body: "Make sure you have solid and great demo data this will be your front of your's application",
      isRead: false,
      sentAt: 1551645930594,
      status: 'inbox',
      from: 'rotem@momo.com',
      to: 'bnaya@bar.bestduo',
      isStarred: true,
    };
    const email4 = {
      body: "i amm promising you there won't be any better project than us and that is guranteed",
      from: 'bar@appsus.com',
      id: 'mu6xrBu1',
      isRead: false,
      isStarred: false,
      sentAt: 1656773539364,
      status: 'inbox',
      subject: 'best duo',
      to: 'bnaya@bar.bestduo',
    };
    const email5 = {
      body: 'I knew you would be tempted to click this button hahahaha',
      from: 'asaf@click.here',
      id: 'RaVNaUzs',
      isRead: false,
      isStarred: false,
      sentAt: 1656774224383,
      status: 'inbox',
      subject: 'There a secret',
      to: 'banya@bar.bestduo',
    };
    const email6 = {
      body: '../keep-images/nature.jpg',
      from: 'photographer@img.com',
      id: 'DxiTp7UI',
      isRead: false,
      isStarred: false,
      sentAt: 1656774442283,
      status: 'inbox',
      subject: 'Bobi and Me',
      to: 'banya@bar.bestduo',
    };
    const email7 = {
      body: 'It was incredible experience right before the jump I was scared as shit almost lost all my nerves untill rotem pushed what an *******\n  but then the feeling when you just fall downwards felt insane all the adrenaline just overflowed my body. ',
      from: 'bnaya@bar.bestduo',
      id: 'pUEk1lMj',
      isRead: false,
      isStarred: false,
      sentAt: 1656774808606,
      status: 'sent',
      subject: 'about my bunji',
      to: 'baba@momo.com',
    };
    const email8 = {
      body: '../keep-images/google/books/nature.jpg',
      from: 'banya@bar.bestduo',
      id: 'DxiT5I',
      isRead: true,
      isStarred: false,
      sentAt: 1666774442283,
      status: 'sent',
      subject: 'Bobi and Me',
      to: 'photographer@img.com',
    };
    const email9 = {
      id: 'e115',
      subject: 'Love you!',
      body: "Would love to hang up with you,it's been a while since we got to hang out just the two of us, lets make some plans so we could meet up again as soon as possible",
      isRead: true,
      sentAt: 1551199930594,
      from: 'bnaya@bar.bestduo',
      to: 'baba@momo.com',
      status: 'sent',
      isStarred: true,
    };
    const email10 = {
      id: 'e109',
      subject: 'Hate you!',
      body: "Make sure you have solid and great demo data this will be your front of your's application",
      isRead: false,
      sentAt: 1551645939894,
      status: 'sent',
      from: 'bnaya@bar.bestduo',
      to: 'rotem@momo.com',
      isStarred: true,
    };
    const email11 = {
      body: "i amm promising you there won't be any better project than us and that is guranteed",
      from: 'bnaya@bar.bestduo',
      id: 'me502b',
      isRead: false,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'sent',
      subject: 'best duo',
      to: 'bar@appsus.com',
    };
    const email12 = {
      body: 'Guys dont you forget to work on the ux of the page without a nice looking website you work is worth to trash',
      from: 'rotem@team.lead',
      id: 'mc916u',
      isRead: true,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'inbox',
      isTrash: true,
      subject: 'Work on UX',
      to: 'bnaya@bar.bestduo',
    };
    const email13 = {
      body: 'Guys dont you forget to work on the ui a good one is self explanitory so work hard on the decoration of the page dont delay it to the weekend work on it right now',
      from: 'rotem@team.lead',
      id: 'bg58q',
      isRead: false,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'inbox',
      isTrash: true,
      subject: 'Work on UX',
      to: 'bnaya@bar.bestduo',
    };
    const email14 = {
      body: 'If you need any help im here for not including weekend and i work only from 8am-12pm have a nice one',
      from: 'rotem@team.lead',
      id: 'ace587',
      isRead: true,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'inbox',
      isTrash: true,
      subject: 'Work on design',
      to: 'bnaya@bar.bestduo',
    };
    const email15 = {
      body: 'I am asking you to delete the navigation photo on the header navbar',
      from: 'rotem@team.lead',
      id: 'mu1azb',
      isRead: true,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'inbox',
      isTrash: true,
      subject: 'About asking help',
      to: 'bnaya@bar.bestduo',
    };
    const email16 = {
      body: 'Would you take a look on our navbar and tell us where we can improve?',
      from: 'bnaya@bar.bestduo',
      id: 'm6q18',
      isRead: true,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'draft',
      subject: 'Improvments on nav',
      to: 'rotem@team.lead',
    };
    const email17 = {
      body: 'Would you take a look on our app js file and tell us where can we imrpove?',
      from: 'bnaya@bar.bestduo',
      id: 'maqzb892',
      isRead: true,
      isStarred: false,
      sentAt: 1656773119364,
      status: 'draft',
      subject: 'Improvments on code',
      to: 'rotem@team.lead',
    };
    const email18 = {
      body: 'Would you tell us how to make a canvas display on a note?',
      from: 'bnaya@bar.bestduo',
      id: 'mal12',
      isRead: false,
      isStarred: true,
      sentAt: 1656773119364,
      status: 'draft',
      subject: 'Any suggestions?',
      to: 'rotem@team.lead',
    };
    emails = [
      email,
      email2,
      email3,
      email4,
      email5,
      email6,
      email7,
      email8,
      email9,
      email10,
      email11,
      email12,
      email13,
      email14,
      email15,
      email16,
      email17,
      email18,
    ];
    utilService.saveToStorage(EMAIL_KEY, emails);
  }
  return emails;
}

function _createUser() {
  let loggedinUser = utilService.loadFromStorage(USER_KEY);
  if (!loggedinUser) {
    loggedinUser = {
      email: 'bnaya@bar.bestduo',
      fullname: 'Mahatma Appsus',
    };
    utilService.saveToStorage(USER_KEY, loggedinUser);
  }
  return loggedinUser;
}
