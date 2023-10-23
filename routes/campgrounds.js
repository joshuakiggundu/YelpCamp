const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const User = require('../models/user');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const {isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post( isLoggedIn,  upload.array('image'), validateCampground, catchAsync(campgrounds.createcampground))
    
router.get ('/new', isLoggedIn, campgrounds.new);

router.route('/:id')
    .get( catchAsync(campgrounds.showcampground))
    .put( isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updatecampground))
    .delete( isAuthor, catchAsync(campgrounds.deletecampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (campgrounds.editcampground));
module.exports = router 