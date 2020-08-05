const Bootcamp = require("../models/Bootcamp");

// @desc  Get all bootcamps
// @route GET  /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ count: bootcamps.length, success: true, data: bootcamps });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false });
  }
};

// @desc  GET Get Bootcamp by id
// @route GET  /api/v1/bootcamps/:id
// @access  Private
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(201).json({ success: false, data: bootcamp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false });
  }
};

// @desc  Create new Bootcamp
// @route POST  /api/v1/bootcamps
// @access  Private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false });
  }
};

// @desc  Update Bootcamp
// @route PUT  /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false });
  }
};
// @desc  Delete Bootcamp
// @route PUT  /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false });
  }
};
