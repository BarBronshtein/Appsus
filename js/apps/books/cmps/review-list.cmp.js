import reviewPreview from './review-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

import { bookService } from '../services/book-service.js';
export default {
  props: ['book'],
  components: { reviewPreview },
  template: `
 <section v-if="book.reviews" class="reviews-list">
    <ul>
        <article v-for="review in book.reviews" :key="review.id" class="review-preview-container">
            <review-preview  @deleteReview="removeReview" :review="review" />
        </article>
    </ul>
</section>`,
  data() {
    return {};
  },
  methods: {
    removeReview(reviewId) {
      bookService
        .deleteReview(this.book, reviewId)
        .then(
          eventBus.emit('show-msg', {
            txt: 'Uploaded successfully',
            type: 'success',
            link: this.book.id,
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
};
