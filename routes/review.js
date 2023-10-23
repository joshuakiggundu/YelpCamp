const express = require ('express');
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');
const { reviewSchema} = require('../schemas.js')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const review = require('../controllers/reviews')



router.post('/', isLoggedIn, validateReview, catchAsync(review.newreview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync( review.deletereview));

module.exports = router;
