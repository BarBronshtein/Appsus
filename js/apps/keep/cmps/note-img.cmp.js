// import { bookService } from '../services/book-service.js';
// export default {
//   template: `<section @click="$emit('select')" class="book-preview">
//     <img :src="book.thumbnail" alt="" />
//     <h3>{{book.title}}</h3>
//     <p>{{showPrice}}</p>
//   </section>
//   `,
//   props: ['book'],
//   data() {
//     return {};
//   },
//   computed: {
//     showPriceByCurrency() {
//       return;
//     },
//     showPrice() {
//       const {
//         listPrice: { currencyCode, amount },
//       } = this.book;
//       return bookService.displayByCurrency(currencyCode).format(amount);
//     },
//   },
// };
