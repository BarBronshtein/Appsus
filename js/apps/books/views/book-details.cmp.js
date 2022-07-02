import { bookService } from '../services/book-service.js';
import longText from '../../../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import reviewList from '../cmps/review-list.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  name: 'book-details',
  components: { longText, reviewAdd, reviewList },
  template: `<section v-if="book" class="book-details app-main">
    <div class="book-container flex flex-column">

      <div class="book-details-container flex">
        <div class="img-container flex">
          <img :src="book.thumbnail" alt="">
          <span v-if="showOnSale" class="flex">
            <img class="sale-img" :src="imgUrl" alt=""/>On Sale! </span>
          </div>
          <div class="book-description flex flex-column align-center justify-center">
            
            <long-text :txt="book.description" v-if="isDescLong"/>
            <p>{{displayReadingType}}</p>
            <p>{{displayBookStatus}}</p>
            <p :class="bookStylePrice">{{showPrice}}</p>
          </div>
        </div>
          <div class="pagination">
            <router-link class="btn pagination-book-btn" :to="'/book/'+prevBookId">Prev Book</router-link>
            <router-link class="btn pagination-book-btn" :to="'/book/'+nextBookId">Next Book</router-link>
          </div>
      </div>
      <review-add v-if="book" @addedReview="addReview" :book="book"/> 
      <review-list v-if="book" :book="book" />
      <router-link to="/book" class="btn back-btn" >Back</router-link>
      </section>
      `,
  data() {
    return {
      book: null,
      imgUrl:
        'https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.18169-9/13179278_1079444615448538_1597597891300391336_n.png?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oKZbBVjzPe0AX_Wg4ZQ&_nc_ht=scontent.ftlv5-1.fna&oh=00_AT-LXrgbntzMpm3fI3GkqtYyNjfZ-KBz1-YW_R1_BQ1VlA&oe=62DD480D',
      nextBookId: null,
      prevBookId: null,
    };
  },
  methods: {
    addReview(review) {
      console.log('submitting', review);
      bookService
        .addReview(this.book, review)
        .then(
          eventBus.emit('show-msg', {
            txt: 'Uploaded successfully',
            type: 'success',
            link: window.location.href,
          })
        )
        .catch(err =>
          eventBus.emit('show-msg', {
            txt: err,
            type: 'error',
          })
        );
    },
  },
  created() {
    const id = this.$route.params.bookId;
    bookService.get(id).then(book => (this.book = book));
  },
  computed: {
    displayReadingType() {
      const { pageCount } = this.book;
      if (pageCount > 500) return 'Long reading';
      else if (pageCount > 200) return 'Decent reading';
      else return 'Light reading';
    },
    displayBookStatus() {
      const bookAge = new Date().getFullYear() - this.book.publishedDate;
      if (bookAge >= 10) return 'Veteran Book';
      else if (bookAge <= 1) return 'New!';
    },
    bookStylePrice() {
      const { amount } = this.book.listPrice;
      return {
        red: amount > 150,
        green: amount < 20,
      };
    },
    showOnSale() {
      return this.book.listPrice.isOnSale;
    },
    showPrice() {
      const { amount, currencyCode } = this.book.listPrice;

      return bookService.displayByCurrency(currencyCode).format(amount);
    },
    isDescLong() {
      return this.book.description.length > 100;
    },
  },
  watch: {
    '$route.params.bookId': {
      handler() {
        const id = this.$route.params.bookId;
        if (!id) return;
        bookService.get(id).then(book => {
          this.book = book;
          bookService
            .getBookTrailingIds(book.id)
            .then(({ nextBookId, prevBookId }) => {
              this.nextBookId = nextBookId;
              this.prevBookId = prevBookId;
            });
        });
      },
      immediate: true,
    },
  },
};
