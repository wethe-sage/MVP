const Listing= require('../models/HotelListing.model.js');
const { errorHandler } = require('../utils/error.js');

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:"failed to create listing",
      error: error.message
  })
  }
}

exports.deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listing!'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
}

exports.updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listing!'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
}

exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

exports.getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const filters = {};

    if (req.query.offer === 'true') {
      filters.offer = true;
    }
    if (req.query.parking === 'true') {
      filters.parking = true;
    }
    if (req.query.food === 'true') {
      filters.food = true;
    }
    if (req.query.roomService === 'true') {
      filters.roomService = true;
    }
    if (req.query.powerBackup === 'true') {
      filters.powerBackup = true;
    }
    if (req.query.houseKeeping === 'true') {
      filters.houseKeeping = true;
    }

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      ...filters,
    }).sort({ [sort]: order }).limit(limit).skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}
