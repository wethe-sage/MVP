const express = require('express');
const router = express.Router();
const { createListing ,deleteListing,updateListing,getListing,getListings}=  require('../controllers/HotelListing.controller');

const {auth, isHotel }= require('../middelwares/auth');


router.post('/create',auth, isHotel, createListing);
router.delete('/delete/:id', auth,isHotel, deleteListing);
router.post('/update/:id',auth, isHotel, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)
module.exports = router;