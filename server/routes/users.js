const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../config/aws");



// R
router.get("/", async (req, res, next) => {
  try {
    const apiRes = await User.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/paillettes", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const currentUserId = req.session.currentUser;
    const user = await User.findById(currentUserId);
    user.paillettes += Number(quantity);

    const apiRes = await User.findByIdAndUpdate(currentUserId, user, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});



// U
router.patch(
  "/:id",
  upload.single("profilePicture"),
  async (req, res, next) => {
    try {
      const updatedItem = req.body;
      if (req.file) {
        updatedItem.profilePicture = req.file.location;
      }
      // console.log(updatedItem);
      const apiRes = await User.findByIdAndUpdate(req.params.id, updatedItem, {
        new: true,
      });
      res.status(200).json(apiRes);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await User.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
