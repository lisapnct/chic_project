var express = require("express");
var router = express.Router();
const Project = require("../models/Project");
const upload = require('../config/aws');

// C
router.post("/", /*upload.single('image'), */ async (req, res, next) => {
  try {
    const newProject = req.body;
    if (req.file) {
      newProject.image = req.file.path;
    }
    const apiRes = await Project.create(newProject);
    res.status(201).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// R
router.get("/", async (req, res, next) => {
  try {
    const apiRes = await Project.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Project.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// U
router.patch("/:id", upload.single('image'), async (req, res, next) => {
  try {
    const updatedProject = req.body;
    // console.log(req.body);
    // console.log(updatedItem);
    const apiRes = await Project.findByIdAndUpdate(req.params.id, updatedProject, {
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
    const apiRes = await Project.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
