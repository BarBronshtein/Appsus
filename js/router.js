import homePage from './views/home-page.cmp.js';
import aboutPage from './views/about-page.cmp.js';
import bookApp from './apps/books/views/book-app.cmp.js';
import bookDetails from './apps/books/views/book-details.cmp.js';
import keepApp from './apps/keep/views/keep-app.cmp.js';
import emailApp from './apps/email/views/email-app.cmp.js';
import emailDetails from './apps/email/views/email-details.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
  {
    path: '/email/:status',
    component: emailApp,
  },
  {
    path: '/email/:status/:emailId',
    component: emailDetails,
  },
  {
    path: '/keep',
    component: keepApp,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});
