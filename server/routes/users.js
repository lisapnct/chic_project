const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require('../config/aws');

// R
router.get("/", async (req, res, next) => {
  try {
    const apiRes = await User.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await User.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// U 
router.patch("/:id", upload.single('image'), async (req, res, next) => {
  try {
    const updatedItem = req.body;
    if (req.file) {
      updatedItem.image = req.file.path;
    }
    console.log(updatedItem);
    const apiRes = await User.findByIdAndUpdate(
      req.params.id,
      updatedItem,
      { new: true }
    );
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
