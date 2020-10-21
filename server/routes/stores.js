var express = require("express");
var router = express.Router();
const Store = require("../models/Store");
const upload = require('../config/aws');

// C
router.post("/", upload.single('image'), async (req, res, next) => {
  try {
    const newStore = req.body;
    if (req.file) {
      newStore.image = req.file.location;
    }
    const apiRes = await Store.create(newStore);
    res.status(201).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// R
router.get("/", async (req, res, next) => {
  try {
    const apiRes = await Store.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Store.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// U
router.patch("/:id", upload.single('image'), async (req, res, next) => {
  try {
    const updatedStore = req.body;
    if (req.file) {
      newStore.image = req.file.location;
    }
    const apiRes = await Store.findByIdAndUpdate(req.params.id, updatedStore, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// D
router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await Store.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
